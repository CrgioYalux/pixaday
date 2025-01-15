import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';
import type { Frame, IFraming } from './types';

import { useState } from 'react';

export default function ({}: IFraming.Hook.Props): IFraming.Hook.Use {
	const [frames, setFrames] = useState<Frame[]>([]);
	const [currentFrame, setCurrentFrame] = useState<Frame | null>(null);
	const lastFrame = frames[frames.length - 1] ?? null;

	const convertColorMatrixToFrame = (
		colorMatrix: IColorMatrix.State
	): void => {};

	const addFrame = (frame: Omit<Frame, 'id'>): void => {
		// [202501014140543] SPIKE:
		// not sure if it would be beneficial in any sense to find some sort of
		// notation to represent colorMatrix
		// something like FEN in chess

		setFrames((prev) => [
			...prev,
			{ ...frame, id: (prev.length + 1).toString() },
		]);
	};

	const removeFrame = (frame: Pick<Frame, 'id'>): void => {
		setFrames((prev) => prev.filter((arr) => arr.id !== frame.id));

		if (currentFrame?.id === frame.id) {
			setCurrentFrame(null);
		}
	};

	const actions: IFraming.Actions = {
		addFrame,
		removeFrame,
	};

	const state: IFraming.State = {
		frames,
		currentFrame,
		lastFrame,
	};

	return [state, actions];
}
