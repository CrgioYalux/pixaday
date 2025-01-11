import type { ColorMatrixProps } from './types';

import { useState } from 'react';

import ColorMatrixRow from '@/color-matrix/components/legacy/color-matrix-row';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

import './styles.css';

export default function ({ id }: ColorMatrixProps) {
	const [state] = useColorMatrixContext();
	const [usingPencil, setUsingPencil] = useState<boolean>(false);

	return (
		<div
			draggable={false}
			onTouchStart={() => {
				document.body.style.backgroundColor =
					'var(--brand-color-l-lowest)';
				window.onscroll = function () {
					window.scrollTo(0, 0);
				};
			}}
			onTouchEnd={() => {
				document.body.style.backgroundColor =
					'var(--primary-color-l-high)';
				window.onscroll = function () {};
			}}
			onMouseLeave={() => setUsingPencil(false)}
			id={id}
			className="ColorMatrix"
		>
			{state.colorMatrix.map((row, i) => (
				<ColorMatrixRow
					key={i}
					row={row}
					usingPencil={usingPencil}
					setUsingPencil={setUsingPencil}
				/>
			))}
		</div>
	);
}
