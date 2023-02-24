import DrawColorMatrixRow from "./DrawColorMatrixRow";

import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import './DrawColorMatrix.css';

interface DrawColorMatrixProps {}

const DrawColorMatrix: React.FC<DrawColorMatrixProps> = ({}) => {
    const [colorMatrix] = useColorMatrixProvider();

    return (
        <div
            className='DrawColorMatrix'
        >
        {colorMatrix.map((row, i) => <DrawColorMatrixRow key={i} row={row} />)}
        </div>
    );
};

export default DrawColorMatrix;
