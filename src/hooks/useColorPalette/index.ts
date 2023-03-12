import { useEffect, useState, useMemo } from 'react';
import { ColorPalette, createTodayColorPalette, createRandomColorPalette } from './utils';
import type { Color } from './utils';

type ColorsOrigin = 'today' | 'random';

type ColorPaletteActions = {
    selectColor: (color: Color) => void,
    createTodayColorPalette: () => void,
    createRandomColorPalette: () => void,
    switchColorsOrigin: () => void,
};

export type useColorPaletteState = [
     ColorPalette,
     Color,
     ColorPaletteActions,
     ColorsOrigin,
];

const COLOR_PALETTE_LENGTH = 25;

export function useColorPalette(): useColorPaletteState {
    const todayColorPalette = useMemo<ColorPalette>(() => createTodayColorPalette(COLOR_PALETTE_LENGTH), []);
    const [colorsOrigin, setColorsOrigin] = useState<ColorsOrigin>('today');
    const [colorPalette, setColorPalette] = useState<ColorPalette>(todayColorPalette);
    const [color, setColor] = useState<Color>(colorPalette[0]);

    useEffect(() => {
        if (colorsOrigin === 'today') actions.createTodayColorPalette()
        else actions.createRandomColorPalette();
    }, [colorsOrigin]);

    useEffect(() => {
        setColor(colorPalette[0]);
    }, [colorPalette]);

    const actions: ColorPaletteActions = {
        selectColor: (color: Color) => {
            setColor(color);
        },
        createTodayColorPalette: () => {
            setColorPalette(todayColorPalette);
        },
        createRandomColorPalette: () => {
            setColorPalette(createRandomColorPalette(COLOR_PALETTE_LENGTH));
        },
        switchColorsOrigin: () => {
            setColorsOrigin((prev) => prev === 'today' ? 'random' : 'today');
        },
    };

    return [colorPalette, color, actions, colorsOrigin];
}
