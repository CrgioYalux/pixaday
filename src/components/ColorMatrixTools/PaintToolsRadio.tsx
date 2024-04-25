import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import { TOOLS } from '../../providers/ColorMatrix/consts';

import './ColorMatrixTools.css';

interface PaintToolsRadioProps {
    className?: string;
}

const PaintToolsRadio: React.FC<PaintToolsRadioProps> = ({ className }) => {
    const [state, actions] = useColorMatrixProvider();

    return (
	<div className={`PaintToolsRadio ${className}`}>
	    {TOOLS.map((tool) => (
		<label
		    key={`paint_tool_${tool}`}
		    htmlFor={`paint_tool_${tool}`}
		>
		    <input
			type='radio'
			name='paint_tool'
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
};

export default PaintToolsRadio;
