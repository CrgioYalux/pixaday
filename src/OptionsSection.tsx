import { RgbaColorPicker } from 'react-colorful';
import { RGBA, Tool, ToolAndOptions, ToolOption } from './core/types';

type OptionsSectionProps = {
	options: ToolAndOptions;
	onClicks: Partial<
		Record<ToolOption, () => void> & Record<'color', (color: RGBA) => void>
	>;
	color: RGBA;
	currentTool: Tool;
};

const OptionsSection = ({
	options,
	onClicks,
	color,
	currentTool,
}: OptionsSectionProps) => {
	return (
		<div id="options" className="h-full bg-gray-300 rounded-[10px]">
			<RgbaColorPicker
				color={color}
				onChange={(color) => onClicks['color']?.(color)}
			/>

			<div className="flex flex-col">
				{options[currentTool].map((option) => (
					<button
						className={`text-black w-full border-b border-current`}
						key={option}
						onClick={() => onClicks[option]?.()}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default OptionsSection;
