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
            let color: Color | undefined;

            if (colorMatrix[i] && colorMatrix[i][j]) {
                color = colorMatrix[i][j].value;
            }

            out[i].push({
                id: i * width + j,
                value: color ?? allColor ?? 'white',
                position: { x: i, y: j },
            });
        }
    }

    return out;
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

function paintAll(colorMatrix: ColorMatrix, color: Color): void {
    for (let i = 0; i < colorMatrix.length; i++) {
        for (let j = 0; j < colorMatrix[i].length; j++) {
            colorMatrix[i][j].value = color;
        }
    }
}

function walk(colorMatrix: ColorMatrix, position: Point, color: Color, visited: ColorMatrixCell[], fill: Color) {
    for (let i = 0; i < colorMatrix.length; i++) {
        for (let j = 0; j < colorMatrix[i].length; j++) {
            if (i === position.x && j === position.y) {
                if (colorMatrix[i][j].value === color) {
                    if (visited.find((v) => v.id === colorMatrix[i][j].id)) {
                        return;
                    }

                    visited.push(colorMatrix[i][j]);
                    colorMatrix[i][j].value = fill;

                    if (colorMatrix[i][j + 1]) {
                        walk(colorMatrix, colorMatrix[i][j + 1].position, color, visited, fill);
                    } 
                    if (colorMatrix[i][j - 1]) {
                        walk(colorMatrix, colorMatrix[i][j - 1].position, color, visited, fill);
                    }
                    if (colorMatrix[i - 1] && colorMatrix[i - 1][j]) {
                        walk(colorMatrix, colorMatrix[i - 1][j].position, color, visited, fill);
                    }
                    if (colorMatrix[i + 1] && colorMatrix[i + 1][j]) {
                        walk(colorMatrix, colorMatrix[i + 1][j].position, color, visited, fill);
                    }
                }
            }
        }
    }
}

function fill(colorMatrix: ColorMatrix, position: Point, color: Color): void {
    walk(colorMatrix, position, colorMatrix[position.x][position.y].value, [], color);
}

export type { Color, Point, ColorMatrixCell, ColorMatrix };
export { createColorMatrix, changeColorMatrixSize, paint, paintAll, fill };
