type CanvasContextStub = {
  fillStyle: string;
  globalCompositeOperation: string;
  drawImage: () => void;
  fillRect: () => void;
  getImageData: () => { data: Uint8ClampedArray };
  putImageData: () => void;
};

const contextStub: CanvasContextStub = {
  fillStyle: '#000000',
  globalCompositeOperation: 'source-over',
  drawImage: () => {},
  fillRect: () => {},
  getImageData: () => ({ data: new Uint8ClampedArray([0, 0, 0, 255]) }),
  putImageData: () => {},
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: () => contextStub,
});
