import { useColorMatrixProvider } from '../../providers/ColorMatrix';
import { Tools } from '../../providers/ColorMatrix/utils';

import './ColorMatrixTools.css';

interface PaintToolsRadioProps {
    className?: string;
}

const PaintToolsRadio: React.FC<PaintToolsRadioProps> = ({ className }) => {
    const [state, actions] = useColorMatrixProvider();

    return (
	<div className={`PaintToolsRadio ${className}`}>
	    {Tools.map((tool) => (
		<label
		    key={`paint_tool_${tool}`}
		    htmlFor={`paint_tool_${tool}`}
		>
		    <span>{tool}</span>
		    <input
			type='radio'
			name='paint_tool'
			id={`paint_tool_${tool}`}
			value={tool}
			checked={tool === state.tool}
			onChange={() => actions.tool.selectTool(tool)}
		    />
		</label>
	    ))}
	</div>
    );
};

export default PaintToolsRadio;
