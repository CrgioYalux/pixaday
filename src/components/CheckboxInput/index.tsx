import type { CheckboxInputProps } from './types';

import './styles.css';

export default function ({
	className = '',
	htmlFor,
	label,
	...inputProps
}: CheckboxInputProps) {
	return (
		<label htmlFor={htmlFor} className={`CheckboxInput ${className}`}>
			<input type="checkbox" {...inputProps} id={htmlFor} />
			<span>{label}</span>
		</label>
	);
}
