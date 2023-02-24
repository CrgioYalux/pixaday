import { useState } from 'react';
import { useColorMatrixProvider } from "../../providers/ColorMatrix";

import './ColorMatrixTools.css';

interface MatrixSizeInputProps {}

const MatrixSizeInput: React.FC<MatrixSizeInputProps> = () => {
    const [matrixSize, setMatrixSize] = useState<number>(5);
    const [_, actions] = useColorMatrixProvider();

    return (
	<label
	    className='MatrixSizeInput'
	    htmlFor="matrix_size"
	>
	    <span>
		{matrixSize}
	    </span>
	    <input
		    type="range"
		    id="matrix_size"
		    max={30}
		    min={5}
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

export default MatrixSizeInput;
