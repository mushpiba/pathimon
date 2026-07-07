import type { ActiveEffect, EffectPrimitive, RuntimeMonster } from '../types/game';

function clampHp(monster: RuntimeMonster): void {
  monster.hp = Math.max(0, Math.min(monster.maxHp, monster.hp));
  monster.fainted = monster.hp <= 0;
}

function getTarget(user: RuntimeMonster, enemy: RuntimeMonster, target: 'self' | 'enemy'): RuntimeMonster {
  return target === 'self' ? user : enemy;
}

function pushEffect(monster: RuntimeMonster, effect: ActiveEffect): void {
  monster.effects.push(effect);
}

export function applyEffects(user: RuntimeMonster, enemy: RuntimeMonster, effects?: EffectPrimitive[]): void {
  if (!effects?.length) {
    return;
  }

  for (const effect of effects) {
    const target = getTarget(user, enemy, effect.target);

    switch (effect.kind) {
      case 'buff':
        pushEffect(target, {
          kind: 'buff',
          stat: effect.stat,
          pct: effect.pct,
          turns: effect.turns,
        });
        break;
      case 'field':
        pushEffect(target, {
          kind: 'field',
          side: effect.side,
          factor: effect.factor,
          turns: effect.turns,
        });
        break;
      case 'dot':
        pushEffect(target, {
          kind: 'dot',
          power: effect.power,
          turns: effect.turns,
        });
        break;
      case 'invuln':
        pushEffect(target, {
          kind: 'invuln',
          turns: effect.turns,
        });
        break;
      case 'convert':
        pushEffect(target, {
          kind: 'convert',
          power: effect.power,
        });
        break;
      case 'heal':
        target.hp += Math.round(target.maxHp * (effect.pct / 100));
        clampHp(target);
        break;
      default:
        break;
    }
  }
}

export function tickEffects(monster: RuntimeMonster): number {
  let damage = 0;
  const nextEffects: ActiveEffect[] = [];

  for (const effect of monster.effects) {
    if (effect.kind === 'dot' || effect.kind === 'convert') {
      damage += effect.power ?? 0;
    }

    const turns = effect.turns;
    if (turns === undefined) {
      continue;
    }

    if (turns - 1 > 0) {
      nextEffects.push({ ...effect, turns: turns - 1 });
    }
  }

  if (damage > 0) {
    monster.hp -= damage;
    clampHp(monster);
  }

  monster.effects = nextEffects;
  return damage;
}
