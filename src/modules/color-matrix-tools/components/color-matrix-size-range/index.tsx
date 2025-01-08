import { useState } from 'react';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

import COLOR_MATRIX_SIZE from '@/color-matrix/consts/color-matrix-size';

import './styles.css';

export default function () {
	const [matrixSize, setMatrixSize] = useState<number>(COLOR_MATRIX_SIZE.MIN);
	const [state, actions] = useColorMatrixContext();

	return (
		<label className="ColorMatrixSizeRange" htmlFor="matrix_size">
			<div>{state.colorMatrixSize.width}</div>
			<input
				type="range"
				id="matrix_size"
				min={COLOR_MATRIX_SIZE.MIN}
				max={COLOR_MATRIX_SIZE.MAX}
				onMouseUp={() => actions.colorMatrix.changeSize(matrixSize)}
				onTouchEnd={() => actions.colorMatrix.changeSize(matrixSize)}
				onChange={(event) => {
					setMatrixSize(Number(event.currentTarget.value));
				}}
				defaultValue={state.colorMatrixSize.width}
			/>
		</label>
	);
}
