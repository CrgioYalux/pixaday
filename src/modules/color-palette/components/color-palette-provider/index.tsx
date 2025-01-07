import type { ColorPaletteProviderProps } from './types';

import ColorPaletteContext from '@/color-palette/contexts/color-palette';

import useColorPalette from '@/color-palette/hooks/use-color-palette';

export default function ({ children }: ColorPaletteProviderProps) {
	const value = useColorPalette();

	return (
		<ColorPaletteContext.Provider value={value}>
			{children}
		</ColorPaletteContext.Provider>
	);
}
