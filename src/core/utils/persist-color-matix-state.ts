import type { ColorMatrix } from '../types';

export default function (colorMatrix: ColorMatrix): void {
	localStorage.setItem('COLOR_MATRIX_STATE', JSON.stringify(colorMatrix));
}
