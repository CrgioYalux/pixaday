import type {
	Color,
	TwoDimensionalPoint,
	TwoDimensionalSize,
	ColorMatrix,
} from '../types';

type ICanvas = {
	element: HTMLCanvasElement;
	size: TwoDimensionalSize;
};

export default class {
	public static setupScaling(canvas: ICanvas): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		const scale = 10 || window.devicePixelRatio || 1;
		// ^^^ use the zoom scale here instead

		canvas.element.width = canvas.size.width * scale;
		canvas.element.height = canvas.size.height * scale;
		canvas.element.style.width = `${canvas.element.width}px`;
		canvas.element.style.height = `${canvas.element.height}px`;

		ctx.scale(scale, scale);
	}

	public static drawSquare(
		canvas: ICanvas,
		square: {
			from: TwoDimensionalPoint;
			to: TwoDimensionalPoint;
			color: Color;
		}
	): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		ctx.fillStyle = square.color;
		ctx.fillRect(square.from.x, square.from.y, square.to.x, square.to.y);
	}

	public static drawColorMatrix(
		canvas: ICanvas,
		colorMatrix: ColorMatrix
	): void {
		const cellSize = 10; // Math.floor(canvas.size / colorMatrix.length);
		// ^^^ use the zoom scale here instead

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
		canvas: ICanvas
	): TwoDimensionalPoint {
		const cellSize = 10; // Math.floor(canvas.size / colorMatrix.length);
		// ^^^ use the zoom scale here instead

		const x = Math.floor(
			(event.clientX - canvas.element.offsetLeft) / cellSize
		);
		const y = Math.floor(
			(event.clientY - canvas.element.offsetTop) / cellSize
		);

		return { x, y };
	}

	public static getColorMatrixCellPositionFromTouchEvent(
		event: TouchEvent
	): TwoDimensionalPoint {
		const target = event.target as HTMLCanvasElement;

		const cellSize = 10; // Math.floor(canvas.size / colorMatrix.length);
		// ^^^ use the zoom scale here instead

		const x = Math.floor(
			(event.changedTouches[0].clientX - target.offsetLeft) / cellSize
		);
		const y = Math.floor(
			(event.changedTouches[0].clientY - target.offsetTop) / cellSize
		);

		return { x, y };
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
