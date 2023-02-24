import { useState } from "react";

import { useColorMatrixProvider } from "../../providers/ColorMatrix";

import './ColorMatrixTools.css';

interface ColorMatrixToolsProps {}

const ColorMatrixTools: React.FC<ColorMatrixToolsProps> = () => {
    const [matrixSize, setMatrixSize] = useState<number>(5);
    const [_, actions] = useColorMatrixProvider();

    return (
        <div className='ColorMatrixTools'>
       	    <label
                className='ColorMatrixTools__matrix_size'
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
					onMouseUp={() => actions.changeSize(matrixSize)}
					onTouchEnd={() => actions.changeSize(matrixSize)}
					onChange={(event) => {
						setMatrixSize(Number(event.currentTarget.value));
					}}
					value={matrixSize}
				/>
			</label>
        </div>
    );
};

export default ColorMatrixTools;
