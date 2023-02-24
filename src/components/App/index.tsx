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
                <div className='App__tools'>
                    <ColorPalette />
                    <ColorMatrixTools className='App__ColorMatrixTools' />
                </div>
           </div>
        </ProvidersWrapper>
    );
};

export default App;
