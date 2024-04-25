import type { ColorMatrix } from '../../hooks/useColorMatrix/types';

import DrawColorMatrixCell from './DrawColorMatrixCell';

import './DrawColorMatrix.css';

interface DrawColorMatrixRowProps {
    row: ColorMatrix.Cell[];
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
