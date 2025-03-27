import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { ICanvas, IColorMatrix } from './core/pixaday-core';
import { ColorMatrix, ColorMatrixTool, ID } from './core/types';
import colorMatrixAsCanvas from './core/utils/color-matrix-as-canvas';

type IPixadayCoreContext = {
	canvas: ICanvas;
	currentFrame: IColorMatrix | null;
	frames: { frame: ColorMatrix; id: ID }[];
	addFrame: () => void;
	selectFrame: (id: ID) => void;
	pickTool: (tool: ColorMatrixTool) => void;
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
		new ICanvas({ frameSize: { width: 30, height: 30 } })
	);
	const [frames, setFrames] = useState<{ frame: ColorMatrix; id: ID }[]>([]);
	const [currentFrame, setCurrentFrame] = useState<IColorMatrix | null>(null);
	const [currentTool, setCurrentTool] = useState<ColorMatrixTool>('pincel');

	// basically define states for each class state

	// Get frames
	const getFrames = () => {
		return canvas.framer.getFrames();
	};

	// Add a new frame and set it as the current one
	const addFrame = () => {
		canvas.framer.addFrame();
		setCurrentFrame(canvas.framer.getCurrentFrame());
		setFrames(getFrames());
	};

	// Select a frame by ID
	const selectFrame = (id: ID) => {
		canvas.framer.selectFrame(id);
		setCurrentFrame(canvas.framer.getCurrentFrame());
	};

	// Pick a drawing tool
	const pickTool = (tool: ColorMatrixTool) => {
		canvas.pickTool(tool);
	};

	return (
		<PixadayCoreContext.Provider
			value={{
				canvas,
				currentFrame,
				frames,
				addFrame,
				selectFrame,
				pickTool,
			}}
		>
			{children}
		</PixadayCoreContext.Provider>
	);
};

export const usePixadayCore = () => useContext(PixadayCoreContext);

// Example Canvas Component
export const Canvas = () => {
	const { canvas, currentFrame, frames, addFrame } = usePixadayCore();

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvasEl = canvasRef.current;
		if (!canvasEl) return;

		const resize = (): void => {
			if (!currentFrame) return;

			colorMatrixAsCanvas.setupScaling({
				element: canvasEl,
				size: canvas.getDefaults().frameSize,
			});

			colorMatrixAsCanvas.drawColorMatrix(
				{ element: canvasEl, size: canvas.getDefaults().frameSize },
				currentFrame?.getMatrix()
			);
		};

		resize();

		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, [currentFrame]);

	return (
		<>
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
