import './App.css';

import ProvidersWrapper from "../ProvidersWrapper";
import SwitchThemeBT from "../SwitchThemeBT";

const App: React.FC<{}> = () => {
    return (
        <ProvidersWrapper>
            <div className='App'>
                <h3>Hello</h3>
                <SwitchThemeBT />
            </div>
        </ProvidersWrapper>
    );
}

export default App;
