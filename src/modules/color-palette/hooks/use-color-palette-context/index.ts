import type { IColorPaletteContext } from '@/color-palette/contexts/color-palette/types';

import { useContext } from 'react';
import ColorPaletteContext from '@/color-palette/contexts/color-palette';

export default function () {
	return useContext<IColorPaletteContext>(ColorPaletteContext);
}
