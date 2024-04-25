import { COLORS } from './consts';

type Color = typeof COLORS[number];
type ColorsSelection = 'today' | 'random';

namespace ColorPalette {
    export type State = Color[];
    export type Actions = {
        selectColor: (color: Color) => void;
        createTodayColorPalette: () => void;
        createRandomColorPalette: () => void;
        switchColorsSelection: () => void;
    };
    export namespace Hook {
        export type Use = [
             ColorPalette.State,
             Color,
             ColorPalette.Actions,
             ColorsSelection
        ];
    }
}

export type {
    Color,
    ColorsSelection,
    ColorPalette
};
