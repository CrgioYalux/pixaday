import type { Color } from "../../hooks/useColorPalette/types";
import type {
    Point,
    ColorMatrix 
} from "../../hooks/useColorMatrix/types";
import type { Tool } from './types';

import {
    createContext,
    useContext,
    useState 
} from "react";
import { useColorMatrix } from "../../hooks/useColorMatrix";
import { COLOR_MATRIX_MIN_SIZE } from './consts';

type ColorMatrixStyleState = {
    cellsRoundedBorders: boolean;
    cellsGap: boolean;
};

type ColorMatrixStyleActions = {
    switchCellsRoundedBorders: () => void;
    switchCellsGap: () => void;
};

type ColorMatrixContext = readonly [
    state: {
        colorMatrix: ColorMatrix.State;
        style: ColorMatrixStyleState;
        tool: Tool;
    },
    actions: {
        colorMatrix: {
            paint: (color: Color, position: Point) => void;
            changeSize: (size: number) => void;
            resetCanvas: () => void;
        };
        style: ColorMatrixStyleActions;
        tool: {
            selectTool: (tool: Tool) => void;
        };
    }
];

const ColorMatrixContext = createContext<ColorMatrixContext>({} as ColorMatrixContext);

const useColorMatrixProvider = () => useContext<ColorMatrixContext>(ColorMatrixContext);

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

    const resetCanvas = (): void => {
        colorMatrixActions.resetCanvas();
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
                changeSize,
                resetCanvas,
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

export { useColorMatrixProvider };
export default ColorMatrixProvider;
