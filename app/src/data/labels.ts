import type { AttackType, TagAxis, TagValue } from '../types/game';

export const ATTACK_TYPE_LABELS: Record<AttackType, string> = {
  lysis: '세포용해',
  toxin: '효소독소',
  superantigen: '초항원',
  spread: '조직융해',
  endotoxin: '내독소',
  misfold: '단백질오폴딩',
  phago: '포식소화',
  oxidative: '활성산소',
  net: 'NET포박',
  opsonin: '옵소닌표적',
  antibody: '항체중화',
  complement: '보체MAC',
  ctl: '세포독성',
  th1: '대식세포각성',
  interferon: '인터페론',
};

export const TAG_AXIS_LABELS: Record<TagAxis, string> = {
  pathway: '감염경로',
  wall: '외피',
  location: '서식위치',
};

export const TAG_LABELS: Record<TagValue, string> = {
  respiratory: '호흡기',
  gut: '소화기',
  blood: '혈액매개',
  wound: '상처',
  skin: '피부',
  mucosal: '점막',
  contact: '접촉',
  gram_positive: '그람+',
  gram_negative: '그람−',
  mycobacterial: '항산성',
  enveloped_virus: '피막바이러스',
  fungal: '진균벽',
  protozoa: '원충',
  none: '해당 없음',
  extracellular: '세포외',
  intracellular: '세포내',
};
