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

		ctx.globalCompositeOperation = 'source-over';
		ctx.imageSmoothingEnabled = false;
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

		ctx.clearRect(square.from.x, square.from.y, square.to.x, square.to.y);
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
		const rect = canvas.element.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;
		const x = Math.floor(mouseX / cellSize);
		const y = Math.floor(mouseY / cellSize);

		return { x, y };
	}

	public static getColorMatrixCellPositionFromTouchEvent(
		event: TouchEvent,
		canvas: ICanvas,
		cellSize: number = 10
	): TwoDimensionalPoint {
		const rect = canvas.element.getBoundingClientRect();
		const mouseX = event.changedTouches[0].clientX - rect.left;
		const mouseY = event.changedTouches[0].clientY - rect.top;
		const x = Math.floor(mouseX / cellSize) * cellSize;
		const y = Math.floor(mouseY / cellSize) * cellSize;

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
