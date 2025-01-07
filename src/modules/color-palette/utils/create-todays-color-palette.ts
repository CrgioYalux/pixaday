import type { IColorPalette } from '@/color-palette/hooks/use-color-palette/types';

import sumDaysToMonth from '@/utils/sum-days-to-month';

import COLOR_PALETTE_COLORS from '@/color-palette/consts/color-palette-colors';

export default function (amountColors: number): IColorPalette.State {
	const out: IColorPalette.State = [];

	let colors = [...COLOR_PALETTE_COLORS];

	const today = new Date();
	const year: number = today.getFullYear();
	const month: number = today.getMonth();
	const day: number = today.getDate();
	const dayID: number = year + (month + 1) + sumDaysToMonth(month) + day;

	for (let i = 0; i < amountColors; i++) {
		const idxJump = (dayID * i) % colors.length;
		const color = colors[idxJump];

		out.push(color);
		colors = colors.filter((c) => c !== color);
	}

	return out;
}
