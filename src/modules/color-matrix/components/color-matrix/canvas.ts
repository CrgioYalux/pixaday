import type {
	IColorMatrix,
	Point,
} from '@/color-matrix/hooks/use-color-matrix/types';
import type { Color } from '@/color-palette/hooks/use-color-palette/types';

type ICanvas = {
	element: HTMLCanvasElement;
	size: number;
};

export default class {
	public static setup(canvas: ICanvas): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		const scale = window.devicePixelRatio || 1;

		canvas.element.width = canvas.size * scale;
		canvas.element.height = canvas.size * scale;
		canvas.element.style.width = `${canvas.size}px`;
		canvas.element.style.height = `${canvas.size}px`;

		ctx.scale(scale, scale);
	}

	public static drawSquare(
		canvas: ICanvas,
		{ from, to, color }: { from: Point; to: Point; color: Color }
	): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		ctx.fillStyle = color;
		ctx.fillRect(from.x, from.y, to.x, to.y);
	}

	public static drawColorMatrix(
		canvas: ICanvas,
		colorMatrix: IColorMatrix.State
	): void {
		const cellSize = Math.floor(canvas.size / colorMatrix.length);

		colorMatrix.forEach((row) => {
			row.forEach((cell) => {
				const from = {
					x: cell.position.x * cellSize,
					y: cell.position.y * cellSize,
				};
				const to = {
					x: cell.position.x * cellSize + cellSize,
					y: cell.position.y * cellSize + cellSize,
				};

				this.drawSquare(canvas, { from, to, color: cell.value });
			});
		});
	}

	public static interpretTouchAsColorMatrixCellPosition(
		event: MouseEvent,
		canvas: ICanvas,
		colorMatrix: IColorMatrix.State
	): Point {
		const cellSize = Math.floor(canvas.size / colorMatrix.length);

		const col = Math.floor(
			(event.clientX - canvas.element.offsetLeft) / cellSize
		);
		const row = Math.floor(
			(event.clientY - canvas.element.offsetTop) / cellSize
		);

		return { x: col, y: row };
	}

	public static screenshotCanvas(canvas: ICanvas): void {
		const dataURL = canvas.element.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = dataURL;
		link.download = 'canvas-screenshot.png';
		link.click();
	}
}
