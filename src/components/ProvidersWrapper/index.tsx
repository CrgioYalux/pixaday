import SystemOptionProvider from '../../providers/SystemOptions';
import ColorMatrixProvider from '../../providers/ColorMatrix';
import ColorPaletteProvider from '../../providers/ColorPalette';

interface ProvidersWrapperProps {
    children: React.ReactNode;
}

const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <SystemOptionProvider>
            <ColorMatrixProvider>
                <ColorPaletteProvider>
                    {children}
                </ColorPaletteProvider>
            </ColorMatrixProvider>
        </SystemOptionProvider>
    );
};

export default ProvidersWrapper;
