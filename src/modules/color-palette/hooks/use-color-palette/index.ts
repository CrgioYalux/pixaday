import type { Color, ColorsSelection, IColorPalette } from './types';

import { useEffect, useState, useMemo } from 'react';
import { createTodayColorPalette, createRandomColorPalette } from './utils';

import { COLOR_PALETTE_LENGTH } from './consts';

export default function (): IColorPalette.Hook.Use {
	const todayColorPalette = useMemo<IColorPalette.State>(
		() => createTodayColorPalette(COLOR_PALETTE_LENGTH),
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
