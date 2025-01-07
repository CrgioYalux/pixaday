import COLOR_PALETTE_COLORS from '@/color-palette/consts/color-palette-colors';

type Color = (typeof COLOR_PALETTE_COLORS)[number];
type ColorsSelection = 'today' | 'random';

namespace IColorPalette {
	export type State = Color[];
	export type Actions = {
		selectColor: (color: Color) => void;
		createTodayColorPalette: () => void;
		createRandomColorPalette: () => void;
		switchColorsSelection: () => void;
	};
	export namespace Hook {
		export type Use = [
			IColorPalette.State,
			Color,
			IColorPalette.Actions,
			ColorsSelection,
		];
	}
}

export type { Color, ColorsSelection, IColorPalette };
