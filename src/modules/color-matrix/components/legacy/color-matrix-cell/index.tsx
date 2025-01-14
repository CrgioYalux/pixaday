import type { ColorMatrixCellProps } from './types';

import useColorMatrixContext from '@/color-matrix/hooks/use-color-matrix-context';
import useColorPaletteContext from '@/color-palette/hooks/use-color-palette-context';

import './styles.css';

export default function ({
	value,
	position,
	usingPencil,
	setUsingPencil,
}: ColorMatrixCellProps) {
	const [, actions] = useColorMatrixContext();
	const [, color] = useColorPaletteContext();

	return (
		<div
			draggable={false}
			className="ColorMatrixCell"
			style={{ backgroundColor: value }}
			data-position-x={position.x}
			data-position-y={position.y}
			onTouchStart={() => {
				setUsingPencil(true);
				actions.colorMatrix.paint(color, position);

				const html = document.getElementsByTagName('html');
				const body = document.getElementsByTagName('body');
				const root = document.getElementById('root') as HTMLDivElement;

				html[0].classList.add('WhileTouchMovingEvent');
				body[0].classList.add('WhileTouchMovingEvent');
				root.classList.add('WhileTouchMovingEvent');
			}}
			onTouchEnd={() => {
				setUsingPencil(false);

				const html = document.getElementsByTagName('html');
				const body = document.getElementsByTagName('body');
				const root = document.getElementById('root') as HTMLDivElement;

				html[0].classList.remove('WhileTouchMovingEvent');
				body[0].classList.remove('WhileTouchMovingEvent');
				root.classList.remove('WhileTouchMovingEvent');
			}}
			onTouchMove={(event) => {
				const target = document.elementFromPoint(
					event.changedTouches[0].clientX,
					event.changedTouches[0].clientY
				) as HTMLDivElement & {
					dataset: Partial<{
						positionX: number;
						positionY: number;
					}>;
				};

				if (
					usingPencil &&
					target.dataset.positionX &&
					target.dataset.positionY
				) {
					actions.colorMatrix.paint(color, {
						x: Number(target.dataset.positionX),
						y: Number(target.dataset.positionY),
					});
				}
			}}
			onMouseDown={() => {
				setUsingPencil(true);
				actions.colorMatrix.paint(color, position);
			}}
			onMouseUp={() => {
				setUsingPencil(false);
			}}
			onMouseOver={() => {
				if (usingPencil) actions.colorMatrix.paint(color, position);
			}}
		/>
	);
}
