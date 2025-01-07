import ColorPaletteSelectionDropdown from '@/color-palette/components/color-palette-selection-dropdown';

import useColorPaletteContext from '@/color-palette/hooks/use-color-palette-context';

import './styles.css';

export default function () {
	const [colorPalette, color, actions] = useColorPaletteContext();

	return (
		<div className="ColorPalette">
			<ColorPaletteSelectionDropdown />
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
}
