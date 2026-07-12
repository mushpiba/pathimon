function hasFinalConsonant(text: string): boolean {
  const last = text.trim().charCodeAt(text.trim().length - 1);
  if (last < 0xac00 || last > 0xd7a3) return false;
  return (last - 0xac00) % 28 > 0;
}

function particleFor(name: string, particle: string): string {
  const hasBatchim = hasFinalConsonant(name);
  if (particle === '이' || particle === '가') return hasBatchim ? '이' : '가';
  if (particle === '은' || particle === '는') return hasBatchim ? '은' : '는';
  if (particle === '을' || particle === '를') return hasBatchim ? '을' : '를';
  return particle;
}

export function interpolatePathimonName(text: string, name: string): string {
  return text
    .replace(/\{name\}([이가은는을를])/g, (_, particle: string) => `${name}${particleFor(name, particle)}`)
    .replace(/\{name\}/g, name);
}

