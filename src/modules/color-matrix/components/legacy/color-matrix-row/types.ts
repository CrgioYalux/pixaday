import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';

export interface ColorMatrixRowProps {
	row: IColorMatrix.Cell[];
	usingPencil: boolean;
	setUsingPencil: React.Dispatch<React.SetStateAction<boolean>>;
}
