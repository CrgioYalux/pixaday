import type { Color } from '@/color-palette/hooks/use-color-palette/types';

import COLOR_MATRIX_TOOLS from '@/color-matrix/consts/color-matrix-tools';

type Tool = (typeof COLOR_MATRIX_TOOLS)[number];

type Point = {
	x: number;
	y: number;
};

type SymmetryOption =
	| 'vertical'
	| 'horizontal'
	| 'diagonal-increasing'
	| 'diagonal-decreasing'
	| 'custom'
	| 'none';

namespace IColorMatrix {
	export type Cell = {
		id: number;
		value: Color;
		position: Point;
	};

	// [202501014125452] TODO:
	// Extend this to keep track of the matrix size
	export type State = IColorMatrix.Cell[][];

	export type Actions = {
		paint: (
			color: Color,
			position: Point,
			symmetryOption: SymmetryOption
		) => void;
		paintAll: (color: Color) => void;
		fill: (color: Color, position: Point) => void;
		changeSize: (size: number) => void;
		resetCanvas: () => void;
	};

	export namespace Hook {
		export type Use = [IColorMatrix.State, IColorMatrix.Actions];
		export type Props = {
			allColor?: Color;
			size: number;
		};
	}
}

export type { Tool, Point, SymmetryOption, IColorMatrix };
