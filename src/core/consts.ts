const COLOR_MATRIX_TOOLS = [
	'pencil',
	'bucket',
	'eraser',
	'eyedropper',
] as const;
const FRAMER_TOOLS = ['add_new_frame', 'delete_frame', 'select_frame'] as const;
const CANVAS_TOOLS = ['export'] as const;
const ALL_TOOLS = [
	...COLOR_MATRIX_TOOLS,
	...FRAMER_TOOLS,
	...CANVAS_TOOLS,
] as const;
const SYMMETRY_OPTIONS = [
	'vertical',
	'horizontal',
	'diagonal-increasing',
	'diagonal-decreasing',
	'custom',
	'none',
] as const;
const ALL_TOOLS_OPTIONS = [...SYMMETRY_OPTIONS] as const;

export {
	COLOR_MATRIX_TOOLS,
	SYMMETRY_OPTIONS,
	FRAMER_TOOLS,
	CANVAS_TOOLS,
	ALL_TOOLS,
	ALL_TOOLS_OPTIONS,
};
