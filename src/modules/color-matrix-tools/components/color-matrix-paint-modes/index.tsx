import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

import COLOR_MATRIX_TOOLS from '@/color-matrix/consts/color-matrix-tools';

import './styles.css';

interface ColorMatrixPaintModesProps {
	className?: string;
}

export default function ({ className = '' }: ColorMatrixPaintModesProps) {
	const [state, actions] = useColorMatrixContext();

	return (
		<div className={`ColorMatrixPaintModes ${className}`}>
			{COLOR_MATRIX_TOOLS.map((tool) => (
				<label
					key={`paint_tool_${tool}`}
					htmlFor={`paint_tool_${tool}`}
				>
					<input
						type="radio"
						name="paint_tool"
						id={`paint_tool_${tool}`}
						value={tool}
						checked={tool === state.tool}
						onChange={() => actions.tool.selectTool(tool)}
					/>
					<span>{tool}</span>
				</label>
			))}
		</div>
	);
}
