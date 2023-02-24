import { useColorMatrixProvider } from '../../providers/ColorMatrix';
import { useColorPaletteProvider } from '../../providers/ColorPalette';

import type { ColorMatrixCell } from '../../hooks/useColorMatrix/utils';

import './DrawColorMatrix.css';

const DrawColorMatrixCell: React.FC<ColorMatrixCell> = ({ value, position }) => {
    const [_colorMatrix, actions] = useColorMatrixProvider();
    const [_colorPalette, color] = useColorPaletteProvider();

    return (
        <div
            className='DrawColorMatrixCell'
            style={{ backgroundColor: value }}
            onClick={() => actions.paint(color, position)}
        >
        </div>
    );
};

export default DrawColorMatrixCell;
