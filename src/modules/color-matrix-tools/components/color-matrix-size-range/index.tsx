import { useState } from 'react';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

import COLOR_MATRIX_SIZE from '@/color-matrix/consts/color-matrix-size';

export default function () {
	const [matrixSize, setMatrixSize] = useState<number>(COLOR_MATRIX_SIZE.MIN);
	const [state, actions] = useColorMatrixContext();

	return (
		<label
			className="flex bg-[var(--brand-color-l-base)] rounded-full p-2 items-center justify-center"
			htmlFor="matrix_size"
		>
			<small className="font-black w-[3ch]">
				{state.colorMatrixSize.width}
			</small>
			<input
				className="cursor-pointer ml-2 mr-1 w-full grow-0 shrink"
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
