import html2canvas from 'html2canvas';

export default function (elementID: string) {
	const element: HTMLElement | null = document.getElementById(elementID);

	if (!element) return;

	html2canvas(element).then((canvas) => {
		const link = document.createElement('a');
		link.download = 'Screenshot.png';
		link.href = canvas.toDataURL();
		link.click();
	});
}
