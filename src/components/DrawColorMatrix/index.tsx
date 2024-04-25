import DrawColorMatrixRow from "./DrawColorMatrixRow";

import { useState } from 'react';
import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import './DrawColorMatrix.css';

interface DrawColorMatrixProps {
    id?: string;
}

const DrawColorMatrix: React.FC<DrawColorMatrixProps> = ({
    id
}) => {
    const [state] = useColorMatrixProvider();
    const [usingPencil, setUsingPencil] = useState<boolean>(false);

    return (
        <div
        draggable={false}
        onTouchStart={() => {
            document.body.style.backgroundColor = 'var(--brand-color-l-lowest)';
            window.onscroll = function () {
                window.scrollTo(0, 0);
            };
        }}
        onTouchEnd={() => {
            document.body.style.backgroundColor = 'var(--primary-color-l-high)';
            window.onscroll = function () {};
        }}
        onMouseLeave={() => setUsingPencil(false)}
        id={id}
        className={`
            DrawColorMatrix
            ${state.style.cellsGap ? ' --has-gap' : ' --has-not-gap'}
            ${state.style.cellsRoundedBorders ? ' --has-rounded-borders' : ' --has-not-rounded-borders'}
        `}
        >
            {state.colorMatrix.map((row, i) => (
                <DrawColorMatrixRow 
                key={i}
                row={row}
                usingPencil={usingPencil}
                setUsingPencil={setUsingPencil}
                />
            ))}
        </div>
    );
};

export default DrawColorMatrix;
