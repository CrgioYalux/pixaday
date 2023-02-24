import ProvidersWrapper from "../ProvidersWrapper";
import SwitchThemeBT from "../SwitchThemeBT";
import DrawColorMatrix from '../DrawColorMatrix';

import './App.css';

const App: React.FC<{}> = () => {
    return (
        <ProvidersWrapper>
            <div className='App'>
                <h3>Hello</h3>
                <SwitchThemeBT />
            </div>
            <DrawColorMatrix />
        </ProvidersWrapper>
    );
}

export default App;
