import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

import COLOR_MATRIX_TOOLS from '@/color-matrix/consts/color-matrix-tools';

export default function () {
	const [state, actions] = useColorMatrixContext();

	return (
		<div className="flex">
			{COLOR_MATRIX_TOOLS.map((tool) => (
				<label
					key={`paint_tool_${tool}`}
					htmlFor={`paint_tool_${tool}`}
					className="grow-0 shrink-0 basis-[33%] bg-[var(--brand-color-l-lower)] has-[:checked]:bg-[var(--brand-color-l-base)] grid place-items-center text-center py-1 first:rounded-l-full last:rounded-r-full cursor-pointer"
				>
					<input
						className="hidden"
						type="radio"
						name="paint_tool"
						id={`paint_tool_${tool}`}
						value={tool}
						checked={tool === state.tool}
						onChange={() => actions.tool.selectTool(tool)}
					/>
					<span className="font-bold text-sm">{tool}</span>
				</label>
			))}
		</div>
	);
}
