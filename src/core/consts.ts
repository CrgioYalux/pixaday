const COLORS = ['white', 'red', 'yellow', 'green'] as const;
const COLOR_MATRIX_TOOLS = ['pincel', 'bucket', 'filler'] as const;
const SYMMETRY_OPTIONS = [
	'vertical',
	'horizontal',
	'diagonal-increasing',
	'diagonal-decreasing',
	'custom',
	'none',
] as const;

export { COLORS, COLOR_MATRIX_TOOLS, SYMMETRY_OPTIONS };
