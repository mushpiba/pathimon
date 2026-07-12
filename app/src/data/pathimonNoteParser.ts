import type {
  AbilityId,
  AttackType,
  EffectPrimitive,
  MonsterData,
  MoveData,
  MoveId,
  MoveOutcome,
  MoveStageData,
  StatusConditionId,
  TagValue,
} from '../types/game';

interface NoteMoveResult {
  chance: number;
  description: string;
  effect: string;
  learnText: string;
  power?: number;
  stage?: string;
  statusConditions: string;
  symptom?: string;
}

interface NoteMove {
  accuracy: number;
  description: string;
  effect: string;
  kind?: MoveData['kind'];
  learnText: string;
  name: string;
  power: number;
  resultPowers: number[];
  results: NoteMoveResult[];
  type: AttackType;
  typeLabel?: string;
}

interface ParsedPathimonNote {
  category: string;
  defenseAbilities: AbilityId[];
  koreanScientificName: string;
  memo: string[];
  moves: NoteMove[];
  name: string;
  scientificName: string;
  tags: Partial<Record<'pathway' | 'wall' | 'location' | 'size', TagValue>>;
}

export interface PathimonNoteBuildOptions {
  captureRate: number;
  defaultStats: {
    attack: number;
    defense: number;
    maxHp: number;
  };
  fallbackName?: string;
  glyph: string;
  id: string;
  moveIds?: Partial<Record<string, MoveId>>;
}

interface BuiltPathimonNoteData {
  monster: MonsterData;
  moves: Partial<Record<MoveId, MoveData>>;
}

const ATTACK_TYPE_BY_NOTE_VALUE: Record<string, AttackType> = {
  준비: 'special',
  독소: 'toxin',
  효소독소: 'toxin',
  효소: 'toxin',
  방어: 'special',
  특수: 'special',
  침습: 'spread',
  부착: 'special',
  소화기: 'toxin',
  호흡기: 'lysis',
  이동: 'spread',
  전파: 'spread',
  만성: 'immune_mediated',
  신경: 'toxin',
  잠복: 'special',
  눈: 'lysis',
  증식: 'special',
  유전: 'special',
  흡혈: 'lysis',
  요로: 'lysis',
  내성: 'special',
  대형기생: 'lysis',
  조직융해: 'spread',
  조직이행: 'spread',
  혈관: 'lysis',
  세포용해: 'lysis',
  면역매개: 'immune_mediated',
};

const KIND_BY_NOTE_VALUE: Record<string, MoveData['kind']> = {
  준비기: 'prep',
  공격기: 'attack',
  전용기: 'signature',
};

const TAG_BY_NOTE_VALUE: Record<string, TagValue> = {
  그람양성: 'gram_positive',
  그람음성: 'gram_negative',
  그람음성쌍알균: 'gram_negative',
  그람음성유사: 'gram_negative',
  그람가변성: 'gram_positive',
  항산성: 'mycobacterial',
  약항산성: 'mycobacterial',
  산저항성: 'mycobacterial',
  무세포벽: 'none',
  피막바이러스: 'enveloped_virus',
  외피보유: 'enveloped_virus',
  레트로바이러스: 'retrovirus',
  비외피: 'none',
  DNA: 'none',
  RNA: 'none',
  dsRNA: 'none',
  HAV: 'none',
  HEV: 'none',
  HBV: 'enveloped_virus',
  HCV: 'enveloped_virus',
  HDV: 'enveloped_virus',
  코로나바이러스: 'enveloped_virus',
  파라믹소바이러스: 'enveloped_virus',
  헤르페스바이러스: 'enveloped_virus',
  아레나바이러스: 'enveloped_virus',
  탄환형: 'enveloped_virus',
  피코르나바이러스: 'none',
  칼리시바이러스: 'none',
  이중캡시드: 'none',
  선충: 'nematode',
  사상충: 'nematode',
  심장사상충: 'nematode',
  구충: 'nematode',
  쥐폐선충: 'nematode',
  흡충: 'trematode',
  간질: 'trematode',
  잎모양흡충: 'trematode',
  소형장흡충: 'trematode',
  장흡충: 'trematode',
  조충: 'cestode',
  소형조충: 'cestode',
  조충유충: 'cestode',
  연충: 'large',
  유충: 'large',
  유충성충: 'large',
  '유충-성충': 'large',
  이동유충: 'large',
  미세사상충: 'large',
  두관극: 'large',
  두관극부착: 'large',
  무구두절: 'cestode',
  세포외: 'extracellular',
  세포내: 'intracellular',
  세포질: 'intracellular_cytosol',
  식포: 'intracellular_phagosome',
  대식세포내: 'intracellular_phagosome',
  포식소체: 'intracellular_phagosome',
  적혈구: 'erythrocyte',
  적혈구내: 'erythrocyte',
  장관: 'intestinal_lumen',
  장관강: 'intestinal_lumen',
  소장: 'intestinal_lumen',
  소장점막: 'intestinal_lumen',
  대장: 'intestinal_lumen',
  결막: 'mucosal',
  결막낭: 'mucosal',
  눈물관: 'mucosal',
  혈관: 'vascular',
  혈류: 'vascular',
  상처: 'wound',
  호흡기: 'respiratory',
  비말: 'respiratory',
  호흡기비말: 'respiratory',
  흡입: 'respiratory',
  에어로졸: 'respiratory',
  에어로졸흡입: 'respiratory',
  공기매개: 'respiratory',
  포자흡입: 'respiratory',
  소화기: 'gut',
  음식: 'gut',
  오염식품: 'gut',
  오염수: 'gut',
  분변구강: 'gut',
  '분변-구강': 'gut',
  '분변-경구': 'gut',
  포낭섭취: 'gut',
  충란섭취: 'gut',
  낭미충섭취: 'gut',
  조직낭종섭취: 'gut',
  중간숙주섭취: 'gut',
  덜익힘: 'gut',
  덜익힌돼지고기: 'gut',
  돼지고기: 'gut',
  소고기: 'gut',
  해산물: 'gut',
  해산물생식: 'gut',
  해산어섭취: 'gut',
  패류: 'gut',
  참게: 'gut',
  가재섭취: 'gut',
  민물고기: 'gut',
  민물고기생식: 'gut',
  민물고기섭취: 'gut',
  어류: 'gut',
  어류섭취: 'gut',
  수생식물섭취: 'gut',
  피부: 'skin',
  피부침투: 'transcutaneous',
  점막: 'mucosal',
  요로: 'urinary',
  접촉: 'contact',
  동물접촉: 'contact',
  동물교상: 'contact',
  구강상재: 'contact',
  구강구강: 'contact',
  '구강-구강': 'contact',
  내인성: 'contact',
  기회감염: 'contact',
  병원내: 'contact',
  의료기구: 'contact',
  치과시술: 'contact',
  카테터: 'contact',
  성접촉: 'sexual',
  경피: 'transcutaneous',
  물접촉: 'transcutaneous',
  상처해수: 'wound',
  혈액: 'blood',
  수직감염: 'blood',
  태반: 'blood',
  모기매개: 'blood',
  진드기매개: 'blood',
  벼룩: 'blood',
  먹파리매개: 'blood',
  등에매개: 'blood',
  모래파리매개: 'blood',
  절지동물매개: 'blood',
  흡혈곤충매개: 'blood',
  초파리매개: 'blood',
};

const ABILITY_BY_NOTE_VALUE: Record<string, AbilityId> = {
  없음: 'none',
  아포: 'spore',
  협막: 'capsule',
  피막: 'capsule',
  Vi협막: 'capsule',
  F1협막: 'capsule',
  과점액협막: 'capsule',
  바이오필름: 'biofilm',
  세포내생존: 'phagolysosome_block',
  세포내침입: 'phagolysosome_block',
  포식소체성숙차단: 'phagolysosome_block',
  잠복: 'latency',
  항산성막: 'acidfast',
  산저항: 'acidfast',
  무세포벽: 'barrier',
  위막장벽: 'barrier',
  M단백: 'comp_evade',
  부착선모: 'epithelial_barrier',
  내성효소: 'antitoxin',
  대형저항: 'large_resistance',
  유충이행: 'large_resistance',
  흡혈: 'large_resistance',
  자가감염: 'large_resistance',
  근육낭종: 'large_resistance',
  접촉전파: 'large_resistance',
  장점막고정: 'large_resistance',
  피하결절: 'large_resistance',
  피하이동: 'large_resistance',
  눈기생: 'large_resistance',
  담관정착: 'large_resistance',
  간이행: 'large_resistance',
  폐낭종: 'large_resistance',
  조직이행: 'large_resistance',
  낭미충: 'large_resistance',
  림프정착: 'antigen_disguise',
  항원위장: 'antigen_disguise',
};

const CONDITION_BY_NOTE_VALUE: Record<string, StatusConditionId> = {
  발열: 'fever',
  열: 'fever',
  탈수: 'dehydration',
  피로: 'fatigue',
  구토: 'vomiting',
  '배설 이상': 'excretory_dysfunction',
  배설이상: 'excretory_dysfunction',
  '배변 이상': 'excretory_dysfunction',
  배변이상: 'excretory_dysfunction',
  '배뇨 이상': 'excretory_dysfunction',
  배뇨이상: 'excretory_dysfunction',
  기침: 'cough',
  '혈압 이상': 'blood_pressure',
  '호흡 곤란': 'dyspnea',
  부종: 'edema',
  '신경 이상': 'neurologic',
  마비: 'paralysis',
  출혈: 'bleeding',
  '면역 이상': 'immune_abnormal',
  '면역 붕괴': 'immune_abnormal',
  '호산구 증가': 'immune_abnormal',
  호산구증가: 'immune_abnormal',
  괴사: 'necrosis',
  '시력 이상': 'blindness',
  시력이상: 'blindness',
  복시: 'blindness',
  안검하수: 'blindness',
  '청력 이상': 'hearing_abnormal',
  청력이상: 'hearing_abnormal',
  통증: 'pain',
  근육통: 'pain',
  복통: 'pain',
  가려움: 'itching',
  황달: 'jaundice',
};

function normalizeLines(note: string): string[] {
  return note.replace(/\r\n/g, '\n').split('\n');
}

function readField(lines: string[], key: string): string {
  const prefix = `${key}:`;
  return lines.find((line) => line.startsWith(prefix))?.slice(prefix.length).trim() ?? '';
}

function sectionLines(lines: string[], section: string): string[] {
  const start = lines.findIndex((line) => line.trim() === `${section}:`);
  if (start < 0) return [];

  const result: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[^\s:#][^:]*:\s*$/.test(line)) break;
    result.push(line);
  }
  return result;
}

function readListValue(lines: string[], key: string): string {
  const prefix = `- ${key}:`;
  return lines.find((line) => line.trimStart().startsWith(prefix))?.trimStart().slice(prefix.length).trim() ?? '';
}

function parseScientificName(value: string): { koreanScientificName: string; scientificName: string } {
  const match = value.match(/^(.*?)\((.*?)\)\s*$/);
  if (!match) {
    return { koreanScientificName: value.trim(), scientificName: value.trim() };
  }

  return {
    koreanScientificName: match[1].trim(),
    scientificName: match[2].trim(),
  };
}

function firstMappedTag(value: string): TagValue | undefined {
  return value
    .split('/')
    .map((token) => TAG_BY_NOTE_VALUE[token.trim()])
    .find(Boolean);
}

function parseTags(lines: string[]): ParsedPathimonNote['tags'] {
  const structure = firstMappedTag(readListValue(lines, 'structure'));
  const location = firstMappedTag(readListValue(lines, 'location')) ?? 'extracellular';
  const pathway = firstMappedTag(readListValue(lines, 'pathway'));

  return {
    ...(pathway ? { pathway } : {}),
    ...(structure ? { wall: structure } : {}),
    location,
    size: 'microscopic',
  };
}

function parseDefenseAbilities(value: string): AbilityId[] {
  const abilities = value
    .split(/[,\s/]+/)
    .map((token) => ABILITY_BY_NOTE_VALUE[token.trim()])
    .filter((ability): ability is AbilityId => Boolean(ability) && ability !== 'none');

  return abilities.length > 0 ? abilities : ['none'];
}

function parseMemoLines(lines: string[]): string[] {
  return lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter((line) => line.length > 0);
}

function parsePercent(value: string, fallback = 1): number {
  const numeric = Number(value.replace('%', '').trim());
  return Number.isFinite(numeric) ? numeric / 100 : fallback;
}

function parsePower(value: string): { basePower: number; resultPowers: number[] } {
  const staged = value.match(/단계별\(([^)]*)\)/);
  if (staged) {
    const resultPowers = staged[1]
      .split('/')
      .map((token) => Number(token.trim()))
      .filter((power) => Number.isFinite(power));
    return { basePower: resultPowers[0] ?? 0, resultPowers };
  }

  const basePower = Number(value.trim());
  return { basePower: Number.isFinite(basePower) ? basePower : 0, resultPowers: [] };
}

function parseMoveBlocks(lines: string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] | undefined;

  for (const line of lines) {
    if (line.startsWith('- 이름:')) {
      current = [line];
      blocks.push(current);
      continue;
    }

    if (current) current.push(line);
  }

  return blocks;
}

function fieldFromBlock(block: string[], key: string): string {
  const match = block.find((line) => line.trimStart().startsWith(`${key}:`));
  return match?.trimStart().slice(key.length + 1).trim() ?? '';
}

function topLevelFieldFromBlock(block: string[], key: string): string {
  const prefix = `  ${key}:`;
  return block.find((line) => line.startsWith(prefix))?.slice(prefix.length).trim() ?? '';
}

function parseResultBlocks(block: string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] | undefined;

  for (const line of block) {
    if (line.trimStart().startsWith('- 확률:')) {
      current = [line];
      blocks.push(current);
      continue;
    }

    if (current && line.startsWith('      ')) current.push(line);
  }

  return blocks;
}

function parseMoveResult(block: string[], power?: number): NoteMoveResult {
  return {
    chance: parsePercent(fieldFromBlock(block, '- 확률')),
    description: fieldFromBlock(block, 'description'),
    effect: fieldFromBlock(block, '효과'),
    learnText: fieldFromBlock(block, 'learnText'),
    power,
    stage: fieldFromBlock(block, '단계'),
    statusConditions: fieldFromBlock(block, '상태이상'),
    symptom: fieldFromBlock(block, '증상') || undefined,
  };
}

function fallbackMoveDescription(moveName: string, kind?: MoveData['kind']): string {
  if (kind === 'prep') return `{name}이 ${moveName}로 감염을 준비한다.`;
  if (kind === 'signature') return `{name}이 ${moveName}을 사용한다.`;
  return `{name}이 ${moveName}을 사용한다.`;
}

function typeLabelForMove(rawType: string, kind?: MoveData['kind']): string | undefined {
  if (rawType) return rawType;
  if (kind === 'prep') return '준비';
  if (kind === 'signature') return '전용';
  return undefined;
}

function parseMove(block: string[]): NoteMove {
  const name = block[0].slice('- 이름:'.length).trim();
  const kind = KIND_BY_NOTE_VALUE[topLevelFieldFromBlock(block, '종류')];
  const rawType = topLevelFieldFromBlock(block, '타입');
  const type = ATTACK_TYPE_BY_NOTE_VALUE[rawType] ?? 'special';
  const { basePower, resultPowers } = parsePower(topLevelFieldFromBlock(block, '위력'));
  const resultBlocks = parseResultBlocks(block);
  const results = resultBlocks.map((resultBlock, index) => parseMoveResult(resultBlock, resultPowers[index]));

  return {
    accuracy: parsePercent(topLevelFieldFromBlock(block, '명중')),
    description: topLevelFieldFromBlock(block, 'description') || fallbackMoveDescription(name, kind),
    effect: topLevelFieldFromBlock(block, '효과'),
    kind,
    learnText: topLevelFieldFromBlock(block, 'learnText') || results[0]?.learnText || '',
    name,
    power: basePower,
    resultPowers,
    results,
    type,
    typeLabel: typeLabelForMove(rawType, kind),
  };
}

function parseNote(note: string, fallbackName?: string): ParsedPathimonNote {
  const lines = normalizeLines(note);
  const scientific = parseScientificName(readField(lines, '학명'));

  return {
    category: readField(lines, '타입'),
    defenseAbilities: parseDefenseAbilities(readField(lines, '방어특성')),
    koreanScientificName: scientific.koreanScientificName,
    memo: parseMemoLines(sectionLines(lines, '메모')),
    moves: parseMoveBlocks(sectionLines(lines, '기술')).map(parseMove),
    name: readField(lines, '이름') || fallbackName || scientific.koreanScientificName,
    scientificName: scientific.scientificName,
    tags: parseTags(sectionLines(lines, '태그')),
  };
}

function rankEffect(effect: string): EffectPrimitive | undefined {
  const match = effect.match(/공격력\s*\+(\d+)랭크/);
  if (!match) return undefined;
  const rank = Number(match[1]);

  return {
    kind: 'buff',
    stat: 'attack',
    rank,
    pct: (2 ** rank - 1) * 100,
    turns: 99,
    target: 'self',
  };
}

function invulnerabilityEffect(effect: string): EffectPrimitive | undefined {
  const match = effect.match(/무적\((\d+)\)/);
  if (!match) return undefined;

  return {
    kind: 'invuln',
    turns: Number(match[1]),
    target: 'self',
  };
}

function removeNonSignatureInvulnerabilityText(effect: string, kind?: MoveData['kind']): string {
  const trimmed = effect.trim();
  if (!trimmed || kind === 'signature') return trimmed;

  return trimmed
    .replace(/무적\(\d+\)/g, '')
    .replace(/\s*,\s*,\s*/g, ', ')
    .replace(/^\s*,\s*|\s*,\s*$/g, '')
    .trim();
}

function parseConditionToken(token: string): { condition: StatusConditionId; stacks?: number } | undefined {
  const match = token.trim().match(/^(.+?)(?:\((\d+)\))?$/);
  if (!match) return undefined;

  const rawName = match[1].trim();
  const condition = CONDITION_BY_NOTE_VALUE[rawName];
  if (!condition) return undefined;

  const stacks = match[2] ? Number(match[2]) : rawName === '면역 붕괴' ? 2 : undefined;
  return stacks && stacks > 1 ? { condition, stacks } : { condition };
}

function statusConditionEffects(statusConditions: string): EffectPrimitive[] {
  return statusConditions
    .split(',')
    .map(parseConditionToken)
    .filter((parsed): parsed is { condition: StatusConditionId; stacks?: number } => Boolean(parsed))
    .map(({ condition, stacks }) => ({
      kind: 'condition',
      condition,
      chance: 1,
      target: 'enemy',
      ...(stacks ? { stacks } : {}),
    }));
}

function resultEffects(result: NoteMoveResult, kind?: MoveData['kind']): EffectPrimitive[] | undefined {
  const effects = [
    rankEffect(result.effect),
    kind === 'signature' ? invulnerabilityEffect(result.effect) : undefined,
    ...statusConditionEffects(result.statusConditions),
  ].filter((effect): effect is EffectPrimitive => Boolean(effect));

  return effects.length > 0 ? effects : undefined;
}

function resultEffectText(result: Pick<NoteMoveResult, 'effect' | 'statusConditions'>, kind?: MoveData['kind']): string {
  const effect = removeNonSignatureInvulnerabilityText(result.effect, kind);
  const parts = [effect, result.statusConditions ? `상태이상: ${result.statusConditions}` : ''].filter(Boolean);
  return parts.join(', ');
}

function percentLabel(chance: number): string {
  return `${Math.round(chance * 100)}%`;
}

function moveEffectText(move: NoteMove): string | undefined {
  if (move.effect) return removeNonSignatureInvulnerabilityText(move.effect, move.kind) || undefined;
  if (!move.results.length) return undefined;

  const results = move.results
    .map((result) => {
      const effectText = resultEffectText(result, move.kind);
      return effectText ? `${percentLabel(result.chance)} ${effectText}` : '';
    })
    .filter(Boolean);

  return results.length > 0 ? results.join(' / ') : undefined;
}

function buildOutcome(move: NoteMove, result: NoteMoveResult): MoveOutcome {
  return {
    chance: result.chance,
    description: result.description || move.description,
    effectText: resultEffectText(result, move.kind) || undefined,
    effects: resultEffects(result, move.kind),
    learnText: result.learnText || move.learnText,
    power: result.power,
    symptom: result.symptom,
  };
}

function buildStage(move: NoteMove, result: NoteMoveResult): MoveStageData {
  return {
    name: result.stage ? `${move.name} ${result.stage}` : move.name,
    power: result.power ?? move.power,
    description: result.description || move.description,
    effectText: resultEffectText(result, move.kind) || undefined,
    effects: resultEffects(result, move.kind),
    learnText: result.learnText || move.learnText,
    symptom: result.symptom,
  };
}

function buildMove(move: NoteMove, id: MoveId): MoveData {
  const stagedResults = move.results.filter((result) => result.stage);
  const baseMove: MoveData = {
    id,
    kind: move.kind,
    name: move.name,
    type: move.type,
    typeLabel: move.typeLabel,
    power: move.power,
    accuracy: move.accuracy,
    signature: move.kind === 'signature' || undefined,
    description: move.description,
    effectText: moveEffectText(move),
    learnText: move.learnText || move.results[0]?.learnText || '',
    symptom: move.results[0]?.symptom,
  };

  if (stagedResults.length > 0) {
    return {
      ...baseMove,
      stageCycle: stagedResults.map((result) => buildStage(move, result)),
    };
  }

  if (move.results.length > 1) {
    return {
      ...baseMove,
      outcomes: move.results.map((result) => buildOutcome(move, result)),
    };
  }

  const onlyResult = move.results[0];
  if (!onlyResult) return baseMove;

  return {
    ...baseMove,
    effectText: resultEffectText(onlyResult, move.kind) || baseMove.effectText,
    effects: resultEffects(onlyResult, move.kind),
    learnText: onlyResult.learnText || baseMove.learnText,
    symptom: onlyResult.symptom || baseMove.symptom,
  };
}

function buildScientificLabel(note: ParsedPathimonNote): string {
  return `${note.koreanScientificName} (${note.scientificName})`;
}

function readStat(noteValue: string, fallback: number): number {
  const trimmed = noteValue.trim();
  if (!trimmed) return fallback;

  const numeric = Number(trimmed);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
}

function automaticMoveId(monsterId: string, index: number): MoveId {
  return `${monsterId}_move_${index + 1}`;
}

export function buildPathimonFromNote(noteText: string, options: PathimonNoteBuildOptions): BuiltPathimonNoteData {
  const note = parseNote(noteText, options.fallbackName);
  const moveEntries = note.moves.map((move, index) => {
    const moveId = options.moveIds?.[move.name] ?? automaticMoveId(options.id, index);
    return [moveId, buildMove(move, moveId)] as const;
  });
  const moves = Object.fromEntries(moveEntries) as Partial<Record<MoveId, MoveData>>;
  const prep = moveEntries.find(([, move]) => move.kind === 'prep')?.[0];
  const signature = moveEntries.find(([, move]) => move.kind === 'signature')?.[0];
  const abilities = note.defenseAbilities.filter((ability) => ability !== 'none');
  const statLines = sectionLines(normalizeLines(noteText), '능력치');

  return {
    monster: {
      id: options.id,
      name: note.name,
      scientificName: buildScientificLabel(note),
      category: note.category,
      glyph: options.glyph,
      tags: note.tags,
      maxHp: readStat(readListValue(statLines, 'HP'), options.defaultStats.maxHp),
      attack: readStat(readListValue(statLines, '공격'), options.defaultStats.attack),
      defense: readStat(readListValue(statLines, '방어'), options.defaultStats.defense),
      speed: 5,
      captureRate: options.captureRate,
      ability: abilities[0] ?? 'none',
      abilities,
      learnset: moveEntries.map(([moveId]) => moveId),
      profileMemo: note.memo,
      prep,
      signature,
    },
    moves,
  };
}
