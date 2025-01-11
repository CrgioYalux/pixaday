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
	public static setupScaling(canvas: ICanvas): void {
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
		square: { from: Point; to: Point; color: Color }
	): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		ctx.fillStyle = square.color;
		ctx.fillRect(square.from.x, square.from.y, square.to.x, square.to.y);
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

	public static getColorMatrixCellPositionFromMouseEvent(
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

	public static getColorMatrixCellPositionFromTouchEvent(
		event: TouchEvent,
		canvas: ICanvas,
		colorMatrix: IColorMatrix.State
	): Point {
		const target = event.target as HTMLCanvasElement;

		const cellSize = Math.floor(canvas.size / colorMatrix.length);

		const col = Math.floor(
			(event.changedTouches[0].clientX - target.offsetLeft) / cellSize
		);
		const row = Math.floor(
			(event.changedTouches[0].clientY - target.offsetTop) / cellSize
		);

		return { x: col, y: row };
	}

	public static exportAsPng(
		{ element: canvasElement }: Pick<ICanvas, 'element'>,
		filename: string = 'screenshot'
	): void {
		const dataURL = canvasElement.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = dataURL;
		link.download = `${filename}.png`;
		link.click();
	}
}
