import { describe, expect, it } from 'vitest';
import type { MonsterData, TagValue } from '../types/game';
import { assignPrepArchetype, PREP_ARCHETYPE_EFFECTS, PREP_ARCHETYPE_EFFECT_TEXT } from './prepArchetypes';
import { NOTE_MONSTERS } from './pathimonNoteData';
import { MOVES } from './moves';

function mon(overrides: Partial<MonsterData> = {}): MonsterData {
  return {
    id: 't',
    name: 't',
    scientificName: 't (T)',
    category: '세균',
    glyph: 'T',
    tags: { pathway: 'gut', wall: 'gram_negative', location: 'extracellular', size: 'microscopic' },
    maxHp: 50,
    attack: 50,
    defense: 50,
    speed: 5,
    captureRate: 0.4,
    ability: 'none',
    learnset: [],
    ...overrides,
  };
}

const NO_TOXIN = { isToxinProducer: false };
const TOXIN = { isToxinProducer: true };
const loc = (location: TagValue): Partial<MonsterData> => ({ tags: { location } });

describe('prep archetype assignment', () => {
  it('assigns each archetype by its trigger', () => {
    expect(assignPrepArchetype(mon(), TOXIN)).toBe('toxin_forge');
    expect(assignPrepArchetype(mon({ ability: 'spore' }), NO_TOXIN)).toBe('dormant_burst');
    expect(assignPrepArchetype(mon({ ability: 'cyst' }), NO_TOXIN)).toBe('dormant_burst');
    expect(assignPrepArchetype(mon({ ability: 'latency' }), NO_TOXIN)).toBe('latent_recovery');
    expect(assignPrepArchetype(mon({ ability: 'antigen_var' }), NO_TOXIN)).toBe('latent_recovery');
    expect(assignPrepArchetype(mon({ ability: 'capsule' }), NO_TOXIN)).toBe('barrier');
    expect(assignPrepArchetype(mon({ ability: 'biofilm' }), NO_TOXIN)).toBe('barrier');
    expect(assignPrepArchetype(mon({ ability: 'autoinfection' }), NO_TOXIN)).toBe('proliferation');
    expect(assignPrepArchetype(mon({ category: '선충' }), NO_TOXIN)).toBe('large_resist');
    expect(assignPrepArchetype(mon(loc('intracellular_cytosol')), NO_TOXIN)).toBe('invasive');
    expect(assignPrepArchetype(mon(loc('erythrocyte')), NO_TOXIN)).toBe('invasive');
    expect(assignPrepArchetype(mon(), NO_TOXIN)).toBe('basic');
  });

  it('prefers 독소벼림 over dormancy for a spore-forming toxin producer (탄저)', () => {
    const anthraxLike = mon({ abilities: ['spore', 'capsule'], ability: 'spore' });
    expect(assignPrepArchetype(anthraxLike, TOXIN)).toBe('toxin_forge');
  });

  it('never puts parasites in 독소벼림 (neuro/enzyme moves are not exotoxins for worms)', () => {
    const worm = mon({ category: '조충' });
    expect(assignPrepArchetype(worm, TOXIN)).toBe('large_resist');
  });

  it('injects a non-empty archetype effect into every note pathimon prep move', () => {
    for (const monster of NOTE_MONSTERS) {
      if (!monster.prep) continue;
      const prep = MOVES[monster.prep];
      expect(prep?.kind, `${monster.id} prep kind`).toBe('prep');
      expect(prep?.effects?.length, `${monster.id} prep effects injected`).toBeGreaterThan(0);
    }
  });

  it('gives 탄저(toxin_forge) an empower_status prep and 회충(대형저항) a dot prep', () => {
    const anthraxPrep = MOVES[NOTE_MONSTERS.find((m) => m.id === 'anthrax')!.prep!];
    expect(anthraxPrep.effects).toEqual(PREP_ARCHETYPE_EFFECTS.toxin_forge);

    const ascaris = NOTE_MONSTERS.find((m) => m.id === 'ascaris');
    if (ascaris?.prep) {
      expect(MOVES[ascaris.prep].effects?.some((e) => e.kind === 'dot')).toBe(true);
    }
  });

  it('exposes the archetype merit as prep effectText (kept alongside the note flavor name)', () => {
    const anthraxPrep = MOVES[NOTE_MONSTERS.find((m) => m.id === 'anthrax')!.prep!];
    expect(anthraxPrep.effectText).toBe(PREP_ARCHETYPE_EFFECT_TEXT.toxin_forge);
    expect(anthraxPrep.outcomes?.every((o) => o.effectText === PREP_ARCHETYPE_EFFECT_TEXT.toxin_forge)).toBe(true);
    // 이름·서술(감염경로)은 그대로.
    expect(anthraxPrep.name).toBe('아포 발아');
  });
});
