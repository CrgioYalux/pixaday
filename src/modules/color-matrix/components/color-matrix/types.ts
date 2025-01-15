import type { TwoDimensionalSize } from '@/color-matrix/types';

export interface ColorMatrixProps {
	size?: {
		desktop?: TwoDimensionalSize;
		mobile?: TwoDimensionalSize;
	};
}
