import DrawColorMatrixRow from "./DrawColorMatrixRow";

import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import './DrawColorMatrix.css';

interface DrawColorMatrixProps {}

const DrawColorMatrix: React.FC<DrawColorMatrixProps> = ({}) => {
    const [state] = useColorMatrixProvider();

    return (
        <div
            className={
                `DrawColorMatrix
                ${state.style.cellsGap ? ' --has-gap' : ' --has-not-gap'}
                ${state.style.cellsRoundedBorders ? ' --has-rounded-borders' : ' --has-not-rounded-borders'}
                `
            }
        >
        {state.colorMatrix.map((row, i) => <DrawColorMatrixRow key={i} row={row} />)}
        </div>
    );
};

export default DrawColorMatrix;
