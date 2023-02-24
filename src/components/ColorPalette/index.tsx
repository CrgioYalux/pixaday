import { useColorPaletteProvider } from '../../providers/ColorPalette';

import './ColorPalette.css';

interface ColorPaletteProps {}

const ColorPalette: React.FC<ColorPaletteProps> = ({}) => {
    const [colorPalette, color, actions] = useColorPaletteProvider();

    return (
        <div className='ColorPalette'>
            <div className='ColorPalette__list'>
            {colorPalette.map((c) => (
                <div
                    key={c}
                    style={{ backgroundColor: c }}
                    onClick={() => actions.selectColor(c)}
                    className={`ColorPalette__list_item ${color === c ? '--is-selected' : '--is-not-selected'}`}
                ></div>
            ))}
            </div>
        </div>
    );
};

export default ColorPalette;
