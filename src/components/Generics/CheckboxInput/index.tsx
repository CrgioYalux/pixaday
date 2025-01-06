import './CheckboxInput.css';

interface CheckboxInputProps {
	checked: boolean;
	onChange: () => void;
	htmlFor: string;
	label: string;
	className?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
	className = '',
	htmlFor,
	label,
	...inputProps
}) => {
	return (
		<label htmlFor={htmlFor} className={`CheckboxInput ${className}`}>
			<input type="checkbox" {...inputProps} id={htmlFor} />
			<span>{label}</span>
		</label>
	);
};

export default CheckboxInput;
