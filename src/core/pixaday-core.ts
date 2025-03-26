import type {
	TwoDimensionalPoint,
	TwoDimensionalSize,
	ID,
	Color,
	SymmetryOption,
	ColorMatrix,
	ColorMatrixTool,
} from './types';

import { COLOR_MATRIX_TOOLS } from './consts';

import isMobile from '@/utils/is-mobile';

import cloneColorMatrix from './utils/clone-color-matrix';
import createColorMatrix from './utils/create-color-matrix';
import fillColorMatrixIsle from './utils/fill-color-matrix-isle';
import paintColorMatrixCell from './utils/paint-color-matrix-cell';

class IColorMatrix {
	private id: ID = Date.now();
	private matrix: ColorMatrix = [];
	private color: Color;
	private size: TwoDimensionalSize;

	constructor(
		size: number | TwoDimensionalSize,
		color: Color,
		options?: Partial<{
			colorMatrix: ColorMatrix;
		}>
	) {
		this.color = color;

		if (typeof size === 'number') {
			this.size = {
				width: size,
				height: size,
			};
		} else this.size = size;

		if (options?.colorMatrix) {
			this.matrix = cloneColorMatrix({ base: options.colorMatrix });
			return;
		}

		this.matrix = createColorMatrix({ color: this.color, size: this.size });
	}

	public clone(): IColorMatrix {
		return new IColorMatrix(this.size, this.color, {
			colorMatrix: this.matrix,
		});
	}

	public resize(size: number | TwoDimensionalSize) {
		if (typeof size === 'number') {
			this.size = {
				width: size,
				height: size,
			};
		} else this.size = size;

		this.matrix = createColorMatrix({
			size: this.size,
			color: this.color,
			base: this.matrix,
		});
	}

	public paint(
		position: TwoDimensionalPoint,
		color: Color,
		symmetryOption: SymmetryOption
	) {
		this.matrix = paintColorMatrixCell({
			base: this.matrix,
			position,
			color,
			symmetryOption,
		});
	}

	public flood(color: Color) {
		this.matrix = createColorMatrix({
			color: color,
			size: this.size,
		});
	}

	public fill(position: TwoDimensionalPoint, color: Color) {
		this.matrix = fillColorMatrixIsle({
			base: this.matrix,
			position,
			color,
		});
	}

	public clear() {
		this.matrix = createColorMatrix({ color: this.color, size: this.size });
	}

	public getMatrix() {
		return this.matrix;
	}

	public getId() {
		return this.id;
	}

	static getAvailableTools() {
		return COLOR_MATRIX_TOOLS;
	}
}

class IFramer {
	private frames: IColorMatrix[];
	private frameBackgroundColor: Color;
	private frameSize: TwoDimensionalSize;
	private currentFrame: IColorMatrix | null = null;

	// TODO
	constructor(frameSize: TwoDimensionalSize, frameBackgroundColor: Color) {
		this.frames = [];
		this.frameBackgroundColor = frameBackgroundColor;
		this.frameSize = frameSize;
	}

	public addFrame(
		options?: Partial<{
			size: TwoDimensionalSize;
			color: Color;
		}>
	) {
		const initialFrame = new IColorMatrix(
			options?.size ?? this.frameSize,
			options?.color ?? this.frameBackgroundColor
		);

		this.frames.push(initialFrame);
		this.currentFrame = initialFrame;
	}

	public selectFrame(id: ID) {
		const foundFrame = this.findFrame(id);
		if (!foundFrame) return;

		this.currentFrame = foundFrame;
	}

	public getFrames() {
		return this.frames.map((frame) => ({
			frame: frame.getMatrix(),
			id: frame.getId(),
		}));
	}

	public getCurrentFrame() {
		return this.currentFrame;
	}

	private findFrame(id: ID): IColorMatrix | null {
		return this.frames.find((frame) => frame.getId() === id) ?? null;
	}
}

class ICanvas {
	public readonly framer: IFramer;

	private frameBackgroundColor: Color = 'white';
	private frameSize: TwoDimensionalSize = isMobile()
		? { width: 300, height: 300 } // 300 cells
		: { width: 500, height: 500 }; // 500 cells
	private tool: ColorMatrixTool = 'pincel';

	// TODO
	public readonly zoomScale: number = 25;
	// this represents the size of each cell
	// i will use a scale like zoom scale 1 = 25px cell size

	private zoomCenter: TwoDimensionalPoint = {
		x: Math.floor(this.frameSize.width / 2),
		y: Math.floor(this.frameSize.height / 2),
	};

	constructor(
		options?: Partial<{
			frameSize: TwoDimensionalSize;
			frameBackgroundColor: Color;
		}>
	) {
		if (options?.frameSize) this.frameSize = options.frameSize;
		if (options?.frameBackgroundColor)
			this.frameBackgroundColor = options.frameBackgroundColor;

		this.framer = new IFramer(this.frameSize, this.frameBackgroundColor);
	}

	public getDefaults() {
		return {
			frameBackgroundColor: this.frameBackgroundColor,
			frameSize: this.frameSize,
			zoomScale: this.zoomScale,
			zoomCenter: this.zoomCenter,
			tool: this.tool,
		};
	}

	public getAvailableTools() {
		return IColorMatrix.getAvailableTools();
	}

	public pickTool(tool: ColorMatrixTool) {
		this.tool = tool;
	}
}

export { IColorMatrix, IFramer, ICanvas };
