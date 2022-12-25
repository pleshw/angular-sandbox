
export interface Point2D {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export function indexToRow( index: number, gridWidth: number ) {
  return Math.floor( index / gridWidth );
}

export function indexToCol( index: number, gridWidth: number ) {
  return index % gridWidth;
}

export function rowColToIndex( row: number, col: number, width: number ) {
  return ( row * width ) + col;
}


export function lerp( min: number, max: number, amount: number ): number {
  return ( 1 - amount ) * min + amount * max;
}

export function inverseLerp( a: number, b: number, val: number ): number {
  return ( val - a ) / ( b - a );
}

export function remap( inMin: number, inMax: number, outMin: number, outMax: number, val: number ): number {
  return lerp( outMin, outMax, inverseLerp( inMin, inMax, val ) );
}

export function getRandomIntExclusive( min: number, max: number ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}



export function getRandomIntInclusive( min: number, max: number ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

export function clamp( num: number = 0, min: number = 0, max: number = 100 ): number {
  return Math.max( min, Math.min( num, max ) );
}

export function minutesToMilliseconds( ms: number ) {
  return ms * 60000;
}

export function millisecondsToMinutes( ms: number ) {
  return ms / 60000;
}

export function millisecondsToHours( ms: number ) {
  return ms / 3.6e+6;
}

export function millisecondsToDays( ms: number ) {
  return ms / 8.64e+7;
}

export function megabyteToByte( mb: number ) {
  return mb * 1024 * 1024;
}

export function byteToMegabyte( b: number ) {
  return b / 1024 / 1024;
}
