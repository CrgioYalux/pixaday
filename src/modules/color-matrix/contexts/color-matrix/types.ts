import type {
	IColorMatrix,
	Point,
	Tool,
	SymmetryOption,
} from '@/color-matrix/hooks/use-color-matrix/types';
import type { TwoDimensionalMatrix } from '@/color-matrix/types';
import type { Color } from '@/color-palette/hooks/use-color-palette/types';

type ColorMatrixStyleState = {
	symmetryOption: SymmetryOption;
};

type ColorMatrixStyleActions = {
	chooseSymmetry: (symmetryOption: SymmetryOption) => void;
};

type IColorMatrixContext = readonly [
	state: {
		colorMatrix: IColorMatrix.State;
		colorMatrixSize: TwoDimensionalMatrix;
		style: ColorMatrixStyleState;
		tool: Tool;
	},
	actions: {
		colorMatrix: {
			paint: (color: Color, position: Point) => void;
			changeDimensions: (dimensions: TwoDimensionalMatrix) => void;
			resetCanvas: () => void;
		};
		style: ColorMatrixStyleActions;
		tool: {
			selectTool: (tool: Tool) => void;
		};
	},
];

export type {
	ColorMatrixStyleState,
	ColorMatrixStyleActions,
	IColorMatrixContext,
};
