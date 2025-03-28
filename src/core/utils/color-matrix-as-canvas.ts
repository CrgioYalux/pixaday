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
	public static setupScaling(canvas: ICanvas, cellSize: number = 10): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		const scale = window.devicePixelRatio || 1;

		canvas.element.width = canvas.size.width * cellSize;
		canvas.element.height = canvas.size.height * cellSize;
		canvas.element.style.width = `${canvas.size.width * cellSize}px`;
		canvas.element.style.height = `${canvas.size.height * cellSize}px`;

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
		colorMatrix: ColorMatrix,
		cellSize: number = 10
	): void {
		colorMatrix.forEach((col) => {
			col.forEach((cell) => {
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
		cellSize: number = 10
	): TwoDimensionalPoint {
		const x = Math.floor(
			(event.clientX - canvas.element.offsetLeft) / cellSize
		);
		const y = Math.floor(
			(event.clientY - canvas.element.offsetTop) / cellSize
		);

		return { x, y };
	}

	public static getColorMatrixCellPositionFromTouchEvent(
		event: TouchEvent,
		cellSize: number = 10
	): TwoDimensionalPoint {
		const target = event.target as HTMLCanvasElement;

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
