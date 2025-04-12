import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import type {
	Color,
	ColorMatrix,
	ColorMatrixTool,
	Frame,
	ID,
	RGBA,
	SymmetryOption,
	TwoDimensionalPoint,
} from '@/core/types';

import { ICanvas, IColorMatrix } from '@/core/pixaday-core';

import colorMatrixAsCanvas from '@/core/utils/color-matrix-as-canvas';
import rgbaToString from '@/core/utils/rgba-to-string';
import stringToRgba from '@/core/utils/string-to-rgba';

import Framer from './Framer';
import ToolsSection from './ToolsSection';
import OptionsSection from './OptionsSection';

type InteractWithCurrentToolCallback = (result: {
	tool: 'eyedropper';
	value: string;
}) => void;

type IPixadayCoreContext = {
	canvas: ICanvas;
	currentFrame: Frame | null;
	frames: { frame: ColorMatrix; id: ID }[];
	tool: ColorMatrixTool;
	symmetryOption: SymmetryOption;

	addFrame: () => void;
	deleteCurrentFrame: () => void;
	selectFrame: (id: ID) => void;

	pickTool: (tool: ColorMatrixTool) => void;
	pickSymmetryOption: (symmetryOption: SymmetryOption) => void;

	interactWithCurrentTool: (
		position: TwoDimensionalPoint,
		color: Color,
		cb?: InteractWithCurrentToolCallback
	) => void;
};

const PixadayCoreContext = createContext<IPixadayCoreContext>(
	{} as IPixadayCoreContext
);

export const PixadayCoreProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [canvas] = useState(
		new ICanvas({ frameSize: { width: 16, height: 16 }, cellSize: 20 })
	);
	const [frames, setFrames] = useState<{ frame: ColorMatrix; id: ID }[]>([]);
	const [currentFrame, setCurrentFrame] = useState<IColorMatrix | null>(null);
	const [tool, setTool] = useState<ColorMatrixTool>('pencil');
	const [symmetryOption, setSymmetryOption] =
		useState<SymmetryOption>('none');

	// basically define states for each class state

	const getFrames = () => {
		return canvas.framer.getFrames();
	};

	const addFrame = () => {
		canvas.framer.addFrame();
		setCurrentFrame(canvas.framer.getCurrentFrame());
		setFrames(getFrames());
	};

	const deleteCurrentFrame = () => {
		if (!currentFrame) return;
		canvas.framer.deleteFrame(currentFrame.getId());
		setCurrentFrame(canvas.framer.getCurrentFrame());
		setFrames(getFrames());
	};

	const selectFrame = (id: ID) => {
		canvas.framer.selectFrame(id);
		setCurrentFrame(canvas.framer.getCurrentFrame());
	};

	const pickTool = (tool: ColorMatrixTool) => {
		setTool(tool);
	};

	const pickSymmetryOption = (symmetryOption: SymmetryOption) => {
		setSymmetryOption(symmetryOption);
	};

	const interactWithCurrentTool = (
		position: TwoDimensionalPoint,
		color: Color,
		cb?: (result: { tool: 'eyedropper'; value: string }) => void
	) => {
		if (tool === 'pencil')
			currentFrame?.paint(position, color, symmetryOption);
		if (tool === 'bucket') currentFrame?.fill(position, color);
		if (tool === 'eraser') currentFrame?.erase(position, symmetryOption);
		if (tool === 'eyedropper') {
			if (!currentFrame) return;
			const color = currentFrame.sample(position);
			cb?.({ tool: 'eyedropper', value: color });
		}

		setCurrentFrame(canvas.framer.getCurrentFrame());
		setFrames(getFrames());
	};

	return (
		<PixadayCoreContext.Provider
			value={{
				canvas,
				currentFrame: !currentFrame
					? null
					: {
							frame: currentFrame.getMatrix(),
							id: currentFrame.getId(),
						},
				frames,

				addFrame,
				deleteCurrentFrame,
				selectFrame,
				tool,
				symmetryOption,

				pickTool,
				pickSymmetryOption,

				interactWithCurrentTool,
			}}
		>
			{children}
		</PixadayCoreContext.Provider>
	);
};

export const usePixadayCore = () => useContext(PixadayCoreContext);

// Example Canvas Component
export const Canvas = () => {
	const {
		canvas,
		currentFrame,
		tool,
		frames,
		symmetryOption,
		addFrame,
		deleteCurrentFrame,
		selectFrame,
		pickTool,
		pickSymmetryOption,
		interactWithCurrentTool,
	} = usePixadayCore();

	const [painting, setPainting] = useState<boolean>(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [color, setColor] = useState<RGBA>({ r: 255, g: 0, b: 0, a: 1 });
	const colorAsStr = rgbaToString(color);

	useEffect(() => {
		const canvasEl = canvasRef.current;
		if (!canvasEl) return;

		const resize = (): void => {
			if (!currentFrame) return;

			colorMatrixAsCanvas.setupScaling(
				{
					element: canvasEl,
					size: canvas.getDefaults().frameSize,
				},
				canvas.getDefaults().cellSize
			);

			colorMatrixAsCanvas.drawColorMatrix(
				{ element: canvasEl, size: canvas.getDefaults().frameSize },
				currentFrame?.frame,
				canvas.getDefaults().cellSize
			);
		};

		const mouseDraw = (event: MouseEvent): void => {
			const position =
				colorMatrixAsCanvas.getColorMatrixCellPositionFromMouseEvent(
					event,
					{ element: canvasEl, size: canvas.getDefaults().frameSize },
					canvas.getDefaults().cellSize
				);

			const cb: InteractWithCurrentToolCallback = (result) => {
				if (result.tool === 'eyedropper') {
					setColor(stringToRgba(result.value));
				}
			};

			interactWithCurrentTool(position, colorAsStr, cb);
		};

		const onMouseDown = (event: MouseEvent): void => {
			setPainting(true);
			mouseDraw(event);
		};

		const onMouseMove = (event: MouseEvent): void => {
			if (!painting) return;
			mouseDraw(event);
		};

		const onMouseUp = (): void => {
			setPainting(false);
		};

		resize();

		const ctrl = new AbortController();
		const { signal } = ctrl;

		window.addEventListener('resize', resize, { signal });
		canvasEl.addEventListener('mousedown', onMouseDown, { signal });
		canvasEl.addEventListener('mousemove', onMouseMove, { signal });
		canvasEl.addEventListener('mouseup', onMouseUp, { signal });

		return () => {
			ctrl.abort();
		};
	}, [canvas, currentFrame, colorAsStr, tool, interactWithCurrentTool]);

	return (
		<div className="h-screen w-screen overflow-hidden grid p-[20px] gap-[20px] grid-cols-[max-content_1fr_200px] ">
			<ToolsSection
				tools={canvas.getToolbarSectionItems()}
				onClicks={{
					pencil: () => pickTool('pencil'),
					bucket: () => pickTool('bucket'),
					eraser: () => pickTool('eraser'),
					eyedropper: () => pickTool('eyedropper'),
					add_new_frame: () => addFrame(),
					delete_frame: () => deleteCurrentFrame(),
					export: () => {
						const canvasEl = canvasRef.current;
						if (!canvasEl) return;
						colorMatrixAsCanvas.exportAsPng({
							element: canvasEl,
						});
					},
				}}
			/>
			<div
				id="framer"
				className="w-full h-full grid grid-rows-[1fr_100px] gap-[10px] overflow-hidden"
			>
				<div
					id="canvas"
					className="w-full h-full bg-gray-800 grid place-items-center overflow-hidden"
				>
					{currentFrame && (
						<canvas
							ref={canvasRef}
							className="block cursor-pointer outline outline-white"
						/>
					)}
				</div>
				<Framer
					frames={frames}
					currentFrame={currentFrame}
					selectFrame={selectFrame}
					deps={[frames.length, currentFrame?.id]}
				/>
			</div>
			<OptionsSection
				symmetryOption={symmetryOption}
				options={canvas.getOptionsSectionItems()}
				currentTool={tool}
				color={color}
				onClicks={{
					color: (color) => setColor(color),
					vertical: () => pickSymmetryOption('vertical'),
					horizontal: () => pickSymmetryOption('horizontal'),
					'diagonal-increasing': () =>
						pickSymmetryOption('diagonal-increasing'),
					'diagonal-decreasing': () =>
						pickSymmetryOption('diagonal-decreasing'),
				}}
			/>
		</div>
	);
};
