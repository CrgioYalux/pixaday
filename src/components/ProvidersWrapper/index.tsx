import SystemOptionProvider from '../../providers/SystemOptions';

interface ProvidersWrapperProps {
    children: React.ReactNode;
}

const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <SystemOptionProvider>
            {children}
        </SystemOptionProvider>
    );
};

export default ProvidersWrapper;
