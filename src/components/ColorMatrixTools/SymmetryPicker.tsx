import type { SymmetryOption } from '../../providers/ColorMatrix/types';
import { useColorMatrixProvider } from '../../providers/ColorMatrix';

type InputElementProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type SymmetryOptionProps = InputElementProps & {
	children: React.ReactNode;
	htmlFor: string;
};

const SymmetryOption: React.FC<SymmetryOptionProps> = ({
	children,
	htmlFor,
	...inputProps
}) => {
	return (
		<label
			className="grid border-2 p-0.5 place-items-center rounded cursor-pointer select-none has-[:checked]:bg-gray-100 has-[:checked]:text-gray-900"
			htmlFor={htmlFor}
		>
			<input
				{...inputProps}
				className="hidden"
				type="checkbox"
				id={htmlFor}
				name="symmetry"
			/>
			{children}
		</label>
	);
};

const SymmetryPicker: React.FC<{}> = () => {
	const [state, actions] = useColorMatrixProvider();

	const switchOption = (symmetryOption: SymmetryOption): void => {
		actions.style.chooseSymmetry(
			state.style.symmetryOption === symmetryOption
				? 'none'
				: symmetryOption
		);
	};

	return (
		<div className="flex gap-2 mx-auto">
			<span className="flex-none font-semibold">symmetry</span>
			<div className="flex-auto flex gap-1 flex-wrap">
				<SymmetryOption
					htmlFor="horizontal"
					checked={state.style.symmetryOption === 'horizontal'}
					onChange={() => {
						switchOption('horizontal');
					}}
				>
					<div className="w-4 h-4 flex gap-0.5 flex-col items-center">
						<div className="w-1 h-1 bg-current" />
						<div className="w-full h-1 bg-current" />
						<div className="w-1 h-1 bg-transparent border border-current" />
					</div>
				</SymmetryOption>
				<SymmetryOption
					htmlFor="vertical"
					checked={state.style.symmetryOption === 'vertical'}
					onChange={() => {
						switchOption('vertical');
					}}
				>
					<div className="w-4 h-4 flex gap-0.5 flex-row items-center">
						<div className="w-1 h-1 bg-current" />
						<div className="h-full w-1 bg-current" />
						<div className="w-1 h-1 bg-transparent border border-current" />
					</div>
				</SymmetryOption>
				<SymmetryOption
					htmlFor="diagonal-increasing"
					checked={
						state.style.symmetryOption === 'diagonal-increasing'
					}
					onChange={() => {
						switchOption('diagonal-increasing');
					}}
				>
					<div className="rotate-45 w-4 h-4 flex gap-0.5 flex-row items-center">
						<div className="w-1 h-1 bg-current" />
						<div className="h-full w-1 bg-current" />
						<div className="w-1 h-1 bg-transparent border border-current" />
					</div>
				</SymmetryOption>
				<SymmetryOption
					htmlFor="diagonal-decreasing"
					checked={
						state.style.symmetryOption === 'diagonal-decreasing'
					}
					onChange={() => {
						switchOption('diagonal-decreasing');
					}}
				>
					<div className="rotate-45 w-4 h-4 flex gap-0.5 flex-col items-center">
						<div className="w-1 h-1 bg-current" />
						<div className="w-full h-1 bg-current" />
						<div className="w-1 h-1 bg-transparent border border-current" />
					</div>
				</SymmetryOption>
			</div>
		</div>
	);
};

export default SymmetryPicker;
