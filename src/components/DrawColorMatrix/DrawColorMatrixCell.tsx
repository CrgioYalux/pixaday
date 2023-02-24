import { useColorMatrixProvider } from '../../providers/ColorMatrix';
import { useColorPaletteProvider } from '../../providers/ColorPalette';

import type { ColorMatrixCell } from '../../hooks/useColorMatrix/utils';

import './DrawColorMatrix.css';

const DrawColorMatrixCell: React.FC<ColorMatrixCell> = ({ value, position }) => {
    const [_state, actions] = useColorMatrixProvider();
    const [_colorPalette, color] = useColorPaletteProvider();

    return (
        <div
            className='DrawColorMatrixCell'
            style={{ backgroundColor: value }}
            onClick={() => actions.colorMatrix.paint(color, position)}
        >
        </div>
    );
};

export default DrawColorMatrixCell;
