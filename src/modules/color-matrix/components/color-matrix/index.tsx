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

		const mouseDraw = (event: MouseEvent): void => {
			const position =
				ColorMatrixAsCanvas.getColorMatrixCellPositionFromMouseEvent(
					event,
					{ element: canvas, size: canvasSize },
					state.colorMatrix
				);

			actions.colorMatrix.paint(color, position);
		};

		const touchDraw = (event: TouchEvent): void => {
			const position =
				ColorMatrixAsCanvas.getColorMatrixCellPositionFromTouchEvent(
					event,
					{ element: canvas, size: canvasSize },
					state.colorMatrix
				);

			actions.colorMatrix.paint(color, position);

			const html = document.getElementsByTagName('html');
			const body = document.getElementsByTagName('body');
			const root = document.getElementById('root') as HTMLDivElement;

			html[0].classList.add('WhileTouchMovingEvent');
			body[0].classList.add('WhileTouchMovingEvent');
			root.classList.add('WhileTouchMovingEvent');
		};

		const onMouseDown = (event: MouseEvent): void => {
			setPaiting(true);
			mouseDraw(event);
		};

		const onMouseMove = (event: MouseEvent): void => {
			if (!painting) return;
			mouseDraw(event);
		};

		const onMouseUp = (): void => {
			setPaiting(false);
		};

		const onTouchStart = (event: TouchEvent): void => {
			setPaiting(true);
			touchDraw(event);
		};

		const onTouchMove = (event: TouchEvent): void => {
			if (!painting) return;
			touchDraw(event);
		};

		const onTouchDown = (): void => {
			setPaiting(false);

			const html = document.getElementsByTagName('html');
			const body = document.getElementsByTagName('body');
			const root = document.getElementById('root') as HTMLDivElement;

			html[0].classList.remove('WhileTouchMovingEvent');
			body[0].classList.remove('WhileTouchMovingEvent');
			root.classList.remove('WhileTouchMovingEvent');
		};

		resize();

		window.addEventListener('resize', resize);
		canvas.addEventListener('mousedown', onMouseDown);
		canvas.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('mouseup', onMouseUp);
		canvas.addEventListener('touchstart', onTouchStart);
		canvas.addEventListener('touchmove', onTouchMove);
		canvas.addEventListener('touchend', onTouchDown);

		return () => {
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('mousedown', onMouseDown);
			canvas.removeEventListener('mousemove', onMouseMove);
			canvas.removeEventListener('mouseup', onMouseUp);
			canvas.removeEventListener('touchstart', onTouchStart);
			canvas.removeEventListener('touchmove', onTouchMove);
			canvas.removeEventListener('touchend', onTouchDown);
		};
	}, [state, color, painting]);

	return (
		<canvas
			ref={canvasRef}
			className="block w-[550px] h-[550px] cursor-pointer"
		/>
	);
});
