import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import type { ColorMatrixCell } from '../../hooks/useColorMatrix/utils';

import './DrawColorMatrix.css';

const DrawColorMatrixCell: React.FC<ColorMatrixCell> = ({ value, position }) => {
    const [_, actions] = useColorMatrixProvider();

    return (
        <div
            className='DrawColorMatrixCell'
            style={{ backgroundColor: value }}
            onClick={() => actions.paint('gold', position)}
        >
        </div>
    );
};

export default DrawColorMatrixCell;
