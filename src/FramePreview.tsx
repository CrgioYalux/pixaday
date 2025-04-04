import { DependencyList, useEffect, useRef } from 'react';
import { ColorMatrix, ID } from './core/types';
import colorMatrixAsCanvas from './core/utils/color-matrix-as-canvas';

type FramePreviewProps = {
	id: ID;
	colorMatrix: ColorMatrix;
	selected: boolean;

	select: (id: ID) => void;

	deps?: DependencyList;
};

const FramePreview = ({
	id,
	colorMatrix,
	selected,
	select,
	deps,
}: FramePreviewProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleResize = (): void => {
		const canvasEl = canvasRef.current;
		if (!canvasEl) return;

		colorMatrixAsCanvas.setupScaling(
			{
				element: canvasEl,
				size: {
					width: colorMatrix.length,
					height: colorMatrix[0].length,
				},
			},
			4
		);

		colorMatrixAsCanvas.drawColorMatrix(
			{
				element: canvasEl,
				size: {
					width: colorMatrix.length,
					height: colorMatrix[0].length,
				},
			},
			colorMatrix,
			4
		);
	};

	const handleClick = (): void => {
		select(id);
	};

	useEffect(() => {
		handleResize();

		const ctrl = new AbortController();
		const { signal } = ctrl;

		window.addEventListener('resize', handleResize, { signal });
		canvasRef.current?.addEventListener('click', handleClick, { signal });

		return () => {
			ctrl.abort();
		};
	}, [deps]);

	return (
		<canvas
			ref={canvasRef}
			className={`
                block cursor-pointer
                ${selected ? 'border-2 border-dashed border-gray-400' : ''}
            `}
		/>
	);
};

export default FramePreview;
