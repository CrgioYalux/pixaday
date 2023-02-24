import ProvidersWrapper from "../ProvidersWrapper";
import DrawColorMatrix from '../DrawColorMatrix';
import ColorPalette from "../ColorPalette";

import './App.css';

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <ProvidersWrapper>
            <div className='App'>
                <DrawColorMatrix />
                <ColorPalette />
           </div>
        </ProvidersWrapper>
    );
};

export default App;
