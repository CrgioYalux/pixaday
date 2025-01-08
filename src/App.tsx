import ColorMatrix from '@/color-matrix/components/color-matrix';
import ColorPalette from '@/color-palette/components/color-palette';
import ColorMatrixTools from '@/color-matrix-tools/components/color-matrix-tools';
import ColorMatrixProvider from '@/color-matrix/components/color-matrix-provider';
import ColorPaletteProvider from '@/color-palette/components/color-palette-provider';

import screenshotHTMLElement from './utils/screenshot-html-element';

import './App.css';

const COLOR_MATRIX_ID = 'ColorMatrix';

export default function () {
	return (
		<ColorMatrixProvider>
			<ColorPaletteProvider>
				<div draggable={false} className="App">
					<ColorMatrix id={COLOR_MATRIX_ID} />
					<div className="App__tools">
						<ColorPalette />
						<ColorMatrixTools />
						<button
							onClick={() => {
								screenshotHTMLElement(COLOR_MATRIX_ID);
							}}
						>
							save
						</button>
					</div>
				</div>
			</ColorPaletteProvider>
		</ColorMatrixProvider>
	);
}
