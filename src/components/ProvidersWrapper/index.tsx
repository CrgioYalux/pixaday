import SystemOptionProvider from '../../providers/SystemOptions';
import ColorMatrixProvider from '../../providers/ColorMatrix';

interface ProvidersWrapperProps {
    children: React.ReactNode;
}

const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <SystemOptionProvider>
            <ColorMatrixProvider>
                {children}
            </ColorMatrixProvider>
        </SystemOptionProvider>
    );
};

export default ProvidersWrapper;
