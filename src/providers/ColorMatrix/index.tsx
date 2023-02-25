import { createContext, useContext, useState } from "react";
import { useColorMatrix } from "../../hooks/useColorMatrix";
import { COLOR_MATRIX_MIN_SIZE } from './utils';

import type { useColorMatrixState } from "../../hooks/useColorMatrix";
import type { Color } from "../../hooks/useColorPalette/utils";
import type { Point } from "../../hooks/useColorMatrix/utils";
import type { Tool } from './utils';

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
        style: ColorMatrixStyleState,
        tool: Tool,
    },
    actions: {
        colorMatrix: {
            paint: (color: Color, position: Point) => void,
            changeSize: (size: number) => void,
        },
        style: ColorMatrixStyleActions,
        tool: {
            selectTool: (tool: Tool) => void,
        }
    }
];

const ColorMatrixContext = createContext<ColorMatrixContext>([
    {
        colorMatrix: [],
        style: {
            cellsGap: true,
            cellsRoundedBorders: true,
        },
        tool: 'pincel'
    },
    {
        colorMatrix: {
            paint: () => {},
            changeSize: () => {},
        },
        style: {
            switchCellsRoundedBorders: () => {},
            switchCellsGap: () => {},
        },
        tool: {
            selectTool: () => {}
        }
    }
]);

export const useColorMatrixProvider = () => useContext<ColorMatrixContext>(ColorMatrixContext);

interface ColorMatrixProviderProps {
    children: React.ReactNode;
}

const ColorMatrixProvider: React.FC<ColorMatrixProviderProps> = ({ children }) => {
    const [colorMatrix, colorMatrixActions] = useColorMatrix({ size: COLOR_MATRIX_MIN_SIZE });
    const [style, setStyle] = useState<ColorMatrixStyleState>({ cellsRoundedBorders: true, cellsGap: true });
    const [tool, setTool] = useState<Tool>('pincel');

    const paint = (color: Color, position: Point): void => {
        if (tool === 'pincel') {
            colorMatrixActions.paint(color, position);
        }
        else if (tool === 'bucket') {
            colorMatrixActions.paintAll(color);
        }
        else {
            colorMatrixActions.fill(color, position);
        }
    };

    const changeSize = (size: number): void => {
        colorMatrixActions.changeSize(size);
    };

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

    const selectTool = (tool: Tool): void => {
        setTool(tool);
    };

    const value: ColorMatrixContext = [
        {
            colorMatrix,
            style,
            tool
        },
        {
            colorMatrix: {
                paint,
                changeSize
            },
            style: {
                switchCellsRoundedBorders,
                switchCellsGap,
            },
            tool: {
                selectTool,
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
