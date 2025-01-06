import type { Color, ColorPalette, ColorsSelection } from './types';

import { useEffect, useState, useMemo } from 'react';
import { createTodayColorPalette, createRandomColorPalette } from './utils';

import { COLOR_PALETTE_LENGTH } from './consts';

function useColorPalette(): ColorPalette.Hook.Use {
	const todayColorPalette = useMemo<ColorPalette.State>(
		() => createTodayColorPalette(COLOR_PALETTE_LENGTH),
		[]
	);
	const [colorsSelection, setColorsSelection] =
		useState<ColorsSelection>('today');
	const [colorPalette, setColorPalette] =
		useState<ColorPalette.State>(todayColorPalette);
	const [color, setColor] = useState<Color>(colorPalette[0]);

	useEffect(() => {
		if (colorsSelection === 'today') actions.createTodayColorPalette();
		else actions.createRandomColorPalette();
	}, [colorsSelection]);

	useEffect(() => {
		setColor(colorPalette[0]);
	}, [colorPalette]);

	const actions: ColorPalette.Actions = {
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
			setColorsSelection((prev) =>
				prev === 'today' ? 'random' : 'today'
			);
		},
	};

	return [colorPalette, color, actions, colorsSelection];
}

export { useColorPalette };
