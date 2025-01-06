const LS_COLOR_MATRIX_SIZE_KEY = 'COLOR_MATRIX_SIZE_STATE';

function persistState(colorMatrixSize: number): void {
	localStorage.setItem(
		LS_COLOR_MATRIX_SIZE_KEY,
		JSON.stringify(colorMatrixSize)
	);
}

function recoverPersistedState(): number | null {
	const persistedState = localStorage.getItem(LS_COLOR_MATRIX_SIZE_KEY);
	return !persistedState ? null : (JSON.parse(persistedState) as number);
}

export { persistState, recoverPersistedState };
