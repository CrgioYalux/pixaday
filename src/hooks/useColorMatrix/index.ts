import { useState } from 'react';
import { paint, paintAll, createColorMatrix } from './utils';

import type { Color, Point, ColorMatrix } from './utils';

type ColorMatrixActions = {
    paint: (color: Color, position: Point) => void,
    paintAll: (color: Color) => void,
    changeSize: (size: number) => void,
}

export type useColorMatrixState = [
    ColorMatrix,
    ColorMatrixActions
]

type useColorMatrixProps = {
    allColor?: Color,
    size: number,
}

export function useColorMatrix({ size, allColor }: useColorMatrixProps): useColorMatrixState {
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
        changeSize: (size: number) => {
            setState(createColorMatrix(size, size, 'white'));
        }
    };

    return [state, actions];
}

