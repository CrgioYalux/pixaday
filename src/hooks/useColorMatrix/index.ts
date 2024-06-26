import type { Color } from '../useColorPalette/types';
import type {
    Point,
    ColorMatrix
} from './types';
import type { SymmetryOption } from '../../providers/ColorMatrix/types';

import {
    useState,
    useEffect
} from 'react';
import {
    paint,
    paintAll,
    fill,
    changeColorMatrixSize,
    persistState,
    recoverPersitedState
} from './utils';

function useColorMatrix({
    size,
    allColor = 'white',
}: ColorMatrix.Hook.Props): ColorMatrix.Hook.Use {
    const [state, setState] = useState<ColorMatrix.State>(
        () => recoverPersitedState(size, size, allColor)
    );

    useEffect(() => {
        persistState(state);
    }, [state]);

    const actions: ColorMatrix.Actions = {
        paint: (color: Color, position: Point, symmetryOption: SymmetryOption) => {
            paint(state, position, color, symmetryOption);
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

export { useColorMatrix };
