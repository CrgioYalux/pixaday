import type { ColorPalette } from './types';

import { COLORS } from "./consts";

function sumDaysToMonth(month: number): number {
    const DaysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;
    let sum: number = 0;
    for (let i = 0; i < month; i++) {
        sum = sum + DaysByMonth[month];
    }
    return sum;
}

function createTodayColorPalette(nColors: number): ColorPalette.State {
    const out: ColorPalette.State = [];

    let colors = [...COLORS];

    const today = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth();
    const day: number = today.getDate();
    const dayID: number = year + (month + 1) + sumDaysToMonth(month) + day;

    for (let i = 0; i < nColors; i++) {
        const idxJump = (dayID * i) % colors.length;
        const color = colors[idxJump];
        
        out.push(color);
        colors = colors.filter((c) => c !== color);
    }

    return out;
}

function createRandomColorPalette(nColors: number): ColorPalette.State {
    const out: ColorPalette.State = [];

    for (let i = 0; i < nColors; i++) {
        let colorIdx: number = -1;

        do colorIdx = Math.floor(Math.random() * COLORS.length);
        while (out.find((c) => c === COLORS[colorIdx]));

        out.push(COLORS[colorIdx]);
    }
    
    return out;
}

export { createTodayColorPalette, createRandomColorPalette };
