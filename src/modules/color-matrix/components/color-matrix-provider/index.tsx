import type { ColorMatrixProviderProps } from './types';
import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type {
	IColorMatrixContext,
	ColorMatrixStyleState,
} from '@/color-matrix/contexts/color-matrix/types';
import type {
	Tool,
	SymmetryOption,
	Point,
} from '@/color-matrix/hooks/use-color-matrix/types';

import { useState } from 'react';

import ColorMatrixContext from '@/color-matrix/contexts/color-matrix';

import useColorMatrix from '@/color-matrix/hooks/use-color-matrix';
import recoverColorMatrixSizeState from '@/color-matrix/utils/recover-color-matrix-size-state';
import persistColorMatrixSizeState from '@/color-matrix/utils/persist-color-matrix-size-state';

import COLOR_MATRIX_SIZE from '@/color-matrix/consts/color-matrix-size';

export default function ({ children }: ColorMatrixProviderProps) {
	const [colorMatrix, colorMatrixActions] = useColorMatrix({
		size: recoverColorMatrixSizeState() ?? COLOR_MATRIX_SIZE.MIN,
	});
	const [style, setStyle] = useState<ColorMatrixStyleState>({
		cellsRoundedBorders: true,
		cellsGap: true,
		symmetryOption: 'diagonal-decreasing',
	});
	const [tool, setTool] = useState<Tool>('pincel');

	const paint = (color: Color, position: Point): void => {
		if (tool === 'pincel') {
			colorMatrixActions.paint(color, position, style.symmetryOption);
		} else if (tool === 'bucket') {
			colorMatrixActions.paintAll(color);
		} else {
			colorMatrixActions.fill(color, position);
		}
	};

	const changeSize = (size: number): void => {
		colorMatrixActions.changeSize(size);
		persistColorMatrixSizeState(size);
	};

	const switchCellsRoundedBorders = (): void => {
		setStyle((prev) => ({
			...prev,
			cellsRoundedBorders: !prev.cellsRoundedBorders,
		}));
	};

	const switchCellsGap = (): void => {
		setStyle((prev) => ({ ...prev, cellsGap: !prev.cellsGap }));
	};

	const chooseSymmetry = (symmetryOption: SymmetryOption): void => {
		setStyle((prev) => ({ ...prev, symmetryOption }));
	};

	const selectTool = (tool: Tool): void => {
		setTool(tool);
	};

	const resetCanvas = (): void => {
		colorMatrixActions.resetCanvas();
	};

	const value: IColorMatrixContext = [
		{
			colorMatrix,
			colorMatrixSize: {
				width: colorMatrix.length,
				heigth: colorMatrix[0].length,
			},
			style,
			tool,
		},
		{
			colorMatrix: {
				paint,
				changeSize,
				resetCanvas,
			},
			style: {
				switchCellsRoundedBorders,
				switchCellsGap,
				chooseSymmetry,
			},
			tool: {
				selectTool,
			},
		},
	] as const;

	return (
		<ColorMatrixContext.Provider value={value}>
			{children}
		</ColorMatrixContext.Provider>
	);
}
