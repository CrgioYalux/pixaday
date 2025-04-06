import type {
	TwoDimensionalPoint,
	TwoDimensionalSize,
	ID,
	Color,
	SymmetryOption,
	ColorMatrixTool,
	ToolOption,
	ColorMatrix,
	Tool,
	Frame,
} from './types';

import {
	COLOR_MATRIX_TOOLS,
	SYMMETRY_OPTIONS,
	FRAMER_TOOLS,
	CANVAS_TOOLS,
} from './consts';

import isMobile from '@/utils/is-mobile';

import cloneColorMatrix from './utils/clone-color-matrix';
import createColorMatrix from './utils/create-color-matrix';
import fillColorMatrixIsle from './utils/fill-color-matrix-isle';
import paintColorMatrixCell from './utils/paint-color-matrix-cell';
import getColorMatrixCellColor from './utils/get-color-matrix-cell-color';

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

	public erase(
		position: TwoDimensionalPoint,
		symmetryOption: SymmetryOption
	) {
		this.matrix = paintColorMatrixCell({
			base: this.matrix,
			position,
			color: 'rgba(0,0,0,0)',
			symmetryOption,
		});
	}

	public sample(position: TwoDimensionalPoint) {
		return getColorMatrixCellColor({
			base: this.matrix,
			position,
		});
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

	static getAvailableToolsOptions(): Record<
		Readonly<ColorMatrixTool>,
		Readonly<ToolOption[]>
	> {
		return {
			pencil: SYMMETRY_OPTIONS,
			eraser: SYMMETRY_OPTIONS,
			bucket: [],
			eyedropper: [],
		};
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

	public deleteFrame(id: ID) {
		const foundFrame = this.findFrame(id);
		if (!foundFrame) return;

		this.frames = this.frames.filter((frame) => frame.getId() !== id);
		this.currentFrame = this.frames[this.frames.length - 1] ?? null;
	}

	public selectFrame(id: ID) {
		const foundFrame = this.findFrame(id);
		if (!foundFrame) return;

		this.currentFrame = foundFrame;
	}

	public getFrames(): Frame[] {
		return this.frames.map((frame) => ({
			frame: frame.getMatrix(),
			id: frame.getId(),
		}));
	}

	public getCurrentFrame() {
		if (!this.currentFrame) return null;
		return this.currentFrame;
	}

	private findFrame(id: ID): IColorMatrix | null {
		return this.frames.find((frame) => frame.getId() === id) ?? null;
	}

	static getAvailableTools() {
		return FRAMER_TOOLS;
	}
}

class ICanvas {
	public readonly framer: IFramer;

	private frameBackgroundColor: Color = 'rgba(255,255,255,1)';
	private frameSize: TwoDimensionalSize = isMobile()
		? { width: 300, height: 300 } // 300 cells
		: { width: 500, height: 500 }; // 500 cells

	private zoomScale: number = 1;
	private cellSize: number = 10;

	// TODO
	//private zoomCenter: TwoDimensionalPoint = {
	//	x: Math.floor(this.frameSize.width / 2),
	//	y: Math.floor(this.frameSize.height / 2),
	//};

	constructor(
		options?: Partial<{
			frameSize: TwoDimensionalSize;
			zoomScale: number;
			cellSize: number;
			frameBackgroundColor: Color;
		}>
	) {
		if (options?.zoomScale) this.zoomScale = options.zoomScale;
		if (options?.cellSize) this.cellSize = options.cellSize;
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
			cellSize: this.cellSize,
		};
	}

	private getAvailableTools() {
		return CANVAS_TOOLS;
	}

	public getToolbarSectionItems() {
		const notSupposedToGoInToolbarSection: Tool[] = ['select_frame'];

		return [
			...IColorMatrix.getAvailableTools(),
			...IFramer.getAvailableTools(),
			...this.getAvailableTools(),
			// TODO:
			// from ICanvas
			// - zoom in/out
			// - move over the canvas
			//
			// 202504091234847
			// Maybe each Class should have a static method, getAvailableTools()
			// that provides the ids of the tools that it can invoke
			// Then just have a dispatcher, that receives the id and executes
			// the correct tool/action
		].filter((item) => !notSupposedToGoInToolbarSection.includes(item));
	}

	public getCustomizationSectionItems() {
		const all = [
			...Object.entries(IColorMatrix.getAvailableToolsOptions()),
		] as [Readonly<Tool>, Readonly<ToolOption[]>][];

		const obj: Record<Readonly<Tool>, Readonly<ToolOption[]>> = {
			pencil: [],
			bucket: [],
			eraser: [],
			eyedropper: [],
			add_new_frame: [],
			delete_frame: [],
			select_frame: [],
			export: [],
		};
		for (const pair of all) {
			obj[pair[0]] = pair[1];
		}

		return obj;
	}
}

export { IColorMatrix, IFramer, ICanvas };
