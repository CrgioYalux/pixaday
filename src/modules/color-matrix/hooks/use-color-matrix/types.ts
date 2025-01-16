import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { TwoDimensionalMatrix } from '@/color-matrix/types';

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
	// [202501015020414] SPIKE:
	// A canvas must have
	//  resolution: amount of square
	//  size: width and height
	//
	// Given the posibility of creating a high-resolution canvas,
	// i.e. high density of squares, a *zoom* feature should be introduced
	// You can choose the canvas size and resolution, and only the resolution
	// would mean something to the ColorMatrix (i.e. amount of rows and cols)
	// Given that the canvas size will be customazible, the whole UI should adapt
	// to give more space to it and a *move* feature should be introduced.
	// I'd love the idea of cursor tools too.
	// [202501015123715] SPIKE:
	// now that I think about it, a zoom and move features have more to do
	// with the canvas than with the color matrix so I might have to invest in
	// a proper ICanvas interface as it would probably grow in complexity and
	// that way I can keep it organized. Same happens with the cellSize.
	export type State = IColorMatrix.Cell[][];

	export type Actions = {
		paint: (
			color: Color,
			position: Point,
			symmetryOption: SymmetryOption
		) => void;
		paintAll: (color: Color) => void;
		fill: (color: Color, position: Point) => void;
		changeDimensions: (dimensions: TwoDimensionalMatrix) => void;
		resetCanvas: () => void;
	};

	export namespace Hook {
		export type Use = [IColorMatrix.State, IColorMatrix.Actions];
		export type Props = {
			allColor?: Color;
			dimensions: TwoDimensionalMatrix;
		};
	}
}

export type { Tool, Point, SymmetryOption, IColorMatrix };
