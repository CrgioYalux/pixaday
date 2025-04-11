import type { SymmetryOption } from '@/color-matrix/hooks/use-color-matrix/types';

import ColorMatrixSymmetryOption from '@/color-matrix-tools/components/color-matrix-symmetry-option';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

export default function () {
	const [state, actions] = useColorMatrixContext();

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
				<ColorMatrixSymmetryOption
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
				</ColorMatrixSymmetryOption>
				<ColorMatrixSymmetryOption
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
				</ColorMatrixSymmetryOption>
				<ColorMatrixSymmetryOption
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
				</ColorMatrixSymmetryOption>
				<ColorMatrixSymmetryOption
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
				</ColorMatrixSymmetryOption>
			</div>
		</div>
	);
}
