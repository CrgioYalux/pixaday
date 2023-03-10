import './CheckboxInput.css';

interface CheckboxInputProps {
    checked: boolean;
    onChange: () => void;
    htmlFor: string;
    label: string;
    className?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = (props) => {
    return (
	<label
	    htmlFor={props.htmlFor}
	    className={`CheckboxInput ${props.className}`}
	>
	    <input
		type='checkbox'
		id={props.htmlFor}
		checked={props.checked}
		onChange={props.onChange}
	    />
	    <span>{props.label}</span>
	</label>
    );
};

export default CheckboxInput;
