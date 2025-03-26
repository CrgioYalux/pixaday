import React, { createContext, useContext, useState } from 'react';
import { ICanvas, IColorMatrix } from './core/pixaday-core';
import { ColorMatrixTool, ID } from './core/types';

type IPixadayCoreContext = {
	canvas: ICanvas;
	currentFrame: IColorMatrix | null;
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
	const [canvas] = useState(new ICanvas());
	const [currentFrame, setCurrentFrame] = useState<IColorMatrix | null>(null);

	// Add a new frame and set it as the current one
	const addFrame = () => {
		canvas.framer.addFrame();
		setCurrentFrame(canvas.framer.getCurrentFrame());
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
			value={{ canvas, currentFrame, addFrame, selectFrame, pickTool }}
		>
			{children}
		</PixadayCoreContext.Provider>
	);
};

export const usePixadayCore = () => useContext(PixadayCoreContext);

// Example Canvas Component
export const Canvas = () => {
	const { canvas, currentFrame } = usePixadayCore();

	console.log({ canvas });

	if (!currentFrame) return <div>No frame selected</div>;

	return (
		<div>
			<h3>Pixel Art Canvas</h3>
			<pre>{JSON.stringify(currentFrame.getMatrix(), null, 2)}</pre>
		</div>
	);
};
