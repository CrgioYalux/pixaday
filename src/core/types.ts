import {
	ALL_TOOLS,
	ALL_TOOLS_OPTIONS,
	CANVAS_TOOLS,
	COLOR_MATRIX_TOOLS,
	FRAMER_TOOLS,
	SYMMETRY_OPTIONS,
} from './consts';

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

type RGBA = {
	r: number;
	g: number;
	b: number;
	a: number;
};

/* Ends: Utils */

/* Starts: Consts */

type Color = string;

type ColorMatrixTool = (typeof COLOR_MATRIX_TOOLS)[number];

type FramerTool = (typeof FRAMER_TOOLS)[number];

type CanvasTool = (typeof CANVAS_TOOLS)[number];

type Tool = (typeof ALL_TOOLS)[number];

type SymmetryOption = (typeof SYMMETRY_OPTIONS)[number];

type ToolOption = (typeof ALL_TOOLS_OPTIONS)[number];

type ToolAndOptions = Record<Readonly<Tool>, Readonly<ToolOption[]>>;

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

type Frame = {
	frame: ColorMatrix;
	id: ID;
};

/* Ends: API */

export type {
	ID,
	TwoDimensionalPoint,
	TwoDimensionalSize,
	RGBA,
	Color,
	ColorMatrixTool,
	FramerTool,
	CanvasTool,
	Tool,
	SymmetryOption,
	ToolOption,
	ToolAndOptions,
	ColorMatrixCell,
	ColorMatrix,
	ColorMatrixActions,
	ColorMatrixConstructorProps,
	Frame,
};
