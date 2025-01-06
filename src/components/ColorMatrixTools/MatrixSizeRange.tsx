import { useState } from 'react';
import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import {
	COLOR_MATRIX_MIN_SIZE,
	COLOR_MATRIX_MAX_SIZE,
} from '../../providers/ColorMatrix/consts';

import './ColorMatrixTools.css';

const MatrixSizeRange: React.FC<{}> = () => {
	const [matrixSize, setMatrixSize] = useState<number>(COLOR_MATRIX_MIN_SIZE);
	const [state, actions] = useColorMatrixProvider();

	return (
		<label className="MatrixSizeRange" htmlFor="matrix_size">
			<div>{state.colorMatrixSize.width}</div>
			<input
				type="range"
				id="matrix_size"
				min={COLOR_MATRIX_MIN_SIZE}
				max={COLOR_MATRIX_MAX_SIZE}
				onMouseUp={() => actions.colorMatrix.changeSize(matrixSize)}
				onTouchEnd={() => actions.colorMatrix.changeSize(matrixSize)}
				onChange={(event) => {
					setMatrixSize(Number(event.currentTarget.value));
				}}
				defaultValue={state.colorMatrixSize.width}
			/>
		</label>
	);
};

export default MatrixSizeRange;
