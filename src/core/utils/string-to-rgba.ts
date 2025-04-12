import type { RGBA } from '../types';

const base16ToBase10 = (number: string): number => {
	let out = 0;

	const base16: Record<string, number> = {
		'0': 0,
		'1': 1,
		'2': 2,
		'3': 3,
		'4': 4,
		'5': 5,
		'6': 6,
		'7': 7,
		'8': 8,
		'9': 9,
		A: 10,
		B: 11,
		C: 12,
		D: 13,
		E: 14,
		F: 15,
	};

	for (
		let i = 0, power = number.length - 1;
		i < number.length;
		i++, power--
	) {
		out = base16[number[i] ?? '0'] * Math.pow(16, power) + out;
	}

	return out;
};

export default function (color: string): RGBA {
	if (!!color.match(/rgba/i)?.length) {
		// color is prefixed with 'rgba(' and suffixed with ')'

		const colorWithoutRgba = color.slice(4);
		const onlyValues = colorWithoutRgba.slice(
			1,
			colorWithoutRgba.length - 1
		);
		const [r, g, b, a] = onlyValues.split(',').map(Number);
		return {
			r,
			g,
			b,
			a,
		};
	}

	// color is prefixed by '#'
	const onlyValues = [];
	const colorWithoutPawn = color.slice(1);
	for (
		let component = 0;
		component < color.length;
		component = component + 2
	) {
		onlyValues.push(colorWithoutPawn.slice(component, component + 2));
	}
	const [r, g, b, a] = onlyValues.map(base16ToBase10);
	return { r, g, b, a };
}
