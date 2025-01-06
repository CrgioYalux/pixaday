import type { Theme } from './types';

function getSystemTheme(): Theme {
	const theme: Theme =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';

	applyTheme(theme);

	return theme;
}

function applyTheme(theme: Theme): void {
	document.documentElement.className = theme;
}

export { getSystemTheme, applyTheme };
