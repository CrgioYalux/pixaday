import type { RGBA } from '../types';

export default function ({ r, g, b, a }: RGBA) {
	return `rgba(${r},${g},${b},${a})`;
}
