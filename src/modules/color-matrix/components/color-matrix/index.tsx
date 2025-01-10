import { useEffect, useState, forwardRef } from 'react';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';
import useColorPaletteContext from '@/color-palette/hooks/use-color-palette-context';

import isMobile from '@/utils/is-mobile';

import ColorMatrixAsCanvas from '@/color-matrix/utils/color-matrix-as-canvas';

import CANVAS_SIZE from '@/color-matrix/consts/canvas-size';

export default forwardRef<HTMLCanvasElement>(function ({}, ref) {
	const [state, actions] = useColorMatrixContext();
	const [_, color] = useColorPaletteContext();
	const [painting, setPaiting] = useState<boolean>(false);

	const canvasRef = ref as React.RefObject<HTMLCanvasElement>;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let canvasSize = 0;

		const resize = (): void => {
			canvasSize = isMobile() ? CANVAS_SIZE.MOBILE : CANVAS_SIZE.DESKTOP;
			ColorMatrixAsCanvas.setupScaling({
				element: canvas,
				size: canvasSize,
			});
			ColorMatrixAsCanvas.drawColorMatrix(
				{ element: canvas, size: canvasSize },
				state.colorMatrix
			);
		};

		const draw = (event: MouseEvent): void => {
			const position =
				ColorMatrixAsCanvas.getColorMatrixCellPositionFromMouseEvent(
					event,
					{ element: canvas, size: canvasSize },
					state.colorMatrix
				);

			actions.colorMatrix.paint(color, position);
		};

		const startDrawing = (event: MouseEvent): void => {
			setPaiting(true);
			draw(event);
		};

		const continueDrawing = (event: MouseEvent): void => {
			if (!painting) return;
			draw(event);
		};

		const stopDrawing = (): void => {
			setPaiting(false);
		};

		resize();

		window.addEventListener('resize', resize);
		canvas.addEventListener('mousedown', startDrawing);
		canvas.addEventListener('mousemove', continueDrawing);
		canvas.addEventListener('mouseup', stopDrawing);

		return () => {
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('mousedown', startDrawing);
			canvas.removeEventListener('mousemove', continueDrawing);
			canvas.removeEventListener('mouseup', stopDrawing);
		};
	}, [state, color, painting]);

	return (
		<canvas
			ref={canvasRef}
			className="block w-[550px] h-[550px] cursor-pointer"
		/>
	);
});
