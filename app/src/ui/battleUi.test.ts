import { describe, expect, it } from 'vitest';
import { CAPSULE_ORDER } from '../data/capsules';
import type { RuntimeMonster } from '../types/game';
import {
  battleActionOptions,
  battleBgmAssetPaths,
  battleMoveUnavailableReason,
  capsuleIconPath,
  battleFieldLayerLayouts,
  battleHpBarLayout,
  battleSceneAssetPaths,
  battleSpriteLayouts,
  combatSpriteScale,
  cursorMarkerPoint,
  battleUnitPanelLayouts,
  battleUnitPanelRows,
  canUseBattleMove,
  chooseBattleBgm,
  commandViewLines,
  effectLabels,
  enemyIntentText,
  formatBossAttackMatchupRows,
  formatBattleMatchupSections,
  formatMoveDetailSections,
  formatMoveDetails,
  formatMoveName,
  formatPokedexEffectivenessRows,
  formatPokedexMoveRows,
  hpPct,
  hpPercentLabel,
  lockedMoveOverlayPath,
  mobileHomeButtonLayout,
  normalizedSpriteScale,
  pathimonTypeIconAssetPaths,
  pathimonSpriteAssets,
  pathimonTypeBorderColor,
  pathimonTypeIcon,
  partyMenuOptions,
  pokerogueAtlasJsonPath,
  resolveMoveSelectionPress,
  statusProfileMemoLines,
  symptomSummary,
  statusSummary,
} from './battleUi';

function createMonster(overrides: Partial<RuntimeMonster> = {}): RuntimeMonster {
  return {
    templateId: 'strep',
    name: '화농성연쇄상구균',
    scientificName: 'Streptococcus pyogenes',
    category: '세균',
    glyph: '🔗',
    tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
    maxHp: 44,
    hp: 22,
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
    ...overrides,
  };
}

describe('battle UI helpers', () => {
  it('places panels opposite the combat sprites like pokerogue', () => {
    const panelLayout = battleUnitPanelLayouts();
    const spriteLayout = battleSpriteLayouts();

    expect(spriteLayout.enemy.x).toBeGreaterThan(spriteLayout.player.x);
    expect(spriteLayout.enemy.y).toBeLessThan(spriteLayout.player.y);
    expect(panelLayout.enemy.x).toBeLessThan(panelLayout.player.x);
    expect(panelLayout.enemy.y).toBeLessThan(panelLayout.player.y);
  });

  it('raises combat sprite bases so platforms stay clear of the unit panels', () => {
    const spriteLayout = battleSpriteLayouts();

    expect(spriteLayout.enemy.y).toBe(218);
    expect(spriteLayout.player.y).toBe(382);
  });

  it('keeps the player sprite below the enemy info panel', () => {
    const panelLayout = battleUnitPanelLayouts();
    const spriteLayout = battleSpriteLayouts();
    const displayHeight = 192 * normalizedSpriteScale(spriteLayout.player.scale, 192);
    const playerTop = spriteLayout.player.y - displayHeight;
    const enemyPanelBottom = panelLayout.enemy.y + panelLayout.enemy.height;

    expect(playerTop).toBeGreaterThanOrEqual(enemyPanelBottom + 8);
  });

  it('keeps battle sprites enlarged for pathimon readability', () => {
    const spriteLayout = battleSpriteLayouts();

    expect(spriteLayout.enemy.scale).toBe(2.5);
    expect(spriteLayout.player.scale).toBe(2.1);
  });

  it('scales trainer sprites up from extracted pokerogue frames', () => {
    const trainer = createMonster({ isTrainer: true, assetPath: 'images/trainers/doctor_m.png' });

    expect(combatSpriteScale(trainer, 2.5)).toBe(2.75);
    expect(combatSpriteScale(createMonster(), 2.5)).toBe(2.5);
  });

  it('uses capsule-derived pathimon type border colors only in challenge mode', () => {
    expect(pathimonTypeBorderColor(createMonster({ category: '바이러스' }), 'challenge')).toBe(0xeff3f7);
    expect(pathimonTypeBorderColor(createMonster({ category: '세균' }), 'challenge')).toBe(0x409bf4);
    expect(pathimonTypeBorderColor(createMonster({ category: '진균' }), 'challenge')).toBe(0x181818);
    expect(pathimonTypeBorderColor(createMonster({ category: '원충' }), 'challenge')).toBe(0x21167e);
    expect(pathimonTypeBorderColor(createMonster({ category: '연충' }), 'challenge')).toBe(0xeaab1d);
    expect(pathimonTypeBorderColor(createMonster({ category: '프리온' }), 'challenge')).toBe(0xa441bd);
    expect(pathimonTypeBorderColor(createMonster({ category: '박테리아' }), 'challenge')).toBe(0x409bf4);
    expect(pathimonTypeBorderColor(createMonster({ category: '곰팡이' }), 'challenge')).toBe(0x181818);
    expect(pathimonTypeBorderColor(createMonster({ category: '프로토조아' }), 'challenge')).toBe(0x21167e);
    expect(pathimonTypeBorderColor(createMonster({ category: '기생충' }), 'challenge')).toBe(0xeaab1d);
    expect(pathimonTypeBorderColor(createMonster({ category: '세균' }), 'learning')).toBeUndefined();
    expect(pathimonTypeBorderColor(createMonster({ category: '사람', isTrainer: true }), 'challenge')).toBeUndefined();
  });

  it('shows type icons for challenge-mode player pathimon only', () => {
    expect(pathimonTypeIcon(createMonster({ category: '기생충' }), 'challenge')).toEqual({
      assetPath: 'images/ui/types/parasite.png',
      color: 0xeaab1d,
      kind: 'parasite',
    });
    expect(pathimonTypeIcon(createMonster({ category: '세균' }), 'learning')).toBeUndefined();
    expect(pathimonTypeIcon(createMonster({ category: '사람', isTrainer: true }), 'challenge')).toBeUndefined();
  });

  it('exposes image assets for pathimon type badges and sealed signature moves', () => {
    expect(pathimonTypeIconAssetPaths()).toEqual([
      'images/ui/types/virus.png',
      'images/ui/types/bacteria.png',
      'images/ui/types/fungus.png',
      'images/ui/types/protozoa.png',
      'images/ui/types/parasite.png',
      'images/ui/types/prion.png',
    ]);
    expect(lockedMoveOverlayPath()).toBe('images/ui/locked-move-chain.png');
  });

  it('keeps unit panel text focused on role-specific battle information', () => {
    const playerRows = battleUnitPanelRows(createMonster(), 'player');
    const wildRows = battleUnitPanelRows(createMonster({ name: '레트로잠' }), 'enemy');
    const trainerRows = battleUnitPanelRows(createMonster({ isTrainer: true, name: '역학 분석가', scientificName: '일반 사람 (Human Host)' }), 'enemy');
    const bossRows = battleUnitPanelRows(createMonster({ isTrainer: true, isBoss: true, name: '면역 지휘관', scientificName: '보스 사람' }), 'enemy');

    expect(playerRows.map((row) => row.kind)).not.toContain('heading');
    expect(playerRows).toContainEqual({ kind: 'defense', text: '방어특성: 보체회피' });
    expect(wildRows.map((row) => row.kind)).not.toContain('heading');
    expect(wildRows).toContainEqual({ kind: 'defense', text: '방어특성: 보체회피' });
    expect(trainerRows.map((row) => row.kind)).not.toContain('scientificName');
    expect(bossRows).toContainEqual({ kind: 'heading', text: 'BOSS' });
  });
  it('keeps high-resolution microscope sprites at the same displayed battle size', () => {
    expect(normalizedSpriteScale(2.5, 96)).toBe(2.5);
    expect(normalizedSpriteScale(2.5, 1254)).toBeCloseTo(2.5 * 96 / 1254, 5);
    expect(normalizedSpriteScale(2.75, 80)).toBe(2.75);
  });

  it('places the command cursor marker outside the left edge of the active button', () => {
    const button = { x: 646, y: 420, width: 144, height: 42 };
    const marker = cursorMarkerPoint(button);

    expect(marker.x).toBeLessThan(button.x);
    expect(marker.y).toBe(button.y + button.height / 2);
  });

  it('keeps the mobile home button small in the lower-right corner', () => {
    const button = mobileHomeButtonLayout();

    expect(button.label).toBe('처음으로');
    expect(button.x + button.width).toBeLessThanOrEqual(1024);
    expect(button.y + button.height).toBeLessThanOrEqual(576);
    expect(button.width).toBeLessThan(130);
  });

  it('exposes capture-only command actions for wild pathimon encounters', () => {
    expect(battleActionOptions('wild')).toEqual([
      { id: 'pass', label: '지나간다' },
      { id: 'capsule', label: '캡슐' },
      { id: 'dex', label: '도감' },
      { id: 'party', label: '패시몬' },
    ]);
  });

  it('keeps fight commands for human encounters and disables capsules', () => {
    expect(battleActionOptions('trainer')).toEqual([
      { id: 'fight', label: '싸운다' },
      { id: 'dex', label: '도감' },
      { id: 'party', label: '패시몬' },
      { id: 'capsule', label: '캡슐 불가', disabled: true },
    ]);
  });

  it('maps capsule ids to readable menu icon assets', () => {
    expect(CAPSULE_ORDER.map(capsuleIconPath)).toEqual([
      'images/capsules/universal.png',
      'images/capsules/virus.png',
      'images/capsules/bacteria.png',
      'images/capsules/parasite.png',
      'images/capsules/fungus.png',
      'images/capsules/protozoa.png',
      'images/capsules/prion.png',
    ]);
  });

  it('shows contextual party submenu options', () => {
    expect(partyMenuOptions('switch')).toEqual(['능력치를 본다', '교체한다', '그만둔다']);
    expect(partyMenuOptions('release')).toEqual(['놓아준다', '능력치를 본다', '그만둔다']);
    expect(partyMenuOptions('forced')).toEqual(['능력치를 본다', '교체한다']);
  });

  it('derives pokerogue atlas json paths from sprite png paths', () => {
    expect(pokerogueAtlasJsonPath('images/pokemon/back/10.png')).toBe('images/pokemon/back/10.json');
  });

  it('keeps the pokerogue battlefield layers at native scale instead of stretching platform pads', () => {
    expect(battleFieldLayerLayouts()).toEqual({
      background: { x: 0, y: 0, scale: 3.2 },
      enemyPlatform: { x: 0, y: -18, scale: 3.2 },
      playerPlatform: { x: 0, y: -40, scale: 3.2 },
    });
  });

  it('uses project-owned pathimon sprites for battle monsters', () => {
    expect(battleSceneAssetPaths()).toEqual({
      grassBack: 'images/arenas/grass_bg.png',
      grassMid: 'images/arenas/grass_a.png',
      grassFront: 'images/arenas/grass_b.png',
    });

    expect(pathimonSpriteAssets(createMonster({ templateId: 'staph' }), 'character')).toEqual({
      front: 'images/pathimon/staph-front.png',
      back: 'images/pathimon/staph-back.png',
    });

    expect(pathimonSpriteAssets(createMonster({ templateId: 'staph' }), 'micro')).toEqual({
      front: 'images/pathimon/staph-micro-front.png',
      back: 'images/pathimon/staph-micro-front.png',
    });
  });

  it('formats move details with Korean combat labels', () => {
    expect(formatMoveDetails('streptokinase')).toEqual([
      '혈전융해',
      '효과: 방어 -25%',
      '위력: 11',
      '명중률: 92%',
      '혈전과 장벽을 무너뜨려 방어를 깎는다.',
      '확산하기 쉽게 숙주의 방어선을 흐린다.',
    ]);
  });

  it('formats note-generated prep moves with note effects and name interpolation', () => {
    const monster = createMonster({
      name: '탄저록스',
      moveset: ['spore_germination'],
    });

    expect(formatMoveDetails('spore_germination', monster)).toEqual([
      '아포 발아',
      '효과: 95% 공격력 +1랭크 / 4% 공격력 +2랭크 / 1% 공격력 +4랭크, 상태이상: 발열, 기침, 피로',
      '위력: 0',
      '명중률: 100%',
      '탄저록스가 아포를 발아시켜 감염을 준비한다.',
      '탄저균은 아포 상태로 버티다가 숙주 안에서 발아해 감염을 시작한다.',
    ]);
  });

  it('formats move details into compact metadata and separate text sections', () => {
    const monster = createMonster({
      name: '탄저록스',
      moveset: ['spore_germination'],
    });

    expect(formatMoveDetailSections('spore_germination', monster)).toEqual({
      title: '아포 발아',
      metadata: '위력: 0 · 명중률: 100%',
      effect: '효과: 95% 공격력 +1랭크 / 4% 공격력 +2랭크 / 1% 공격력 +4랭크, 상태이상: 발열, 기침, 피로',
      description: '탄저록스가 아포를 발아시켜 감염을 준비한다.',
      learnText: '탄저균은 아포 상태로 버티다가 숙주 안에서 발아해 감염을 시작한다.',
    });
  });

  it('formats status profile memo lines from pathimon note data', () => {
    const monster = createMonster({
      profileMemo: [
        '세균 타입이며 방어특성은 아포이다.',
        '그람양성 구조와 세포외 위치가 핵심이다.',
        '상처, 호흡기, 소화기 경로로 감염될 수 있다.',
        '아포와 독소, 협막 형성이 대표 병인이다.',
      ],
    });

    expect(statusProfileMemoLines(monster)).toEqual([
      '세균 타입이며 방어특성은 아포이다.',
      '그람양성 구조와 세포외 위치가 핵심이다.',
      '상처, 호흡기, 소화기 경로로 감염될 수 있다.',
      '아포와 독소, 협막 형성이 대표 병인이다.',
    ]);
  });

  it('shows the current stage in staged move names and details', () => {
    const monster = createMonster({
      moveset: ['anthrax_toxin'],
      moveStages: { anthrax_toxin: 2 },
    });

    expect(formatMoveName('anthrax_toxin', monster)).toBe('탄저 독소 3단계');
    expect(formatMoveDetails('anthrax_toxin', monster)).toEqual([
      '탄저 독소 3단계',
      '효과: 상태이상: 괴사',
      '위력: 200',
      '명중률: 100%',
      '화농성연쇄상구균은 LF(lethal factor)로 MAP kinase를 잘라 세포를 괴사시켰다.',
      'LF는 MAPK 경로를 방해해 세포 손상과 괴사를 유도한다.',
    ]);
  });

  it('describes the enemy planned move for the command view', () => {
    const enemy = createMonster({ name: '황색포도알균', moveset: ['tsst', 'alpha_toxin', 'pvl', 'coagulase'] });

    expect(enemyIntentText(enemy)).toBe('황색포도알균은 초항원(TSST 폭주)을 하려고 한다.');
  });

  it('uses the boss planned move when one has been selected', () => {
    const enemy = createMonster({
      name: '면역챔피언',
      isBoss: true,
      isTrainer: true,
      moveset: ['m_phago', 'm_opsonin'],
      plannedMoveId: 'm_opsonin',
    });

    expect(enemyIntentText(enemy)).toBe('면역챔피언은 옵소닌표적(옵소닌 표적)을 하려고 한다.');
  });

  it('orders human battle command copy as prompt, entry log, then planned move', () => {
    const player = createMonster({ name: '플루리온' });
    const enemy = createMonster({ name: '검체 연구원', isTrainer: true, moveset: ['m_interferon'] });

    expect(commandViewLines(player, enemy, 'trainer', '검체 연구원이 승부를 걸어왔다.', '도움말')).toEqual([
      '플루리온은 무엇을 할까?',
      '검체 연구원이 승부를 걸어왔다.',
      '검체 연구원은 인터페론(인터페론)을 하려고 한다.',
    ]);
  });

  it('does not show planned enemy moves for wild pathimon command copy', () => {
    const player = createMonster({ name: '플루리온' });
    const enemy = createMonster({ name: '레트로잠', moveset: ['hiv_cd4'] });

    expect(commandViewLines(player, enemy, 'wild', '레트로잠이 나타났다.', '도움말')).toEqual([
      '플루리온은 무엇을 할까?',
      '레트로잠이 나타났다.',
    ]);
  });

  it('places the hp percent label to the right of the hp bar', () => {
    const panel = battleUnitPanelLayouts().player;
    const layout = battleHpBarLayout(panel);

    expect(layout.percentX).toBe(panel.x + panel.width - 36);
    expect(layout.percentX).toBeGreaterThan(layout.barX + layout.barWidth);
  });
  it('returns hp percentage and effect labels for the unit panel', () => {
    const monster = createMonster({
      effects: [
        { kind: 'buff', stat: 'attack', rank: 1, pct: 100, turns: 2 },
        { kind: 'field', side: 'incoming', factor: 0.5, turns: 2 },
        { kind: 'invuln', turns: 3 },
        { kind: 'dot', power: 4, turns: 2 },
        { kind: 'convert', power: 6, turns: 99 },
      ],
    });

    expect(hpPct(monster)).toBe(0.5);
    expect(hpPercentLabel(monster)).toBe('50%');
    expect(effectLabels(monster)).toEqual([
      '공격 +1',
      '피해감소',
      '무적 3턴',
      '지속피해',
      '개종',
    ]);
    expect(statusSummary(monster)).toBe('상태: 공격 +1, 피해감소, 무적 3턴, 지속피해, 개종');
  });

  it('adds stacked canonical status conditions to the unit panel status text', () => {
    const monster = createMonster({
      statusConditions: {
        fever: 3,
        cough: 1,
        immune_abnormal: 2,
        necrosis: 2,
        blindness: 2,
        hearing_abnormal: 1,
        pain: 1,
        itching: 1,
        jaundice: 1,
      },
    });

    expect(effectLabels(monster)).toEqual(['발열(3)', '기침', '면역 이상(2)', '괴사(2)', '시력 이상(2)', '청력 이상', '통증', '가려움', '황달']);
    expect(statusSummary(monster)).toBe('상태: 발열(3), 기침, 면역 이상(2), 괴사(2), 시력 이상(2), 청력 이상, 통증, 가려움, 황달');
  });

  it('stacks repeated boss symptoms in the displayed symptom summary', () => {
    const boss = createMonster({
      isTrainer: true,
      symptoms: ['기침', '발열', '기침', '호흡 곤란(2)', '호흡 곤란'],
    });

    expect(symptomSummary(boss)).toBe('기침(2), 발열, 호흡 곤란(3)');
  });

  it('locks signature moves after they are used once in the current battle', () => {
    const monster = createMonster({
      signatureUnlocked: true,
      usedSignatureMoveIds: ['capsule_formation'],
    });

    expect(canUseBattleMove(monster, 'capsule_formation')).toBe(false);
    expect(battleMoveUnavailableReason(monster, 'capsule_formation')).toBe('전용기는 전투당 한 번만 사용할 수 있습니다.');
    expect(canUseBattleMove(createMonster({ signatureUnlocked: false }), 'capsule_formation')).toBe(false);
    expect(battleMoveUnavailableReason(createMonster({ signatureUnlocked: false }), 'capsule_formation')).toBe('전용기가 아직 해금되지 않았습니다.');
    expect(canUseBattleMove(monster, 'hyaluronidase')).toBe(true);
  });

  it('uses necrosis-adjusted max hp for hp percentage labels', () => {
    const monster = createMonster({
      maxHp: 200,
      hp: 95,
      statusConditions: { necrosis: 1 },
    });

    expect(hpPct(monster)).toBe(0.5);
    expect(hpPercentLabel(monster)).toBe('50%');
  });

  it('uses a short fallback label when no status effects are active', () => {
    expect(statusSummary(createMonster())).toBe('상태: 정상');
  });

  it('formats only the active pathimon moves for the battle pokedex view', () => {
    const rows = formatPokedexMoveRows(createMonster().moveset);

    expect(rows).toHaveLength(4);
    expect(rows[0]).toEqual({
      name: '혈전융해',
      type: '조직융해',
      power: '11',
      accuracy: '92%',
      description: '혈전과 장벽을 무너뜨려 방어를 깎는다.',
      learnText: '확산하기 쉽게 숙주의 방어선을 흐린다.',
    });
  });

  it('formats type matchup rows for the battle pokedex view', () => {
    const rows = formatPokedexEffectivenessRows();

    expect(rows).toContainEqual({
      attackType: '포식소화',
      target: '피막장벽',
      multiplier: '무효',
    });
    expect(rows).toContainEqual({
      attackType: '대식세포각성',
      target: '세포내',
      multiplier: '강함 x2',
    });
  });

  it('summarizes attack and defense advice for the current battle matchup', () => {
    const player = createMonster({ ability: 'large_resistance', tags: { pathway: 'gut', wall: 'nematode', location: 'intestinal_lumen', size: 'large' } });
    const enemy = createMonster({ name: '황색포도알균', ability: 'capsule' });
    const sections = formatBattleMatchupSections(player, enemy);

    expect(sections.offense).toContainEqual({
      attackType: '옵소닌표적',
      target: '피막장벽',
      multiplier: '강함 x2',
    });
    expect(sections.defense).toContainEqual({
      attackType: '호산구공격',
      target: '선충',
      multiplier: '강함 x2',
    });
  });

  it('summarizes current boss attacks by super-effective and immune defense traits', () => {
    const boss = createMonster({
      isBoss: true,
      isTrainer: true,
      moveset: ['m_phago', 'm_opsonin', 'm_cell_wall_inhibitor', 'm_antiviral_replication'],
    });

    const rows = formatBossAttackMatchupRows(boss);

    expect(rows).toHaveLength(4);
    expect(rows[0]).toMatchObject({
      attackName: '대식세포 포식',
      attackType: '포식소화',
      superTargets: '무방비, 세포외, 미시',
      noneTargets: '피막장벽, 바이오필름, 항산성막, 식포융합차단, 대형저항, 대형 병원체, 무핵산',
    });
    expect(rows[2]).toMatchObject({
      attackName: '세포벽 억제제',
      attackType: '세포벽억제',
      superTargets: '세균 세포벽, 그람+, 그람−',
      noneTargets: expect.stringContaining('무세포벽'),
    });
  });

  it('chooses random normal battle bgm and boss bgm from copied pokerogue assets', () => {
    const assets = battleBgmAssetPaths();

    expect(chooseBattleBgm({ floor: 1, isBoss: false, roll: 0 })).toBe(assets.normal[0]);
    expect(chooseBattleBgm({ floor: 9, isBoss: false, roll: 0.99 })).toBe(assets.normal[assets.normal.length - 1]);
    expect(chooseBattleBgm({ floor: 10, isBoss: true, roll: 0 })).toBe(assets.boss[0]);
    expect(chooseBattleBgm({ floor: 20, isBoss: true, roll: 0.99 })).toBe(assets.boss[assets.boss.length - 1]);
  });

  it('previews a different move before arming it for execution', () => {
    expect(
      resolveMoveSelectionPress({
        armedMoveId: 'streptokinase',
        moveId: 'hyaluronidase',
        selectedMoveId: 'streptokinase',
      }),
    ).toEqual({
      intent: 'preview',
      armedMoveId: 'hyaluronidase',
      selectedMoveId: 'hyaluronidase',
    });
  });

  it('keeps a hover-previewed move from executing on its first press', () => {
    expect(
      resolveMoveSelectionPress({
        armedMoveId: 'streptokinase',
        moveId: 'hyaluronidase',
        selectedMoveId: 'hyaluronidase',
      }),
    ).toEqual({
      intent: 'preview',
      armedMoveId: 'hyaluronidase',
      selectedMoveId: 'hyaluronidase',
    });
  });

  it('executes a move only after it has already been previewed', () => {
    expect(
      resolveMoveSelectionPress({
        armedMoveId: 'hyaluronidase',
        moveId: 'hyaluronidase',
        selectedMoveId: 'hyaluronidase',
      }),
    ).toEqual({
      intent: 'execute',
      armedMoveId: 'hyaluronidase',
      selectedMoveId: 'hyaluronidase',
    });
  });
});
