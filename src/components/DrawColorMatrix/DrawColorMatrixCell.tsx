import type { ColorMatrix } from '../../hooks/useColorMatrix/types';

import { useColorMatrixProvider } from '../../providers/ColorMatrix';
import { useColorPaletteProvider } from '../../providers/ColorPalette';

import './DrawColorMatrix.css';

interface DrawColorMatrixCellProps extends ColorMatrix.Cell {
	usingPencil: boolean;
	setUsingPencil: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawColorMatrixCell: React.FC<DrawColorMatrixCellProps> = ({
	value,
	position,
	usingPencil,
	setUsingPencil,
}) => {
	const [, actions] = useColorMatrixProvider();
	const [, color] = useColorPaletteProvider();

	return (
		<div
			draggable={false}
			className="DrawColorMatrixCell"
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
};

export default DrawColorMatrixCell;
