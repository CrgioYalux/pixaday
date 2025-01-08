import type { ColorMatrixToolsProps } from './types';

import ColorMatrixSizeRange from '@/color-matrix-tools/components/color-matrix-size-range';
import ColorMatrixPaintModes from '@/color-matrix-tools/components/color-matrix-paint-modes';
import ColorMatrixSymmetryModes from '@/color-matrix-tools/components/color-matrix-symmetry-modes';
import CheckboxInput from '@/components/CheckboxInput';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

import './styles.css';

export default function ({ className = '' }: ColorMatrixToolsProps) {
	const [state, actions] = useColorMatrixContext();

	return (
		<div className={`ColorMatrixTools ${className}`}>
			<ColorMatrixSizeRange />
			<CheckboxInput
				label="rounded borders"
				htmlFor="cells_rounded_borders"
				checked={state.style.cellsRoundedBorders}
				onChange={() => actions.style.switchCellsRoundedBorders()}
			/>
			<CheckboxInput
				label="gaps"
				htmlFor="cells_gaps"
				checked={state.style.cellsGap}
				onChange={() => actions.style.switchCellsGap()}
			/>
			<ColorMatrixPaintModes />
			<ColorMatrixSymmetryModes />
			<button onClick={() => actions.colorMatrix.resetCanvas()}>
				reset canvas
			</button>
		</div>
	);
}
