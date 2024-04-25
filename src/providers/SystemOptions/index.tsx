import type { Theme } from './types';

import {
    useState,
    useEffect,
    createContext,
    useContext
} from 'react';
import {
    applyTheme,
    getSystemTheme
} from './utils';

interface SystemOptionsProviderProps {
    children: React.ReactNode;
}

interface SystemOptionsContext {
    theme: Theme;
    switchTheme: () => void; 
}

const SystemOptionsContext = createContext<SystemOptionsContext>({
    theme: 'dark',
    switchTheme: () => {},
});

export const useSystemOptions = () => useContext<SystemOptionsContext>(SystemOptionsContext);

const SystemOptionsProvider: React.FC<SystemOptionsProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => getSystemTheme());

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const value: SystemOptionsContext = {
        theme,
        switchTheme: () => {
            setTheme((prev) => prev === 'dark' ? 'light' : 'dark');
        }
    };

    return (
        <SystemOptionsContext.Provider value={value}>
            {children}
        </SystemOptionsContext.Provider>
    );
};

export default SystemOptionsProvider;
