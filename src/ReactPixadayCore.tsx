import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { COLORS } from './core/consts';
import { ICanvas, IColorMatrix } from './core/pixaday-core';
import {
	Color,
	ColorMatrix,
	ColorMatrixTool,
	ID,
	SymmetryOption,
	TwoDimensionalPoint,
} from './core/types';
import colorMatrixAsCanvas from './core/utils/color-matrix-as-canvas';

type IPixadayCoreContext = {
	canvas: ICanvas;
	currentFrame: IColorMatrix | null;
	frames: { frame: ColorMatrix; id: ID }[];
	color: Color;
	tool: ColorMatrixTool;
	symmetryOption: SymmetryOption;

	addFrame: () => void;
	selectFrame: (id: ID) => void;

	pickTool: (tool: ColorMatrixTool) => void;
	pickSymmetryOption: (symmetryOption: SymmetryOption) => void;
	pickColor: (color: Color) => void;

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
		new ICanvas({ frameSize: { width: 3, height: 3 }, cellSize: 50 })
	);
	const [frames, setFrames] = useState<{ frame: ColorMatrix; id: ID }[]>([]);
	const [currentFrame, setCurrentFrame] = useState<IColorMatrix | null>(null);
	const [tool, setTool] = useState<ColorMatrixTool>('pincel');
	const [symmetryOption, setSymmetryOption] =
		useState<SymmetryOption>('none');
	const [color, setColor] = useState<Color>('red');

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

	const pickColor = (color: Color) => {
		setColor(color);
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

				color,
				tool,
				symmetryOption,

				pickColor,
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
		color,
		tool,
		symmetryOption,
		frames,
		addFrame,
		pickTool,
		pickSymmetryOption,
		pickColor,
		interactWithCurrentTool,
	} = usePixadayCore();

	const [painting, setPainting] = useState<boolean>(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);

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

			interactWithCurrentTool(position, color);
		};

		const touchDraw = (event: TouchEvent): void => {
			const position =
				colorMatrixAsCanvas.getColorMatrixCellPositionFromTouchEvent(
					event,
					canvas.getDefaults().cellSize
				);

			interactWithCurrentTool(position, color);

			const html = document.getElementsByTagName('html');
			const body = document.getElementsByTagName('body');
			const root = document.getElementById('root') as HTMLDivElement;

			html[0].classList.add('WhileTouchMovingEvent');
			body[0].classList.add('WhileTouchMovingEvent');
			root.classList.add('WhileTouchMovingEvent');
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

		const onTouchStart = (event: TouchEvent): void => {
			setPainting(true);
			touchDraw(event);
		};

		const onTouchMove = (event: TouchEvent): void => {
			if (!painting) return;
			touchDraw(event);
		};

		const onTouchDown = (): void => {
			setPainting(false);

			const html = document.getElementsByTagName('html');
			const body = document.getElementsByTagName('body');
			const root = document.getElementById('root') as HTMLDivElement;

			html[0].classList.remove('WhileTouchMovingEvent');
			body[0].classList.remove('WhileTouchMovingEvent');
			root.classList.remove('WhileTouchMovingEvent');
		};

		resize();

		const ctrl = new AbortController();
		const { signal } = ctrl;

		window.addEventListener('resize', resize, { signal });
		canvasEl.addEventListener('mousedown', onMouseDown, { signal });
		canvasEl.addEventListener('mousemove', onMouseMove, { signal });
		canvasEl.addEventListener('mouseup', onMouseUp, { signal });
		canvasEl.addEventListener('touchstart', onTouchStart, { signal });
		canvasEl.addEventListener('touchmove', onTouchMove, { signal });
		canvasEl.addEventListener('touchend', onTouchDown, { signal });

		return () => {
			ctrl.abort();
		};
	}, [canvas, currentFrame, color, tool, interactWithCurrentTool]);

	return (
		<>
			<div>
				{canvas.getAvailableTools().map((t) => (
					<button
						key={t}
						onClick={() => pickTool(t)}
						className={tool === t ? 'bg-green-500' : ''}
					>
						{t}
					</button>
				))}
			</div>
			<div>
				{canvas.getAvailableSymmetryOptions().map((s) => (
					<button
						key={s}
						onClick={() => pickSymmetryOption(s)}
						className={symmetryOption === s ? 'bg-green-500' : ''}
					>
						{s}
					</button>
				))}
			</div>
			<div>
				{COLORS.map((c) => (
					<button
						key={c}
						onClick={() => pickColor(c)}
						className={color === c ? 'bg-green-500' : ''}
					>
						{c}
					</button>
				))}
			</div>

			<button
				onClick={() => {
					addFrame();
				}}
			>
				+
			</button>
			<canvas
				ref={canvasRef}
				className="block cursor-pointer outline outline-white"
			/>
		</>
	);
};
