import { useState } from 'react';
import { useColorMatrixProvider } from "../../providers/ColorMatrix";
import { COLOR_MATRIX_MIN_SIZE, COLOR_MATRIX_MAX_SIZE } from '../../providers/ColorMatrix/utils';

import './ColorMatrixTools.css';

interface MatrixSizeRangeProps {}

const MatrixSizeRange: React.FC<MatrixSizeRangeProps> = () => {
    const [matrixSize, setMatrixSize] = useState<number>(COLOR_MATRIX_MIN_SIZE);
    const [_, actions] = useColorMatrixProvider();

    return (
	<label
	    className='MatrixSizeRange'
	    htmlFor="matrix_size"
	>
	    <div>
		{matrixSize}
	    </div>
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
		value={matrixSize}
	    />
	</label>
    );
};

export default MatrixSizeRange;
