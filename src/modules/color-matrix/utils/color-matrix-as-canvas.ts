import type {
	IColorMatrix,
	Point,
} from '@/color-matrix/hooks/use-color-matrix/types';
import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { TwoDimensionalSize } from '@/color-matrix/types';

type ICanvas = {
	element: HTMLCanvasElement;
	size: TwoDimensionalSize;
};

export default class {
	public static setupScaling(canvas: ICanvas): void {
		const ctx = canvas.element.getContext('2d');
		if (!ctx) return;

		const scale = window.devicePixelRatio || 1;

		canvas.element.width = canvas.size.width * scale;
		canvas.element.height = canvas.size.height * scale;
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
		// STALLED: Waiting on [202501015020414] to be finished
		// [202501015124544] TODO:
		// [202501015123715] All of these utils would become a proper ICanvas interface
		// A cell size should depend on the zoom scale and canvas size.
		// For a 300px, 1/1 aspect ratio, 1x zoomed canvas, the cells of a 4x4 color matrix
		// would be sized 300px / 4 = 75px
		// [202501015133224] SPIKE:
		// I'm thinking it wrong. There's no such thing as size of cell. What you do instead
		// is define the canvas size (width and height) and then just change the brush size
		// It's the brush size what determines the cell's 'size'.
		// But this brings an interesting problem with my current implementation:
		// The canvas renders a matrix. This matrix has an amount of columns and rows.
		// Each of its cells have a color. If the cell size is determined by the brush size,
		// then the columns and rows of the color matrix can't be fixed, and I'm not sure
		// how expensive would it be to constantly resize the color matrix on the event of
		// brush size change. And, let's say you do that, and you resize your brush from a
		// bigger size to a smaller size; the color matrix has to adapt, and such have to do
		// the colors in the cells too. So, what was a 100px wide, 100px tall, cell painted
		// with a red color, would become a chunk of 10px wide, 10px tall, cells, for a brush
		// size of 10px. You will need to use the brush size and the previous matrix dimension
		// to persist the state.

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
