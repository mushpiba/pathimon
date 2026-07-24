export type KeyboardCommand = 'up' | 'down' | 'left' | 'right' | 'confirm' | 'cancel';

export function keyboardCommand(key: string): KeyboardCommand | undefined {
  switch (key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      return 'up';
    case 'arrowdown':
    case 's':
      return 'down';
    case 'arrowleft':
    case 'a':
      return 'left';
    case 'arrowright':
    case 'd':
      return 'right';
    case 'enter':
      return 'confirm';
    case 'escape':
    case 'backspace':
      return 'cancel';
    default:
      return undefined;
  }
}
