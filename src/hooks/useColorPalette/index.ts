import { useState } from 'react';
import { ColorPalette, createColorPalette } from './utils';
import type { Color } from './utils';

type ColorPaletteActions = {
    selectColor: (color: Color) => void,
    createColorPalette: () => void,
};

export type useColorPaletteState = [
    ColorPalette,
    Color,
    ColorPaletteActions,
];

export function useColorPalette(): useColorPaletteState {
    const [colorPalette, setColorPalette] = useState<ColorPalette>(() => createColorPalette());
    const [color, setColor] = useState<Color>(colorPalette[0]);

    const actions: ColorPaletteActions = {
        selectColor: (color: Color) => {
            setColor(color);
        },
        createColorPalette: () => {
            setColorPalette([...createColorPalette()]);
        },
    };

    return [colorPalette, color, actions];
}
