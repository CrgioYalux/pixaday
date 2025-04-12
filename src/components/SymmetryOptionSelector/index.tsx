import type { SymmetryOption } from '@/core/types';

import SymmetryOptionValue from '../SymmetryOptionValue';

type SymmetryOptionSelectorProps = {
	value: SymmetryOption;
	onChange: (value: SymmetryOption) => void;
};

export default function ({ value, onChange }: SymmetryOptionSelectorProps) {
	return (
		<div className="flex flex-col items-center gap-2 py-2">
			<h6 className="text-base text-indigo-500 font-semibold">
				Symmetry Options
			</h6>
			<div className="mx-auto flex w-full items-center justify-center gap-1">
				<SymmetryOptionValue.Vertical
					selected={value === 'vertical'}
					onClick={() => {
						onChange('vertical');
					}}
				/>
				<SymmetryOptionValue.Horizontal
					selected={value === 'horizontal'}
					onClick={() => {
						onChange('horizontal');
					}}
				/>
				<SymmetryOptionValue.DiagonalIncreasing
					selected={value === 'diagonal-increasing'}
					onClick={() => {
						onChange('diagonal-increasing');
					}}
				/>
				<SymmetryOptionValue.DiagonalDecreasing
					selected={value === 'diagonal-decreasing'}
					onClick={() => {
						onChange('diagonal-decreasing');
					}}
				/>
			</div>
		</div>
	);
}
