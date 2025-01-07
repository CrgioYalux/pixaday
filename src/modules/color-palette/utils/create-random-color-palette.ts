import type { IColorPalette } from '@/color-palette/hooks/use-color-palette/types';

import COLOR_PALETTE_COLORS from '@/color-palette/consts/color-palette-colors';

export default function (amountColors: number): IColorPalette.State {
	const out: IColorPalette.State = [];

	for (let i = 0; i < amountColors; i++) {
		let colorIdx: number = -1;

		do colorIdx = Math.floor(Math.random() * COLOR_PALETTE_COLORS.length);
		while (out.find((c) => c === COLOR_PALETTE_COLORS[colorIdx]));

		out.push(COLOR_PALETTE_COLORS[colorIdx]);
	}

	return out;
}
