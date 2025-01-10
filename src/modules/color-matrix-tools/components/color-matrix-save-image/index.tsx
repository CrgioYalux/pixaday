import type { ColorMatrixSaveImageProps } from './types';

import { forwardRef } from 'react';

import ColorMatrixAsCanvas from '@/color-matrix/utils/color-matrix-as-canvas';

export default forwardRef<HTMLCanvasElement, ColorMatrixSaveImageProps>(
	function ({ className = '' }, ref) {
		const canvasRef = ref as React.RefObject<HTMLCanvasElement>;

		return (
			<button
				className={`font-semibold px-2 py-1 border-2 border-dotted border-current h-fit w-fit ${className}`}
				onClick={() => {
					if (!canvasRef.current) return;
					ColorMatrixAsCanvas.exportAsPng({
						element: canvasRef.current,
					});
				}}
			>
				save
			</button>
		);
	}
);
