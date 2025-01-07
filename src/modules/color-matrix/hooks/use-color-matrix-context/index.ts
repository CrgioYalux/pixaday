import type { IColorMatrixContext } from '@/color-matrix/contexts/color-matrix/types';

import { useContext } from 'react';

import ColorMatrixContext from '@/color-matrix/contexts/color-matrix';

export default function () {
	return useContext<IColorMatrixContext>(ColorMatrixContext);
}
