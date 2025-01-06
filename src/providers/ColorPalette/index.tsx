import type { ColorPalette } from '../../hooks/useColorPalette/types';

import { createContext, useContext } from 'react';
import { useColorPalette } from '../../hooks/useColorPalette';

type ColorPaletteContext = readonly [...ColorPalette.Hook.Use];

const ColorPaletteContext = createContext<ColorPaletteContext>(
	{} as ColorPaletteContext
);

interface ColorPaletteProviderProps {
	children: React.ReactNode;
}

const useColorPaletteProvider = () =>
	useContext<ColorPaletteContext>(ColorPaletteContext);

const ColorPaletteProvider: React.FC<ColorPaletteProviderProps> = ({
	children,
}) => {
	const value = useColorPalette();

	return (
		<ColorPaletteContext.Provider value={value}>
			{children}
		</ColorPaletteContext.Provider>
	);
};

export { useColorPaletteProvider };
export default ColorPaletteProvider;
