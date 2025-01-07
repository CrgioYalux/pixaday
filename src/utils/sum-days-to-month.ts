export default function (monthIndex: number): number {
	return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].reduce(
		(acc, arr, i) => (acc + i < monthIndex ? acc + arr : 0),
		0
	);
}
