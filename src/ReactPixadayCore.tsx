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
	Frame,
	ID,
	RGBA,
	SymmetryOption,
	TwoDimensionalPoint,
} from './core/types';

import colorMatrixAsCanvas from './core/utils/color-matrix-as-canvas';
import rgbaToString from './core/utils/rgba-to-string';

import PixadayBucket from './assets/Bucket.png';
import PixadayPencil from './assets/Pencil.png';
import PixadayEraser from './assets/Eraser.png';
import PixadayNewFrame from './assets/NewFrame.png';
import PixadayDeleteFrame from './assets/DeleteFrame.png';
import PixadayExport from './assets/Export.png';
import FramePreview from './FramePreview';
import Framer from './Framer';

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
		color: Color
	) => {
		if (tool === 'pincel')
			currentFrame?.paint(position, color, symmetryOption);
		if (tool === 'bucket') currentFrame?.fill(position, color);
		if (tool === 'eraser') currentFrame?.erase(position, symmetryOption);

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
		addFrame,
		deleteCurrentFrame,
		selectFrame,
		pickTool,
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
				className="w-max flex flex-col p-0.5 gap-[10px] rounded-[10px] bg-gray-300"
			>
				{canvas
					.getToolbarSectionItems()
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
						if (tool === 'eraser') {
							return {
								tool,
								icon: PixadayEraser,
								action: () => {
									pickTool(tool);
								},
							};
						}
						if (tool === 'add_new_frame') {
							return {
								tool,
								icon: PixadayNewFrame,
								action: () => {
									addFrame();
								},
							};
						}
						if (tool === 'delete_frame') {
							return {
								tool,
								icon: PixadayDeleteFrame,
								action: () => {
									deleteCurrentFrame();
								},
							};
						}
						if (tool === 'export') {
							return {
								tool,
								icon: PixadayExport,
								action: () => {
									const canvasEl = canvasRef.current;
									if (!canvasEl) return;
									colorMatrixAsCanvas.exportAsPng({
										element: canvasEl,
									});
								},
							};
						}

						return null;
					})
					.map((item) => {
						if (!item) return;
						const { tool, icon, action } = item;
						return (
							<button
								key={tool}
								onClick={action}
								className="cursor-pointer"
							>
								<img
									className="w-12 h-12"
									src={icon}
									alt={tool}
								/>
							</button>
						);
					})}
			</div>
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
			<div id="options" className="h-full bg-gray-300 rounded-[10px]">
				<RgbaColorPicker color={color} onChange={setColor} />
			</div>
		</div>
	);
};
