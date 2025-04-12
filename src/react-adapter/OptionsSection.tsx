import { RgbaColorPicker } from 'react-colorful';
import {
	RGBA,
	SymmetryOption,
	Tool,
	ToolAndOptions,
	ToolOption,
} from '@/core/types';
import SymmetryOptionSelector from '@/components/SymmetryOptionSelector';

type OptionsSectionProps = {
	options: ToolAndOptions;
	onClicks: Partial<
		Record<ToolOption, () => void> & Record<'color', (color: RGBA) => void>
	>;
	color: RGBA;
	currentTool: Tool;
	symmetryOption: SymmetryOption;
};

const OptionsSection = ({
	options,
	onClicks,
	color,
	currentTool,
	symmetryOption,
}: OptionsSectionProps) => {
	const symmetryUsingTools: Tool[] = ['pencil', 'eraser'];

	return (
		<div id="options" className="h-full bg-gray-300 rounded-[10px]">
			<RgbaColorPicker
				color={color}
				onChange={(color) => onClicks['color']?.(color)}
			/>

			<div className="flex flex-col">
				{symmetryUsingTools.includes(currentTool) && (
					<SymmetryOptionSelector
						value={symmetryOption}
						onChange={(value) => {
							onClicks[value]?.();
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default OptionsSection;
