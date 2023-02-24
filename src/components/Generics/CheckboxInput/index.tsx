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
	    <span>{props.label}</span>
	    <input
		type='checkbox'
		id={props.htmlFor}
		checked={props.checked}
		onChange={props.onChange}
	    />
	</label>
    );
};

export default CheckboxInput;
