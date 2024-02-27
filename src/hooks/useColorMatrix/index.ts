import { useState } from 'react';
import { paint, paintAll, fill, createColorMatrix, changeColorMatrixSize } from './utils';

import type { Color, Point, ColorMatrix } from './utils';

type ColorMatrixActions = {
    paint: (color: Color, position: Point) => void,
    paintAll: (color: Color) => void,
    fill: (color: Color, position: Point) => void,
    changeSize: (size: number) => void,
    resetCanvas: () => void,
}

export type useColorMatrixState = [
    ColorMatrix,
    ColorMatrixActions
]

type useColorMatrixProps = {
    allColor?: Color,
    size: number,
}

export function useColorMatrix({ size, allColor = 'white' }: useColorMatrixProps): useColorMatrixState {
    const [state, setState] = useState<ColorMatrix>(() => createColorMatrix(size, size, allColor));

    const actions: ColorMatrixActions = {
        paint: (color: Color, position: Point) => {
            paint(state, position, color);
            setState([...state]);
        },
        paintAll: (color: Color) => {
            paintAll(state, color);
            setState([...state]);
        },
        fill: (color: Color, position: Point) => {
            fill(state, position, color);
            setState([...state]);
        },
        changeSize: (size: number) => {
            setState(() => changeColorMatrixSize(state, size, size, allColor));
        },
        resetCanvas: () => {
            paintAll(state, allColor);
            setState([...state]);
        },
    };

    return [state, actions];
}

