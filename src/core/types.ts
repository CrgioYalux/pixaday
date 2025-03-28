import { COLORS, COLOR_MATRIX_TOOLS, SYMMETRY_OPTIONS } from './consts';

/* Starts: Utils */

type ID = string | number;

type TwoDimensionalPoint = {
	x: number;
	y: number;
};

type TwoDimensionalSize = {
	width: number;
	height: number;
};

/* Ends: Utils */

/* Starts: Consts */

type Color = (typeof COLORS)[number];

type ColorMatrixTool = (typeof COLOR_MATRIX_TOOLS)[number];

type SymmetryOption = (typeof SYMMETRY_OPTIONS)[number];

/* Ends: Consts */

/* Starts: API */

type ColorMatrixCell = {
	id: ID;
	value: Color;
	position: TwoDimensionalPoint;
};

type ColorMatrix = ColorMatrixCell[][];

type ColorMatrixActions = {
	paint: (
		color: Color,
		position: TwoDimensionalPoint,
		symmetryOption: SymmetryOption
	) => void;
	flood: (color: Color) => void;
	fill: (color: Color, position: TwoDimensionalPoint) => void;
	resize: (size: number) => void;
	clear: () => void;
};

type ColorMatrixConstructorProps = {
	color: Color;
	size: number | TwoDimensionalSize;
};

/* Ends: API */

export type {
	ID,
	TwoDimensionalPoint,
	TwoDimensionalSize,
	Color,
	ColorMatrixTool,
	SymmetryOption,
	ColorMatrixCell,
	ColorMatrix,
	ColorMatrixActions,
	ColorMatrixConstructorProps,
};
