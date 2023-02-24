import { createContext, useContext } from "react";
import { useColorMatrix } from "../../hooks/useColorMatrix";

import type { useColorMatrixState } from "../../hooks/useColorMatrix";

interface ColorMatrixProviderProps {
    children: React.ReactNode;
}

type ColorMatrixContext = readonly [
    state: useColorMatrixState[0],
    actions: useColorMatrixState[1]
];

const ColorMatrixContext = createContext<ColorMatrixContext>([
    [],
    {
        paint: () => {},
        paintAll: () => {},
        changeSize: () => {},
    }
]);

export const useColorMatrixProvider = () => useContext<ColorMatrixContext>(ColorMatrixContext);

const ColorMatrixProvider: React.FC<ColorMatrixProviderProps> = ({ children }) => {
    const [state, actions] = useColorMatrix({ size: 5 });

    const value = [state, actions] as const;

    return (
        <ColorMatrixContext.Provider value={value}>
            {children}
        </ColorMatrixContext.Provider>
    );
}

export default ColorMatrixProvider;
