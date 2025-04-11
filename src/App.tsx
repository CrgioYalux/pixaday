import { Canvas, PixadayCoreProvider } from './react-adapter/ReactPixadayCore';

export default function () {
	return (
		<PixadayCoreProvider>
			<Canvas />
		</PixadayCoreProvider>
	);
}
