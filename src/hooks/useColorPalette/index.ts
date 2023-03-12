import { useEffect, useState, useMemo } from 'react';
import { ColorPalette, createTodayColorPalette, createRandomColorPalette } from './utils';
import type { Color } from './utils';

type ColorsSelection = 'today' | 'random';

type ColorPaletteActions = {
    selectColor: (color: Color) => void,
    createTodayColorPalette: () => void,
    createRandomColorPalette: () => void,
    switchColorsSelection: () => void,
};

export type useColorPaletteState = [
     ColorPalette,
     Color,
     ColorPaletteActions,
     ColorsSelection,
];

const COLOR_PALETTE_LENGTH = 25;

export function useColorPalette(): useColorPaletteState {
    const todayColorPalette = useMemo<ColorPalette>(() => createTodayColorPalette(COLOR_PALETTE_LENGTH), []);
    const [colorsSelection, setColorsSelection] = useState<ColorsSelection>('today');
    const [colorPalette, setColorPalette] = useState<ColorPalette>(todayColorPalette);
    const [color, setColor] = useState<Color>(colorPalette[0]);

    useEffect(() => {
        if (colorsSelection === 'today') actions.createTodayColorPalette()
        else actions.createRandomColorPalette();
    }, [colorsSelection]);

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
        switchColorsSelection: () => {
            setColorsSelection((prev) => prev === 'today' ? 'random' : 'today');
        },
    };

    return [colorPalette, color, actions, colorsSelection];
}
