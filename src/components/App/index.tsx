import ProvidersWrapper from "../ProvidersWrapper";
import DrawColorMatrix from '../DrawColorMatrix';
import ColorPalette from "../ColorPalette";
import ColorMatrixTools from "../ColorMatrixTools";

import './App.css';

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <ProvidersWrapper>
            <div className='App'>
                <DrawColorMatrix />
                <ColorPalette />
                <ColorMatrixTools />
           </div>
        </ProvidersWrapper>
    );
};

export default App;
