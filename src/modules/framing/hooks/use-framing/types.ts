import type {
	IColorMatrix,
	Point,
} from '@/color-matrix/hooks/use-color-matrix/types';

// [202501014140501] TODO:
// Needs to *inherit* all(?) color matrix properties
// so it can build an image out of it instead of saving
// the image itself.
// Doing that [here][202501014125452]
type Frame = {
	id: string;
	size: { width: number; height: number };
	colorMatrix: IColorMatrix.State;
};

namespace IFraming {
	export type State = {
		// [202501014140523] SPIKE:
		// not really sure why would it be useful to keep track of the last frame
		frames: Frame[];
		currentFrame: Frame | null;
		lastFrame: Frame | null;
	};

	export type Actions = {
		addFrame: (payload: Omit<Frame, 'id'>) => void;
		removeFrame: (payload: Pick<Frame, 'id'>) => void;
	};

	export namespace Hook {
		export type Use = [IFraming.State, IFraming.Actions];
		export type Props = {};
	}
}

export type { Frame, IFraming };
