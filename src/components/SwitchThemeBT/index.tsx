import { useSystemOptions } from '../../providers/SystemOptions';

import './SwitchThemeBT.css';

const SwitchThemeBT: React.FC<{}> = () => {
    const { theme, switchTheme } = useSystemOptions();
    return (
        <button className='SwitchThemeBT' onClick={switchTheme}>
           {theme} 
        </button>
    );
};

export default SwitchThemeBT;
