import type { DependencyList } from 'react';
import type { Frame, ID } from './core/types';

import FramePreview from './FramePreview';

type FramerProps = {
	frames: Frame[];
	currentFrame: Frame | null;
	selectFrame: (id: ID) => void;
	deps?: DependencyList;
};

const Framer = ({ frames, currentFrame, selectFrame, deps }: FramerProps) => {
	return (
		<div
			id="frames"
			className="flex items-center p-4 gap-4 bg-gray-300 rounded-[10px] overflow-x-auto overflow-y-hidden"
		>
			{!!currentFrame &&
				!!frames.length &&
				frames.map((frame) => (
					<FramePreview
						key={frame.id}
						id={frame.id}
						colorMatrix={frame.frame}
						select={selectFrame}
						selected={currentFrame.id === frame.id}
						deps={deps ?? []}
					/>
				))}
		</div>
	);
};

export default Framer;
