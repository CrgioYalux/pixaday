import type { Color } from '../useColorPalette/types';

type Point = {
    x: number,
    y: number,
};

namespace ColorMatrix {
    export type Cell = {
        id: number,
        value: Color,
        position: Point,
    };

    export type State = ColorMatrix.Cell[][];

    export type Actions = {
        paint: (color: Color, position: Point) => void,
        paintAll: (color: Color) => void,
        fill: (color: Color, position: Point) => void,
        changeSize: (size: number) => void,
        resetCanvas: () => void,
    };

    export namespace Hook {
        export type Use = [
            ColorMatrix.State,
            ColorMatrix.Actions
        ];
        export type Props = {
            allColor?: Color;
            size: number;
        };
    }
}

export type {
    Point,
    ColorMatrix
};
