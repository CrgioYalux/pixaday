import type { ColorMatrix } from '../types';

export default function (): ColorMatrix | null {
	const persistedState = localStorage.getItem('COLOR_MATRIX_STATE');
	if (!persistedState) return null;
	return JSON.parse(persistedState) as ColorMatrix;
}
