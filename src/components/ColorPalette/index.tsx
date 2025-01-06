import { useColorPaletteProvider } from '../../providers/ColorPalette';

import './ColorPalette.css';

const PaletteColorsSelectionSelect: React.FC<{}> = () => {
	const [, , actions, colorsSelection] = useColorPaletteProvider();

	return (
		<label className="PaletteColorsSelectionSelect">
			<span>Colors:</span>
			<select
				onChange={() => actions.switchColorsSelection()}
				defaultValue={colorsSelection}
			>
				<option value="today">Today's selection</option>
				<option value="random">Random selection</option>
			</select>
		</label>
	);
};

const ColorPalette: React.FC<{}> = () => {
	const [colorPalette, color, actions] = useColorPaletteProvider();

	return (
		<div className="ColorPalette">
			<PaletteColorsSelectionSelect />
			<div className="ColorPalette__list">
				{colorPalette.map((c) => (
					<div
						key={c}
						style={{ backgroundColor: c }}
						onClick={() => actions.selectColor(c)}
						className={`
                        ColorPalette__list_item 
                        ${color === c ? '--is-selected' : '--is-not-selected'}
                    `}
					/>
				))}
			</div>
		</div>
	);
};

export default ColorPalette;
