import { useColorPaletteProvider } from '../../providers/ColorPalette';

import './ColorPalette.css';

interface ColorPaletteProps {}

const ColorPaletteModeSelect: React.FC<{}> = () => {
    const [,, actions, colorsOrigin] = useColorPaletteProvider();

    return (
        <label className='ColorPaletteModeSelect'>
            <span>Colors:</span>
            <select onChange={() => actions.switchColorsOrigin()} defaultValue={colorsOrigin}>
                <option value='today'>Today's selection</option>
                <option value='random'>Random selection</option>
            </select>
        </label>
    );
}

const ColorPalette: React.FC<ColorPaletteProps> = ({}) => {
    const [colorPalette, color, actions] = useColorPaletteProvider();

    return (
        <div className='ColorPalette'>
            <ColorPaletteModeSelect />
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
