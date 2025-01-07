import useColorPaletteContext from '@/color-palette/hooks/use-color-palette-context';

import './styles.css';

export default function () {
	const [, , actions, colorsSelection] = useColorPaletteContext();

	return (
		<label className="ColorPaletteSelectionDropdown">
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
}
