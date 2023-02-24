import type { Color } from '../useColorPalette/utils';

type Point = {
    x: number,
    y: number,
}

type ColorMatrixCell = {
    id: number,
    value: Color,
    position: Point,
}

type ColorMatrix = ColorMatrixCell[][];

function createColorMatrix(width: number, height: number, allColor?: Color): ColorMatrix {
    const out: ColorMatrix = [];

    for (let i = 0; i < width; i++) {
        out.push([]);
        for (let j = 0; j < height; j++) {
            out[i].push({
                id: i * width + j,
                value: allColor ?? 'white',
                position: { x: i, y: j },
            });
        }
    }

    return out;
}

function changeColorMatrixSize(colorMatrix: ColorMatrix, width: number, height: number, allColor?: Color): ColorMatrix {
    const out: ColorMatrix = [];

    for (let i = 0; i < width; i++) {
        out.push([]);
        for (let j = 0; j < height; j++) {
            if (colorMatrix[i] && colorMatrix[i][j]) {
                out[i].push(colorMatrix[i][j]);
            }
            else {
                out[i].push({
                    id: i * width + j,
                    value: allColor ?? 'white',
                    position: { x: i, y: j },
                });
            }
        }
    }

    return out;
}

function paintAll(colorMatrix: ColorMatrix, color: Color): void {
    for (let i = 0; i < colorMatrix.length; i++) {
        for (let j = 0; j < colorMatrix[i].length; j++) {
            colorMatrix[i][j].value = color;
        }
    }
}

function paint(colorMatrix: ColorMatrix, position: Point, color: Color): void {
    for (let i = 0; i < colorMatrix.length; i++) {
        for (let j = 0; j < colorMatrix[i].length; j++) {
            if (i === position.x && j === position.y) {
                colorMatrix[i][j].value = color;
            }
        }
    }
}

export type { Color, Point, ColorMatrixCell, ColorMatrix };
export { paint, paintAll, createColorMatrix, changeColorMatrixSize };
