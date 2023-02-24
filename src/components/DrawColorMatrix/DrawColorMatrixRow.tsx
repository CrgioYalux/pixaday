import DrawColorMatrixCell from './DrawColorMatrixCell';

import type { ColorMatrixCell } from '../../hooks/useColorMatrix/utils';

import './DrawColorMatrix.css';

interface DrawColorMatrixRowProps {
    row: ColorMatrixCell[];
}

const DrawColorMatrixRow: React.FC<DrawColorMatrixRowProps> = ({ row }) => {
    return (
        <div 
            className='DrawColorMatrixRow'
        >
        {row.map((cell) => <DrawColorMatrixCell key={cell.id} {...cell} />)}
        </div>
    );
};

export default DrawColorMatrixRow;
