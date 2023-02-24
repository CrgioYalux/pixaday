import MatrixSizeInput from './MatrixSizeInput';
import CheckboxInput from '../Generics/CheckboxInput';

import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import './ColorMatrixTools.css';

interface ColorMatrixToolsProps {
    className?: string;
}

const ColorMatrixTools: React.FC<ColorMatrixToolsProps> = ({ className }) => {
    const [state, actions] = useColorMatrixProvider();

    return (
	<div className={`ColorMatrixTools ${className}`}>
	    <MatrixSizeInput />
	    <div className='ColorMatrixTools__checkboxes'>
		<CheckboxInput 
		    label='rounded borders'
		    htmlFor='cells_rounded_borders'
		    className=''
		    checked={state.style.cellsRoundedBorders}
		    onChange={() => actions.style.switchCellsRoundedBorders()}
		/>
		<CheckboxInput 
		    label='gaps'
		    htmlFor='cells_gaps'
		    className=''
		    checked={state.style.cellsGap}
		    onChange={() => actions.style.switchCellsGap()}
		/>
	    </div>
        </div>
    );
};

export default ColorMatrixTools;
