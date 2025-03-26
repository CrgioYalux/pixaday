import { useRef } from 'react';

import ColorMatrixProvider from '@/color-matrix/components/color-matrix-provider';
import ColorPaletteProvider from '@/color-palette/components/color-palette-provider';
import ColorMatrix from '@/color-matrix/components/color-matrix';
import ColorPalette from '@/color-palette/components/color-palette';
import ColorMatrixTools from '@/color-matrix-tools/components/color-matrix-tools';
import ColorMatrixSaveImage from '@/color-matrix-tools/components/color-matrix-save-image';

import './App.css';
import { Canvas, PixadayCoreProvider } from './ReactPixadayCore';

export default function () {
	return (
		<PixadayCoreProvider>
			<Canvas />
		</PixadayCoreProvider>
	);
}

//export default function () {
//	const canvasRef = useRef<HTMLCanvasElement>(null);
//
//	return (
//		<ColorMatrixProvider>
//			<ColorPaletteProvider>
//				<div draggable={false} className="App">
//					<ColorMatrix ref={canvasRef} />
//					<div className="App__tools">
//						<ColorPalette />
//						<ColorMatrixTools />
//						<ColorMatrixSaveImage
//							ref={canvasRef}
//							className="App-tools__save-image"
//						/>
//					</div>
//				</div>
//			</ColorPaletteProvider>
//		</ColorMatrixProvider>
//	);
//}
