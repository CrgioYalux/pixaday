import html2canvas from 'html2canvas';

const screenshotHTMLElement = (elementID: string): void => {
	const element: HTMLElement | null = document.getElementById(elementID);
	if (element)
		html2canvas(element).then((canvas) => {
			const link = document.createElement('a');
			link.download = 'Screenshot.png';
			link.href = canvas.toDataURL();
			link.click();
		});
};

export { screenshotHTMLElement };
