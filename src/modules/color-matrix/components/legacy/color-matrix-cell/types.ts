import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';

export interface ColorMatrixCellProps extends IColorMatrix.Cell {
	usingPencil: boolean;
	setUsingPencil: React.Dispatch<React.SetStateAction<boolean>>;
}
