import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { RgbaColorPicker } from 'react-colorful';

import { ICanvas, IColorMatrix } from './core/pixaday-core';
import type {
	Color,
	ColorMatrix,
	ColorMatrixTool,
	ID,
	RGBA,
	SymmetryOption,
	TwoDimensionalPoint,
} from './core/types';

import colorMatrixAsCanvas from './core/utils/color-matrix-as-canvas';
import rgbaToString from './core/utils/rgba-to-string';

import PixadayBucket from './assets/Bucket.png';
import PixadayPencil from './assets/Pencil.png';
import PixadayFrame from './assets/Frame.png';
import PixadayEraser from './assets/Eraser.png';

type IPixadayCoreContext = {
	canvas: ICanvas;
	currentFrame: IColorMatrix | null;
	frames: { frame: ColorMatrix; id: ID }[];
	tool: ColorMatrixTool;
	symmetryOption: SymmetryOption;

	addFrame: () => void;
	selectFrame: (id: ID) => void;

	pickTool: (tool: ColorMatrixTool) => void;
	pickSymmetryOption: (symmetryOption: SymmetryOption) => void;

	interactWithCurrentTool: (
		position: TwoDimensionalPoint,
		color: Color
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
	const [tool, setTool] = useState<ColorMatrixTool>('pincel');
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
		color: Color
	) => {
		if (tool === 'pincel')
			currentFrame?.paint(position, color, symmetryOption);
		if (tool === 'bucket') currentFrame?.flood(color);
		if (tool === 'filler') currentFrame?.fill(position, color);

		setCurrentFrame(canvas.framer.getCurrentFrame());
		setFrames(getFrames());
	};

	return (
		<PixadayCoreContext.Provider
			value={{
				canvas,
				currentFrame,
				frames,

				addFrame,
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
		symmetryOption,
		addFrame,
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
				currentFrame?.getMatrix(),
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

			interactWithCurrentTool(position, colorAsStr);
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
			<div
				id="toolbar"
				className="w-max flex flex-col p-0.5 gap-[10px] rounded-[10px] bg-[#D9D9D9]"
			>
				{[...canvas.getAvailableTools(), 'new frame']
					.map((tool) => {
						if (tool === 'pincel')
							return {
								tool,
								icon: PixadayPencil,
								action: () => {
									pickTool(tool);
								},
							};
						if (tool === 'bucket')
							return {
								tool,
								icon: PixadayBucket,
								action: () => {
									pickTool(tool);
								},
							};
						if (tool === 'new frame')
							return {
								tool,
								icon: PixadayFrame,
								action: () => {
									addFrame();
								},
							};
						// implement eraser
						return {
							tool,
							icon: PixadayEraser,
							action: () => {
								// @ts-ignore
								pickTool(tool);
							},
						};
					})
					.map(({ tool, action, icon }) => {
						return (
							<button
								key={tool}
								onClick={action}
								className="cursor-pointer"
							>
								<img className="w-10 h-10" src={icon} />
							</button>
						);
					})}
			</div>
			<div
				id="framer"
				className="w-full h-full grid grid-rows-[1fr_100px] gap-[10px]"
			>
				<div
					id="canvas"
					className="bg-gray-800 grid place-items-center"
				>
					<canvas
						ref={canvasRef}
						className="block cursor-pointer outline outline-white"
					/>
				</div>
				<div id="frames" className="bg-[#D9D9D9] rounded-[10px]"></div>
			</div>
			<div id="options" className="h-full bg-[#D9D9D9] rounded-[10px]">
				<RgbaColorPicker color={color} onChange={setColor} />
			</div>
		</div>
	);
};
