import PixadayBucket from '../assets/Bucket.png';
import PixadayPencil from '../assets/Pencil.png';
import PixadayEraser from '../assets/Eraser.png';
import PixadayNewFrame from '../assets/NewFrame.png';
import PixadayDeleteFrame from '../assets/DeleteFrame.png';
import PixadayExport from '../assets/Export.png';
import PixadayEyedropper from '../assets/Eyedropper.png';

import type { Tool } from '@/core/types';
import { Fragment } from 'react/jsx-runtime';

type ToolsSectionProps = {
	tools: Tool[];
	onClicks: Partial<Record<Tool, () => void>>;
};

const Icons: Partial<Record<Tool, string>> = {
	bucket: PixadayBucket,
	pencil: PixadayPencil,
	eraser: PixadayEraser,
	add_new_frame: PixadayNewFrame,
	delete_frame: PixadayDeleteFrame,
	export: PixadayExport,
	eyedropper: PixadayEyedropper,
};

const ToolsSection = ({ tools, onClicks }: ToolsSectionProps) => {
	return (
		<div
			id="toolbar"
			className="w-max flex flex-col p-0.5 gap-[10px] rounded-[10px] bg-gray-300"
		>
			{tools.map((tool) => (
				<Fragment key={tool}>
					{!!tool && !!onClicks[tool] && (
						<button
							onClick={() => onClicks?.[tool]?.()}
							className="cursor-pointer"
						>
							<img
								className="w-12 h-12"
								src={Icons[tool]}
								alt={tool}
							/>
						</button>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default ToolsSection;
