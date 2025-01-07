import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { Point, SymmetryOption, IColorMatrix } from './types';

import { useState, useEffect } from 'react';

import paintColorMatrixCell from '@/color-matrix/utils/paint-color-matrix-cell';
import paintColorMatrixFull from '@/color-matrix/utils/paint-color-matrix-full';
import resizeColorMatrix from '@/color-matrix/utils/resize-color-matrix';
import fillColorMatrixIsle from '@/color-matrix/utils/fill-color-matrix-isle';
import persistColorMatixState from '@/color-matrix/utils/persist-color-matix-state';
import recoverColorMatrixState from '@/color-matrix/utils/recover-color-matrix-state';

export default function ({
	size,
	allColor = 'white',
}: IColorMatrix.Hook.Props): IColorMatrix.Hook.Use {
	const [state, setState] = useState<IColorMatrix.State>(() =>
		recoverColorMatrixState(size, size, allColor)
	);

	useEffect(() => {
		persistColorMatixState(state);
	}, [state]);

	const actions: IColorMatrix.Actions = {
		paint: (
			color: Color,
			position: Point,
			symmetryOption: SymmetryOption
		) => {
			paintColorMatrixCell(state, position, color, symmetryOption);
			setState([...state]);
		},
		paintAll: (color: Color) => {
			paintColorMatrixFull(state, color);
			setState([...state]);
		},
		fill: (color: Color, position: Point) => {
			fillColorMatrixIsle(state, position, color);
			setState([...state]);
		},
		changeSize: (size: number) => {
			setState(() => resizeColorMatrix(state, size, size, allColor));
		},
		resetCanvas: () => {
			paintColorMatrixFull(state, allColor);
			setState([...state]);
		},
	};

	return [state, actions];
}
