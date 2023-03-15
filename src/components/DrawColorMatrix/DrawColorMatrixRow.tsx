import DrawColorMatrixCell from './DrawColorMatrixCell';

import type { ColorMatrixCell } from '../../hooks/useColorMatrix/utils';

import './DrawColorMatrix.css';

interface DrawColorMatrixRowProps {
    row: ColorMatrixCell[];
    usingPencil: boolean;
    setUsingPencil: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawColorMatrixRow: React.FC<DrawColorMatrixRowProps> = ({ row, usingPencil, setUsingPencil }) => {
    return (
        <div 
            className='DrawColorMatrixRow'
            draggable={false}
        >
        {row.map((cell) => (
            <DrawColorMatrixCell
                key={cell.id}
                usingPencil={usingPencil}
                setUsingPencil={setUsingPencil}
                {...cell}
            />
        ))}
        </div>
    );
};

export default DrawColorMatrixRow;
