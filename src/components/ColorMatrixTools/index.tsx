import MatrixSizeRange from './MatrixSizeRange';
import CheckboxInput from '../Generics/CheckboxInput';
import PaintToolsRadio from './PaintToolsRadio';
import SymmetryPicker from './SymmetryPicker';

import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import './ColorMatrixTools.css';

interface ColorMatrixToolsProps {
	className?: string;
}

const ColorMatrixTools: React.FC<ColorMatrixToolsProps> = ({
	className = '',
}) => {
	const [state, actions] = useColorMatrixProvider();

	return (
		<div className={`ColorMatrixTools ${className}`}>
			<MatrixSizeRange />
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
			<PaintToolsRadio />
			<SymmetryPicker />
			<button onClick={() => actions.colorMatrix.resetCanvas()}>
				reset canvas
			</button>
		</div>
	);
};

export default ColorMatrixTools;
