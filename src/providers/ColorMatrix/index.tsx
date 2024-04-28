import type { Color } from "../../hooks/useColorPalette/types";
import type {
    Point,
    ColorMatrix 
} from "../../hooks/useColorMatrix/types";
import type { Tool, SymmetryOption } from './types';

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
    symmetryOption: SymmetryOption;
};

type ColorMatrixStyleActions = {
    switchCellsRoundedBorders: () => void;
    switchCellsGap: () => void;
    chooseSymmetry: (symmetryOption: SymmetryOption) => void;
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
    const [style, setStyle] = useState<ColorMatrixStyleState>({ cellsRoundedBorders: true, cellsGap: true, symmetryOption: 'none' });
    const [tool, setTool] = useState<Tool>('pincel');

    const paint = (color: Color, position: Point): void => {
        if (tool === 'pincel') {
            colorMatrixActions.paint(color, position, style.symmetryOption);
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
        setStyle((prev) => ({ ...prev, cellsRoundedBorders: !prev.cellsRoundedBorders }));
    };

    const switchCellsGap = (): void => {
        setStyle((prev) => ({ ...prev, cellsGap: !prev.cellsGap }));
    };

    const chooseSymmetry = (symmetryOption: SymmetryOption): void => {
        setStyle((prev) => ({ ...prev, symmetryOption }));
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
                chooseSymmetry,
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
