const Colors = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
] as const;

type Color = typeof Colors[number];
type ColorPalette = Color[];

function sumDaysToMonth(month: number): number {
    const DaysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;
    let sum: number = 0;
    for (let i = 0; i < month; i++) {
        sum = sum + DaysByMonth[month];
    }
    return sum;
}

function createTodayColorPalette(nColors: number): ColorPalette {
    const out: Color[] = [];

    let colors: Color[] = [...Colors];

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

function createRandomColorPalette(nColors: number): ColorPalette {
    const out: Color[] = [];

    for (let i = 0; i < nColors; i++) {
        let colorIdx: number = -1;

        do {
            colorIdx = Math.floor(Math.random() * Colors.length);
        } while (out.find((c) => c === Colors[colorIdx]));

        out.push(Colors[colorIdx]);
    }
    
    return out;
}

export type { Color, ColorPalette };

export { Colors, createTodayColorPalette, createRandomColorPalette };
