export interface IGestureEvent {
    translationX: number;
    translationY: number;
}

export interface ICoordinate {
    x: number;
    y: number;
}

export interface IBoundaries {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

export enum Direction {
    Right,
    Left,
    Up,
    Down,
}