import ColorMatrixProvider from '../../providers/ColorMatrix';
import ColorPaletteProvider from '../../providers/ColorPalette';

interface ProvidersWrapperProps {
	children: React.ReactNode;
}

const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
	return (
		<ColorMatrixProvider>
			<ColorPaletteProvider>{children}</ColorPaletteProvider>
		</ColorMatrixProvider>
	);
};

export default ProvidersWrapper;
