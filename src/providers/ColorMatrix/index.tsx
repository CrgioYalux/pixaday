import { createContext, useContext, useState } from "react";
import { useColorMatrix } from "../../hooks/useColorMatrix";

import type { useColorMatrixState } from "../../hooks/useColorMatrix";

interface ColorMatrixProviderProps {
    children: React.ReactNode;
}

type ColorMatrixStyleState = {
    cellsRoundedBorders: boolean,
    cellsGap: boolean,
}

type ColorMatrixStyleActions = {
    switchCellsRoundedBorders: () => void,
    switchCellsGap: () => void,
}

type ColorMatrixContext = readonly [
    state: {
        colorMatrix: useColorMatrixState[0],
        style: ColorMatrixStyleState
    },
    actions: {
        colorMatrix: useColorMatrixState[1],
        style: ColorMatrixStyleActions,
    }
];

const ColorMatrixContext = createContext<ColorMatrixContext>([
    {
        colorMatrix: [],
        style: {
            cellsGap: true,
            cellsRoundedBorders: true,
        }
    },
    {
        colorMatrix: {
            paint: () => {},
            paintAll: () => {},
            changeSize: () => {},
        },
        style: {
            switchCellsRoundedBorders: () => {},
            switchCellsGap: () => {},
        }
    }
]);

export const useColorMatrixProvider = () => useContext<ColorMatrixContext>(ColorMatrixContext);

const ColorMatrixProvider: React.FC<ColorMatrixProviderProps> = ({ children }) => {
    const [colorMatrix, colorMatrixActions] = useColorMatrix({ size: 5 });
    const [style, setStyle] = useState<ColorMatrixStyleState>({ cellsRoundedBorders: true, cellsGap: true });

    const switchCellsRoundedBorders = (): void => {
        setStyle((prev) => {
            if (prev.cellsRoundedBorders) {
                return {
                    cellsGap: prev.cellsGap,
                    cellsRoundedBorders: false,
                };
            }
            return {
                cellsGap: prev.cellsGap,
                cellsRoundedBorders: true,
            };
        });
    };

    const switchCellsGap = (): void => {
        setStyle((prev) => {
            if (prev.cellsGap) {
                return {
                    cellsGap: false,
                    cellsRoundedBorders: prev.cellsRoundedBorders,
                };
            }
            return {
                cellsGap: true,
                cellsRoundedBorders: prev.cellsRoundedBorders,
            };
        });
    };

    const value: ColorMatrixContext = [
        {
            colorMatrix,
            style
        },
        {
            colorMatrix: colorMatrixActions,
            style: {
                switchCellsRoundedBorders,
                switchCellsGap,
            }
        }
    ] as const;

    return (
        <ColorMatrixContext.Provider value={value}>
            {children}
        </ColorMatrixContext.Provider>
    );
};

export default ColorMatrixProvider;
