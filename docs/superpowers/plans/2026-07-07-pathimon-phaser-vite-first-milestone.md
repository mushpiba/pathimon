# Pathimon Phaser/Vite First Milestone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first playable Phaser/Vite/TypeScript milestone for Pathimon: title, story, first battle, move description UI, capsule capture, reward, shop, and next-floor flow.

**Architecture:** Keep the existing HTML prototype as a reference and create a new Vite app under `app/`. Put data, pure battle rules, run state, Phaser scenes, and UI helpers in separate modules so Pathimon can grow mainly by adding data. Unit-test pure logic first, then verify the Phaser app by building and running the dev server.

**Tech Stack:** Vite, Phaser, TypeScript, Vitest, static web build first, APK path through Capacitor in a future milestone.

## Global Constraints

- Existing files `pathogen-tower.html` and `pathogen-tower-design-flow.md` must remain unchanged.
- New production app lives under `C:\Users\박민겸\Desktop\project\2026\pathimon\app`.
- Use TypeScript for data schemas and battle logic.
- Battle screen shows name plus scientific name, HP bar without numeric HP, defensive trait, and status/effect chips.
- Battle screen does not show level.
- Capsule button is a first-class battle action in the command area.
- Capsule capture is disabled or clearly blocked in boss battles.
- Move descriptions must be readable before committing to a move.
- First milestone uses simple shapes, text, and generated UI; final pixel art and sound are outside this plan.
- Current project folder is not a Git repository. Task 1 initializes Git so later checkpoint commits work.

---

## File Structure

Create these files under `C:\Users\박민겸\Desktop\project\2026\pathimon\app`.

- `package.json`: scripts and dependencies.
- `index.html`: hosts one `#game` element.
- `src/main.ts`: creates the Phaser game.
- `src/game/config.ts`: exports `createGameConfig(parent: string)`.
- `src/game/constants.ts`: fixed game size and colors.
- `src/types/game.ts`: shared domain types.
- `src/data/*.ts`: typed starter data copied from the prototype, with `scientificName`.
- `src/battle/*.ts`: pure battle logic.
- `src/state/*.ts`: run state creation and flow.
- `src/scenes/*.ts`: Phaser scenes.
- `src/ui/*.ts`: UI drawing helpers.
- `src/**/*.test.ts`: Vitest tests for pure logic.

---

### Task 1: Scaffold Vite/Phaser/TypeScript App

**Files:**

- Create: `app/package.json`
- Create: `app/index.html`
- Create: `app/tsconfig.json`
- Create: `app/vite.config.ts`
- Create: `app/src/main.ts`
- Create: `app/src/game/constants.ts`
- Create: `app/src/game/config.ts`
- Create: `app/src/game/smoke.test.ts`

**Interfaces:**

- Produces: `APP_WIDTH: number`, `APP_HEIGHT: number`
- Produces: `createGameConfig(parent: string): Phaser.Types.Core.GameConfig`
- Consumes: no project code from later tasks

- [ ] **Step 1: Initialize Git at the project root**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git init
git status --short
```

Expected:

```text
Initialized empty Git repository in C:/Users/박민겸/Desktop/project/2026/pathimon/.git/
?? docs/
?? pathogen-tower-design-flow.md
?? pathogen-tower.html
```

- [ ] **Step 2: Create app directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\박민겸\Desktop\project\2026\pathimon\app\src\game'
```

Expected: `app\src\game` exists.

- [ ] **Step 3: Create app configuration files**

Write `app/package.json`:

```json
{
  "name": "pathimon",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "phaser": "^3.90.0"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "vite": "^5.4.0",
    "vitest": "^2.0.5"
  }
}
```

Write `app/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

Write `app/vite.config.ts`:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

Write `app/index.html`:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pathimon</title>
  </head>
  <body>
    <div id="game"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 4: Create a minimal Phaser config**

Write `app/src/game/constants.ts`:

```ts
export const APP_WIDTH = 1024;
export const APP_HEIGHT = 576;

export const COLORS = {
  ink: 0x272033,
  panel: 0x332b42,
  panelDark: 0x211b2d,
  line: 0xd64541,
  grass: 0x62a15d,
  grassDark: 0x3f7a43,
  hp: 0x42d66b,
  hpBack: 0xd8d9e0,
  text: '#f4f0ff',
  muted: '#c9c1d8',
  danger: '#ff6961',
  accent: '#72d6ff',
} as const;
```

Write `app/src/game/config.ts`:

```ts
import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH } from './constants';

class TemporaryBootScene extends Phaser.Scene {
  constructor() {
    super('TemporaryBootScene');
  }

  create(): void {
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, 0x182131).setOrigin(0);
    this.add.text(APP_WIDTH / 2, APP_HEIGHT / 2, 'PATHIMON', {
      color: '#f4f0ff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '42px',
    }).setOrigin(0.5);
  }
}

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: APP_WIDTH,
    height: APP_HEIGHT,
    backgroundColor: '#182131',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [TemporaryBootScene],
  };
}
```

Write `app/src/main.ts`:

```ts
import Phaser from 'phaser';
import { createGameConfig } from './game/config';

new Phaser.Game(createGameConfig('game'));
```

- [ ] **Step 5: Write the smoke test**

Write `app/src/game/smoke.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { APP_HEIGHT, APP_WIDTH } from './constants';
import { createGameConfig } from './config';

describe('game config', () => {
  it('uses the fixed Pathimon canvas size', () => {
    const config = createGameConfig('game');

    expect(config.width).toBe(APP_WIDTH);
    expect(config.height).toBe(APP_HEIGHT);
    expect(config.parent).toBe('game');
  });
});
```

- [ ] **Step 6: Install dependencies**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon\app'
npm install
```

Expected: `node_modules` and `package-lock.json` are created. Network access may require approval.

- [ ] **Step 7: Verify scaffold**

Run:

```powershell
npm run test:run
npm run build
```

Expected:

```text
Test Files  1 passed
✓ built in
```

- [ ] **Step 8: Commit scaffold**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git add app docs
git commit -m "chore: scaffold phaser app"
```

Expected: commit succeeds.

---

### Task 2: Add Typed Domain Data

**Files:**

- Create: `app/src/types/game.ts`
- Create: `app/src/data/labels.ts`
- Create: `app/src/data/abilities.ts`
- Create: `app/src/data/moves.ts`
- Create: `app/src/data/effectiveness.ts`
- Create: `app/src/data/monsters.ts`
- Create: `app/src/data/bosses.ts`
- Create: `app/src/data/dataIntegrity.test.ts`

**Interfaces:**

- Produces: `MonsterData`, `MoveData`, `AbilityData`, `BossData`, `RuntimeMonster`, `RunState`
- Produces: `MONSTERS`, `MOVES`, `ABILITIES`, `EFFECTIVENESS`, `BOSSES`, `STARTER_ID`, `TOTAL_FLOORS`
- Consumes: no battle functions yet

- [ ] **Step 1: Create shared types**

Write `app/src/types/game.ts` with these exported names:

```ts
export type AttackType = 'lysis' | 'toxin' | 'superantigen' | 'spread' | 'endotoxin' | 'misfold' | 'phago' | 'oxidative' | 'net' | 'opsonin' | 'antibody' | 'complement' | 'ctl' | 'th1' | 'interferon';
export type TagAxis = 'pathway' | 'wall' | 'location';
export type TagValue = 'respiratory' | 'gut' | 'blood' | 'wound' | 'skin' | 'mucosal' | 'contact' | 'gram_positive' | 'gram_negative' | 'mycobacterial' | 'enveloped_virus' | 'fungal' | 'protozoa' | 'none' | 'extracellular' | 'intracellular';
export type AbilityId = 'none' | 'capsule' | 'catalase' | 'proteinA' | 'comp_evade' | 'acidfast' | 'biofilm' | 'antigen_var' | 'spore' | 'no_nucleic' | 'barrier' | 'comp_patrol' | 'mask' | 'lysozyme';
export type MoveId = 'alpha_toxin' | 'pvl' | 'hyaluronidase' | 'coagulase' | 'enterotoxin' | 'cholera_toxin' | 'cpe' | 'streptokinase' | 'tsst' | 'flood' | 'm_phago' | 'm_opsonin' | 'm_antibody' | 'm_complement' | 'm_ctl' | 'm_th1' | 'm_interferon';

export interface Tags {
  pathway?: TagValue;
  wall?: TagValue;
  location?: TagValue;
}

export type EffectPrimitive =
  | { kind: 'buff'; stat: 'attack' | 'defense'; pct: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'status'; status: 'confusion' | 'stun'; chance: number; turns?: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'invuln'; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'field'; side: 'incoming'; factor: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'dot'; power: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'convert'; power: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'heal'; pct: number; target: 'self' | 'enemy'; stacks?: number };

export interface AbilityData {
  id: AbilityId;
  name: string;
  resistTag?: Partial<Record<TagAxis, Partial<Record<TagValue, number>>>>;
}

export interface MoveData {
  id: MoveId;
  name: string;
  type: AttackType;
  power: number;
  accuracy: number;
  signature?: boolean;
  description: string;
  learnText: string;
  effects?: EffectPrimitive[];
}

export interface MonsterData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  tags: Tags;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  captureRate: number;
  ability: AbilityId;
  learnset: MoveId[];
  signature?: MoveId;
  legendary?: boolean;
}

export interface BossData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  maxHp: number;
  attack: number;
  defense: number;
  abilityPool: AbilityId[];
  movePool: MoveId[];
}

export interface ActiveEffect {
  kind: EffectPrimitive['kind'] | 'confusion';
  stat?: 'attack' | 'defense';
  pct?: number;
  side?: 'incoming';
  factor?: number;
  power?: number;
  turns?: number;
}

export interface RuntimeMonster {
  templateId: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  tags: Tags;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  captureRate: number;
  ability: AbilityId;
  moveset: MoveId[];
  effects: ActiveEffect[];
  stunned: boolean;
  fainted: boolean;
  isBoss: boolean;
}

export type BattlePhase = 'story' | 'battle' | 'shop' | 'bossIntro' | 'victory' | 'defeat';

export interface RunState {
  floor: number;
  money: number;
  capsules: number;
  party: RuntimeMonster[];
  activeIndex: number;
  enemy: RuntimeMonster | null;
  phase: BattlePhase;
  lastLog: string;
}
```

- [ ] **Step 2: Create labels, abilities, moves, effectiveness, monsters, and bosses**

Use the existing prototype data as the source, but limit this first milestone to:

- Starter: `화농성연쇄상구균` / `Streptococcus pyogenes`
- Wild enemies: `황색포도알균` / `Staphylococcus aureus`, `콜레라균` / `Vibrio cholerae`, `결핵균` / `Mycobacterium tuberculosis`
- Boss: `면역 사령부` / `Immune Command`

Required data exports and exact content:

- `STARTER_ID` is `'strep'`.
- `TOTAL_FLOORS` is `10`.
- `MONSTERS` contains exactly `strep`, `staph`, `cholera`, and `tb` for this milestone.
- `BOSSES` contains exactly `immune_hq` for this milestone.
- `ABILITIES` contains every key in `AbilityId`.
- `MOVES` contains every key in `MoveId`.
- `EFFECTIVENESS` contains the core rows for `phago`, `opsonin`, `antibody`, `complement`, `ctl`, `th1`, `interferon`, `spread`, `toxin`, `lysis`, `superantigen`, and `endotoxin`.
- Every `MoveData` entry includes `description` and `learnText` because `BattleScene` reads those fields for the move description panel.

- [ ] **Step 3: Write data integrity tests**

Write `app/src/data/dataIntegrity.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ABILITIES } from './abilities';
import { BOSSES } from './bosses';
import { MONSTERS, STARTER_ID } from './monsters';
import { MOVES } from './moves';

describe('Pathimon data', () => {
  it('has a valid starter with a scientific name', () => {
    const starter = MONSTERS.find((monster) => monster.id === STARTER_ID);

    expect(starter?.name).toBe('화농성연쇄상구균');
    expect(starter?.scientificName).toBe('Streptococcus pyogenes');
    expect(starter?.scientificName.length).toBeGreaterThan(3);
  });

  it('references only defined abilities and moves', () => {
    for (const monster of MONSTERS) {
      expect(ABILITIES[monster.ability]).toBeDefined();
      for (const moveId of monster.learnset) expect(MOVES[moveId]).toBeDefined();
      if (monster.signature) expect(MOVES[monster.signature]).toBeDefined();
    }

    for (const boss of BOSSES) {
      for (const abilityId of boss.abilityPool) expect(ABILITIES[abilityId]).toBeDefined();
      for (const moveId of boss.movePool) expect(MOVES[moveId]).toBeDefined();
    }
  });

  it('has move explanation text for the battle description panel', () => {
    for (const move of Object.values(MOVES)) {
      expect(move.description.length).toBeGreaterThan(0);
      expect(move.learnText.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 4: Verify typed data**

Run:

```powershell
npm run test:run
npm run typecheck
```

Expected:

```text
Test Files  2 passed
```

- [ ] **Step 5: Commit typed data**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git add app/src/types app/src/data
git commit -m "feat: add typed pathimon data"
```

Expected: commit succeeds.

---

### Task 3: Build Pure Battle Engine

**Files:**

- Create: `app/src/battle/loadout.ts`
- Create: `app/src/battle/effectiveness.ts`
- Create: `app/src/battle/effects.ts`
- Create: `app/src/battle/damage.ts`
- Create: `app/src/battle/capture.ts`
- Create: `app/src/battle/battle.test.ts`

**Interfaces:**

- Consumes: `MonsterData`, `RuntimeMonster`, `MoveData`, `ABILITIES`, `EFFECTIVENESS`
- Produces: `buildLoadout(monster: MonsterData): MoveId[]`
- Produces: `calculateMultiplier(move: MoveData, attacker: RuntimeMonster, defender: RuntimeMonster): { total: number; notes: string[] }`
- Produces: `calculateDamage(attacker: RuntimeMonster, defender: RuntimeMonster, move: MoveData, variance?: number): { damage: number; multiplier: MultiplierResult; blockedByInvulnerability: boolean }`
- Produces: `tryCapture(enemy: RuntimeMonster, capsules: number, roll: number): CaptureResult`
- Produces: `applyEffects(user: RuntimeMonster, enemy: RuntimeMonster, effects?: EffectPrimitive[]): void`
- Produces: `tickEffects(monster: RuntimeMonster): number`

- [ ] **Step 1: Write failing battle tests**

Write `app/src/battle/battle.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { MOVES } from '../data/moves';
import type { RuntimeMonster } from '../types/game';
import { calculateDamage } from './damage';
import { calculateMultiplier } from './effectiveness';
import { buildLoadout } from './loadout';
import { tryCapture } from './capture';

const attacker: RuntimeMonster = {
  templateId: 'strep',
  name: '화농성연쇄상구균',
  scientificName: 'Streptococcus pyogenes',
  category: '세균',
  glyph: '🔗',
  tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
  maxHp: 44,
  hp: 44,
  attack: 10,
  defense: 3,
  speed: 9,
  captureRate: 0.5,
  ability: 'comp_evade',
  moveset: ['streptokinase', 'hyaluronidase', 'enterotoxin', 'alpha_toxin'],
  effects: [],
  stunned: false,
  fainted: false,
  isBoss: false,
};

const capsuleTarget: RuntimeMonster = {
  ...attacker,
  templateId: 'staph',
  name: '황색포도알균',
  scientificName: 'Staphylococcus aureus',
  ability: 'capsule',
  captureRate: 0.42,
  hp: 10,
  maxHp: 46,
  moveset: ['tsst', 'alpha_toxin', 'pvl', 'hyaluronidase'],
};

describe('battle engine', () => {
  it('builds four move slots with signature first', () => {
    const moves = buildLoadout({
      id: 'staph',
      name: '황색포도알균',
      scientificName: 'Staphylococcus aureus',
      category: '세균',
      glyph: '🟡',
      tags: { pathway: 'skin', wall: 'gram_positive', location: 'extracellular' },
      maxHp: 46,
      attack: 11,
      defense: 4,
      speed: 8,
      captureRate: 0.42,
      ability: 'proteinA',
      signature: 'tsst',
      learnset: ['alpha_toxin', 'pvl', 'hyaluronidase', 'coagulase', 'enterotoxin'],
    });

    expect(moves).toEqual(['tsst', 'alpha_toxin', 'pvl', 'hyaluronidase']);
  });

  it('combines type matchup and tag defense', () => {
    const defender: RuntimeMonster = {
      ...capsuleTarget,
      ability: 'mask',
      tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
    };

    const result = calculateMultiplier(MOVES.hyaluronidase, attacker, defender);

    expect(result.total).toBe(0.5);
    expect(result.notes).toContain('점액섬모가 호흡기 태그를 반감했다');
  });

  it('calculates deterministic damage with fixed variance', () => {
    const result = calculateDamage(attacker, capsuleTarget, MOVES.hyaluronidase, 1);

    expect(result.damage).toBeGreaterThan(0);
    expect(result.multiplier.total).toBe(1);
  });

  it('blocks capsule capture against bosses', () => {
    const result = tryCapture({ ...capsuleTarget, isBoss: true }, 3, 0.1);

    expect(result.kind).toBe('blocked');
    expect(result.capsules).toBe(3);
  });

  it('uses hp loss to improve capsule capture chance', () => {
    const result = tryCapture(capsuleTarget, 2, 0.6);

    expect(result.kind).toBe('captured');
    expect(result.capsules).toBe(1);
  });
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run:

```powershell
npm run test:run -- src/battle/battle.test.ts
```

Expected: FAIL because battle modules do not exist.

- [ ] **Step 3: Implement loadout**

Write `app/src/battle/loadout.ts`:

```ts
import type { MonsterData, MoveId } from '../types/game';

export function buildLoadout(monster: MonsterData): MoveId[] {
  const slots: MoveId[] = [];
  if (monster.signature) slots.push(monster.signature);

  for (const moveId of monster.learnset) {
    if (slots.length >= 4) break;
    if (!slots.includes(moveId)) slots.push(moveId);
  }

  return slots.slice(0, 4);
}
```

- [ ] **Step 4: Implement effectiveness, damage, capture, and effects**

Required behavior:

```ts
// effectiveness.ts
// 1. Multiply attack type table hits for defender ability and tags.
// 2. Clamp type-table multiplier to 0..3.
// 3. Multiply defender ability resistTag reactions against attacker tags.
// 4. Return explanatory notes for mask/respiratory and lysozyme/gram_positive.

// damage.ts
// 1. Return 0 damage when multiplier is 0, defender is invulnerable, or move power is 0.
// 2. Use Math.max(1, attack + power - defense).
// 3. Apply multiplier, incoming field factor, and variance.

// capture.ts
// 1. Boss returns { kind: 'blocked' } and does not spend capsule.
// 2. No capsule returns { kind: 'noCapsules' }.
// 3. Chance is min(0.95, captureRate + hpLoss * 0.4).
// 4. Successful normal capture spends exactly one capsule.

// effects.ts
// 1. Apply buff, field, dot, invuln, convert, heal primitives.
// 2. tickEffects applies dot/convert damage, decreases turns, and removes expired effects.
```

- [ ] **Step 5: Verify battle engine**

Run:

```powershell
npm run test:run -- src/battle/battle.test.ts
npm run typecheck
```

Expected:

```text
Test Files  1 passed
```

- [ ] **Step 6: Commit battle engine**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git add app/src/battle app/src/types app/src/data
git commit -m "feat: add battle engine"
```

Expected: commit succeeds.

---

### Task 4: Add Run State And Turn Flow

**Files:**

- Create: `app/src/state/factory.ts`
- Create: `app/src/state/runState.ts`
- Create: `app/src/battle/turn.ts`
- Create: `app/src/state/runState.test.ts`

**Interfaces:**

- Produces: `createMonsterInstance(data: MonsterData): RuntimeMonster`
- Produces: `createBossInstance(index?: number): RuntimeMonster`
- Produces: `createInitialRunState(): RunState`
- Produces: `enterBattle(state: RunState, enemyIndex?: number): RunState`
- Produces: `resolvePlayerMove(state: RunState, moveId: MoveId, variance?: number): RunState`
- Produces: `resolveCapsuleAction(state: RunState, roll: number): RunState`
- Produces: `advanceFromShop(state: RunState): RunState`

- [ ] **Step 1: Write failing run-state tests**

Write `app/src/state/runState.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { resolveCapsuleAction, resolvePlayerMove } from '../battle/turn';
import { MOVES } from '../data/moves';
import { advanceFromShop, createInitialRunState, enterBattle } from './runState';

describe('run state loop', () => {
  it('starts with one active starter and battle resources', () => {
    const state = createInitialRunState();

    expect(state.floor).toBe(1);
    expect(state.money).toBe(0);
    expect(state.capsules).toBe(3);
    expect(state.party[0].name).toBe('화농성연쇄상구균');
    expect(state.phase).toBe('story');
  });

  it('enters a normal wild battle', () => {
    const state = enterBattle(createInitialRunState(), 1);

    expect(state.phase).toBe('battle');
    expect(state.enemy?.isBoss).toBe(false);
    expect(state.enemy?.scientificName).toBe('Staphylococcus aureus');
  });

  it('moves to shop and grants money after defeating the enemy', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    if (!battle.enemy) throw new Error('enemy missing');
    battle.enemy.hp = 1;

    const result = resolvePlayerMove(battle, battle.party[0].moveset[0], 1);

    expect(result.phase).toBe('shop');
    expect(result.money).toBeGreaterThan(0);
  });

  it('captures a normal enemy and spends one capsule', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    if (!battle.enemy) throw new Error('enemy missing');
    battle.enemy.hp = 1;

    const result = resolveCapsuleAction(battle, 0);

    expect(result.phase).toBe('shop');
    expect(result.capsules).toBe(2);
    expect(result.party.length).toBe(2);
  });

  it('advances from shop to the next battle floor', () => {
    const state = createInitialRunState();
    state.phase = 'shop';

    const result = advanceFromShop(state);

    expect(result.floor).toBe(2);
    expect(result.phase).toBe('battle');
  });

  it('can expose move descriptions through move data', () => {
    expect(MOVES.streptokinase.description).toContain('혈전');
    expect(MOVES.streptokinase.learnText).toContain('확산');
  });
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run:

```powershell
npm run test:run -- src/state/runState.test.ts
```

Expected: FAIL because state modules do not exist.

- [ ] **Step 3: Implement state factories and transitions**

Required behavior:

```ts
// factory.ts
// createMonsterInstance copies MonsterData into RuntimeMonster with hp=maxHp, empty effects, fainted=false, isBoss=false.
// createBossInstance chooses abilityPool[index % length], first four moves, hp=maxHp, captureRate=0, isBoss=true.

// runState.ts
// createInitialRunState starts floor=1, money=0, capsules=3, party=[starter], phase='story'.
// enterBattle creates a boss when floor >= TOTAL_FLOORS, otherwise creates a wild enemy from MONSTERS excluding starter.
// advanceFromShop heals party, increments floor, and enters the next battle.

// turn.ts
// resolvePlayerMove clones state, applies deterministic damage, applies move effects, and opens shop with money reward when enemy hp <= 0.
// resolveCapsuleAction calls tryCapture, spends capsule for normal attempts, adds captured monster to party, and opens shop on capture.
```

- [ ] **Step 4: Verify run loop**

Run:

```powershell
npm run test:run -- src/state/runState.test.ts
npm run test:run
npm run typecheck
```

Expected:

```text
Test Files  4 passed
```

- [ ] **Step 5: Commit run loop**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git add app/src/state app/src/battle app/src/data app/src/types
git commit -m "feat: add first run loop"
```

Expected: commit succeeds.

---

### Task 5: Add Phaser Scenes And Battle UI

**Files:**

- Modify: `app/src/game/config.ts`
- Create: `app/src/scenes/TitleScene.ts`
- Create: `app/src/scenes/StoryScene.ts`
- Create: `app/src/scenes/BattleScene.ts`
- Create: `app/src/scenes/ShopScene.ts`
- Create: `app/src/scenes/BossIntroScene.ts`
- Create: `app/src/ui/draw.ts`
- Create: `app/src/ui/battleUi.ts`

**Interfaces:**

- Consumes: `RunState`, `createInitialRunState`, `enterBattle`, `advanceFromShop`, `resolvePlayerMove`, `resolveCapsuleAction`
- Produces scene keys: `TitleScene`, `StoryScene`, `BattleScene`, `ShopScene`, `BossIntroScene`
- Produces: `drawHpBar(scene, x, y, width, pct): Phaser.GameObjects.Rectangle`
- Produces: `formatMoveDetails(moveId): string[]`

- [ ] **Step 1: Create UI helpers**

Write `app/src/ui/draw.ts` with:

```ts
import Phaser from 'phaser';
import { COLORS } from '../game/constants';

export function addLabel(scene: Phaser.Scene, x: number, y: number, text: string, size = 18): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, {
    color: COLORS.text,
    fontFamily: 'Arial, sans-serif',
    fontSize: `${size}px`,
  });
}

export function drawHpBar(scene: Phaser.Scene, x: number, y: number, width: number, pct: number): Phaser.GameObjects.Rectangle {
  scene.add.rectangle(x, y, width, 10, COLORS.hpBack).setOrigin(0, 0.5);
  return scene.add.rectangle(x, y, Math.max(0, width * pct), 8, COLORS.hp).setOrigin(0, 0.5);
}

export function drawPanel(scene: Phaser.Scene, x: number, y: number, width: number, height: number): Phaser.GameObjects.Rectangle {
  const panel = scene.add.rectangle(x, y, width, height, COLORS.panel).setOrigin(0);
  panel.setStrokeStyle(2, COLORS.line);
  return panel;
}
```

Write `app/src/ui/battleUi.ts` with:

```ts
import { ATTACK_TYPE_LABELS } from '../data/labels';
import { MOVES } from '../data/moves';
import type { MoveId, RuntimeMonster } from '../types/game';

export function hpPct(monster: RuntimeMonster): number {
  return monster.hp / monster.maxHp;
}

export function formatMoveDetails(moveId: MoveId): string[] {
  const move = MOVES[moveId];
  return [
    move.name,
    `타입: ${ATTACK_TYPE_LABELS[move.type]}`,
    `위력: ${move.power}`,
    `명중률: ${Math.round(move.accuracy * 100)}%`,
    move.description,
    move.learnText,
  ];
}

export function effectLabels(monster: RuntimeMonster): string[] {
  return monster.effects.map((effect) => {
    if (effect.kind === 'buff') return `${effect.stat === 'attack' ? '공격' : '방어'} ${effect.pct ?? 0}%`;
    if (effect.kind === 'field') return '피해감소';
    if (effect.kind === 'invuln') return '잠복';
    if (effect.kind === 'dot') return '지속피해';
    if (effect.kind === 'convert') return '개종';
    return effect.kind;
  });
}
```

- [ ] **Step 2: Create title and story scenes**

Required behavior:

```ts
// TitleScene
// Draw PATHIMON title and a start button.
// Start button transitions to StoryScene.

// StoryScene
// Draw 2-3 Korean story lines.
// Pointer click transitions to BattleScene.
```

- [ ] **Step 3: Create BattleScene**

Required behavior:

```ts
// BattleScene state
// this.state = enterBattle(createInitialRunState(), 1)
// this.selectedMoveId = first active move

// Unit panel must draw:
// monster.name
// monster.scientificName
// ABILITIES[monster.ability].name
// drawHpBar(... hpPct(monster)) with no numeric HP text
// effectLabels(monster), or '상태 정상'
// It must not draw level text or level numbers.

// Move menu
// Four move buttons from player.moveset.
// pointerover selects move and refreshes description.
// pointerdown on a not-yet-selected move selects it first, so touch users can read before committing.
// pointerdown on the selected move resolves the move.

// Capsule button
// Separate visible button in command area.
// Calls resolveCapsuleAction.
// For boss state, display '보스 포획 불가' and do not spend capsule.

// Description panel
// Reads formatMoveDetails(selectedMoveId).
// Shows name, type, power, accuracy, effect summary, and learning text.
```

- [ ] **Step 4: Create ShopScene and BossIntroScene**

Required behavior:

```ts
// ShopScene
// Shows money.
// Shows buttons: 패시몬 각성, 패시몬 진화, 캡슐 구입, 다음 층.
// 캡슐 구입 increments capsules and spends money down to minimum 0.
// 다음 층 calls advanceFromShop.

// BossIntroScene
// Shows boss arrival text.
// Pointer click starts BattleScene with boss state.
```

- [ ] **Step 5: Register real scenes**

Modify `app/src/game/config.ts`:

```ts
import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH } from './constants';
import { BattleScene } from '../scenes/BattleScene';
import { BossIntroScene } from '../scenes/BossIntroScene';
import { ShopScene } from '../scenes/ShopScene';
import { StoryScene } from '../scenes/StoryScene';
import { TitleScene } from '../scenes/TitleScene';

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: APP_WIDTH,
    height: APP_HEIGHT,
    backgroundColor: '#182131',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [TitleScene, StoryScene, BattleScene, ShopScene, BossIntroScene],
  };
}
```

- [ ] **Step 6: Verify scene build**

Run:

```powershell
npm run test:run
npm run build
```

Expected:

```text
Test Files  4 passed
✓ built in
```

- [ ] **Step 7: Run dev server and inspect manually**

Run:

```powershell
npm run dev
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

Manual checks:

```text
[ ] Title screen appears.
[ ] Story screen appears after clicking start.
[ ] Battle screen appears after clicking story.
[ ] Enemy and player panels show Korean name plus scientific name.
[ ] HP appears as a bar only, with no numeric HP.
[ ] No level text appears.
[ ] Defensive trait appears.
[ ] Status/effect area appears.
[ ] Hovering or first-selecting a move updates the move description panel.
[ ] Capsule button is visible in the command area.
```

- [ ] **Step 8: Commit scene work**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git add app/src/game app/src/scenes app/src/ui
git commit -m "feat: add phaser battle scenes"
```

Expected: commit succeeds.

---

### Task 6: Final Verification And Polish Pass

**Files:**

- Modify only files under `app/src` if verification exposes a real issue.
- Do not modify `pathogen-tower.html` or `pathogen-tower-design-flow.md`.

**Interfaces:**

- Consumes all previous task outputs.
- Produces a runnable first milestone and concise verification note.

- [ ] **Step 1: Run full automated checks**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon\app'
npm run test:run
npm run typecheck
npm run build
```

Expected:

```text
Test Files  4 passed
✓ built in
```

- [ ] **Step 2: Start local server**

Run:

```powershell
npm run dev
```

Expected: Vite serves the game at `http://127.0.0.1:5173/` or the next available port.

- [ ] **Step 3: Browser verification checklist**

Open the local URL and verify:

```text
[ ] Title -> Story -> Battle works.
[ ] Four move buttons are visible.
[ ] Move description changes before move execution.
[ ] Capsule button is visible and spends a capsule in normal battle.
[ ] Battle UI shows Korean name and scientific name.
[ ] HP is a bar only; numeric HP is absent.
[ ] Level text is absent.
[ ] Defensive trait is visible.
[ ] Status/effect area is visible.
[ ] Defeating or capturing the enemy opens the shop.
[ ] Shop shows money and capsule purchase.
[ ] Shop can proceed to the next floor.
```

- [ ] **Step 4: Fix only verified issues**

If a checklist item fails, change the smallest file directly responsible for that item. Then rerun:

```powershell
npm run test:run
npm run build
```

Expected: tests and build pass after the fix.

- [ ] **Step 5: Commit final milestone**

Run:

```powershell
Set-Location -LiteralPath 'C:\Users\박민겸\Desktop\project\2026\pathimon'
git add app docs
git commit -m "feat: complete first playable milestone"
```

Expected: commit succeeds if there are changes since Task 5. If there are no changes, `git status --short` prints nothing.

---

## Plan Self-Review

**Spec coverage:**

- Phaser/Vite/TypeScript app: Task 1.
- Data-driven Pathimon, moves, abilities, bosses: Task 2.
- Damage, matchup, effects, capture: Task 3.
- Reward, shop, next-floor loop: Task 4 and Task 5.
- Capsule first-class battle action: Task 5.
- Move description before use: Task 5.
- Name plus scientific name: Task 2 data and Task 5 UI.
- HP bar without numeric HP: Task 5 UI and Task 6 checklist.
- No level display: Task 5 note and Task 6 checklist.
- Existing HTML prototype remains untouched: global constraints and Task 6.

**빈칸 검사:**

- No empty-marker words remain.
- No unresolved function names.
- No unspecified file paths.
- No open-ended validation steps.

**Type consistency:**

- `MoveId`, `AbilityId`, and `RuntimeMonster` are defined in Task 2 and consumed unchanged in Tasks 3-5.
- `createInitialRunState`, `enterBattle`, and `advanceFromShop` are defined in Task 4 and consumed in Task 5.
- `resolvePlayerMove` and `resolveCapsuleAction` are defined in Task 4 and consumed in Task 5.
