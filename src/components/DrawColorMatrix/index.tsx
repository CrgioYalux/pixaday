import DrawColorMatrixRow from "./DrawColorMatrixRow";

import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import './DrawColorMatrix.css';

interface DrawColorMatrixProps {
    id?: string;
}

const DrawColorMatrix: React.FC<DrawColorMatrixProps> = ({ id }) => {
    const [state] = useColorMatrixProvider();

    return (
        <div
            id={id}
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
