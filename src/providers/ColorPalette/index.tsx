import { createContext, useContext } from "react";
import { useColorPalette } from "../../hooks/useColorPalette";
import type { useColorPaletteState } from "../../hooks/useColorPalette";

interface ColorPaletteProviderProps {
    children: React.ReactNode;
}

type ColorPaletteContext = readonly [
    colorPalette: useColorPaletteState[0],
    color: useColorPaletteState[1],
    actions: useColorPaletteState[2],
    colorsOrigin: useColorPaletteState[3],
];

const ColorPaletteContext = createContext<ColorPaletteContext>([
    [],
    'white',
    {
        selectColor: () => {},
        createTodayColorPalette: () => {},
        createRandomColorPalette: () => {},
        switchColorsOrigin: () => {},
    },
    'today'
]);

export const useColorPaletteProvider = () => useContext<ColorPaletteContext>(ColorPaletteContext);

const ColorPaletteProvider: React.FC<ColorPaletteProviderProps> = ({ children }) => {
    const value = useColorPalette();

    return (
        <ColorPaletteContext.Provider value={value}>
            {children}
        </ColorPaletteContext.Provider>
    );
};

export default ColorPaletteProvider;
