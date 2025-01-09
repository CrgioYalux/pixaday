import ColorMatrixSizeRange from '@/color-matrix-tools/components/color-matrix-size-range';
import ColorMatrixPaintModes from '@/color-matrix-tools/components/color-matrix-paint-modes';
import ColorMatrixSymmetryModes from '@/color-matrix-tools/components/color-matrix-symmetry-modes';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';

export default function () {
	const [_, actions] = useColorMatrixContext();

	return (
		<div className="flex flex-col gap-4">
			<ColorMatrixSizeRange />
			<ColorMatrixPaintModes />
			<ColorMatrixSymmetryModes />
			<button
				className="rounded-full py-1 bg-[var(--brand-color-l-lower)]"
				onClick={() => actions.colorMatrix.resetCanvas()}
			>
				reset canvas
			</button>
		</div>
	);
}
