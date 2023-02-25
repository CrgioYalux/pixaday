const Tools = ['pincel', 'bucket', 'filler'] as const;
type Tool = typeof Tools[number];

const COLOR_MATRIX_MIN_SIZE = 5 as const;
const COLOR_MATRIX_MAX_SIZE = 30 as const;

export type { Tool };
export { Tools, COLOR_MATRIX_MIN_SIZE, COLOR_MATRIX_MAX_SIZE };
