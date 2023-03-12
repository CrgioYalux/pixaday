import { useState } from 'react';
import { ColorPalette, createTodayColorPalette, createRandomColorPalette } from './utils';
import type { Color } from './utils';

type ColorPaletteActions = {
    selectColor: (color: Color) => void,
    createTodayColorPalette: () => void,
    createRandomColorPalette: () => void,
};

export type useColorPaletteState = [
    ColorPalette,
    Color,
    ColorPaletteActions,
];

const COLOR_PALETTE_LENGTH = 25;

export function useColorPalette(): useColorPaletteState {
    const [colorPalette, setColorPalette] = useState<ColorPalette>(() => createTodayColorPalette(COLOR_PALETTE_LENGTH));
    const [color, setColor] = useState<Color>(colorPalette[0]);

    const actions: ColorPaletteActions = {
        selectColor: (color: Color) => {
            setColor(color);
        },
        createTodayColorPalette: () => {
            setColorPalette([...createTodayColorPalette(COLOR_PALETTE_LENGTH)]);
        },
        createRandomColorPalette: () => {
            setColorPalette([...createRandomColorPalette(COLOR_PALETTE_LENGTH)]);
        },
    };

    return [colorPalette, color, actions];
}
