import type { Color, ColorsSelection, IColorPalette } from './types';

import { useEffect, useState, useMemo } from 'react';

import createTodaysColorPalette from '@/color-palette/utils/create-todays-color-palette';
import createRandomColorPalette from '@/color-palette/utils/create-random-color-palette';

import COLOR_PALETTE_AMOUNT_COLORS from '@/color-palette/consts/color-palette-amount-colors';

export default function (): IColorPalette.Hook.Use {
	const todayColorPalette = useMemo<IColorPalette.State>(
		() => createTodaysColorPalette(COLOR_PALETTE_AMOUNT_COLORS),
		[]
	);
	const [colorsSelection, setColorsSelection] =
		useState<ColorsSelection>('today');
	const [colorPalette, setColorPalette] =
		useState<IColorPalette.State>(todayColorPalette);
	const [color, setColor] = useState<Color>(colorPalette[0]);

	useEffect(() => {
		if (colorsSelection === 'today') actions.createTodayColorPalette();
		else actions.createRandomColorPalette();
	}, [colorsSelection]);

	useEffect(() => {
		setColor(colorPalette[0]);
	}, [colorPalette]);

	const actions: IColorPalette.Actions = {
		selectColor: (color: Color) => {
			setColor(color);
		},
		createTodayColorPalette: () => {
			setColorPalette(todayColorPalette);
		},
		createRandomColorPalette: () => {
			setColorPalette(
				createRandomColorPalette(COLOR_PALETTE_AMOUNT_COLORS)
			);
		},
		switchColorsSelection: () => {
			setColorsSelection((prev) =>
				prev === 'today' ? 'random' : 'today'
			);
		},
	};

	return [colorPalette, color, actions, colorsSelection];
}
