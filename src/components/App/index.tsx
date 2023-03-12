import ProvidersWrapper from "../ProvidersWrapper";
import DrawColorMatrix from '../DrawColorMatrix';
import ColorPalette from "../ColorPalette";
import ColorMatrixTools from "../ColorMatrixTools";

import { screenshotHTMLElement } from "../../utils/screenshotHTMLElement";

import './App.css';

const COLOR_MATRIX_ID = 'ColorMatrix';
const screenshotColorMatrix = (): void => {
    screenshotHTMLElement(COLOR_MATRIX_ID);
};

interface AppProps {}
const App: React.FC<AppProps> = () => {
    return (
        <ProvidersWrapper>
            <div className='App'>
                <DrawColorMatrix id={COLOR_MATRIX_ID} />
                <div className='App__tools'>
                    <ColorPalette />
                    <ColorMatrixTools className='App__ColorMatrixTools' />
                    <button onClick={screenshotColorMatrix}>save</button>
                </div>
           </div>
        </ProvidersWrapper>
    );
};

export default App;
