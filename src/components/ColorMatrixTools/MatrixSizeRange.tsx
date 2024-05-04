import { useState } from 'react';
import { useColorMatrixProvider } from '../../providers/ColorMatrix';

import {
    COLOR_MATRIX_MIN_SIZE,
    COLOR_MATRIX_MAX_SIZE 
} from '../../providers/ColorMatrix/consts';

const MatrixSizeRange: React.FC<{}> = () => {
    const [matrixSize, setMatrixSize] = useState<number>(COLOR_MATRIX_MIN_SIZE);
    const [state, actions] = useColorMatrixProvider();
    const [isMatrixSizeChanging, setIsMatrixSizeChanging] = useState<boolean>(false);

    return (
        <label
        className='flex gap-2 p-4 py-2 items-center bg-brand-900 rounded-full'
        htmlFor='matrix_size'
        >
            <input
            className='flex-1 peer'
            type='range'
            id='matrix_size'
            min={COLOR_MATRIX_MIN_SIZE}
            max={COLOR_MATRIX_MAX_SIZE}
            onMouseUp={() => {
                actions.colorMatrix.changeSize(matrixSize);
                setIsMatrixSizeChanging(false);
            }}
            onTouchEnd={() => {
                actions.colorMatrix.changeSize(matrixSize);
                setIsMatrixSizeChanging(false);
            }}
            onChange={(event) => {
                setIsMatrixSizeChanging(true);
                setMatrixSize(Number(event.currentTarget.value));
            }}
            defaultValue={state.colorMatrixSize.width}
            />
            <div 
            className='peer-active:*:*:text-xl peer-active:has-[div[role="text"]]:text-base order-first flex-none grid place-items-center'
            >
                <div
                className='relative w-8 flex flex-wrap text-brand-400 transition-colors duration-100'
                role='icon'
                >
                    <div 
                    className='absolute w-[2ch] grid place-items-center text-brand-100 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
                    role='text'
                    >
                        {matrixSize}
                    </div>
                    <div
                    className='w-4 h-4 border border-current'
                    />
                    <div
                    className='w-4 h-4 border border-current'
                    style={{
                        borderStyle: isMatrixSizeChanging
                            ? 'dashed'
                            : 'solid'
                    }}
                    />
                    <div
                    className='w-4 h-4 border border-current'
                    style={{
                        borderStyle: isMatrixSizeChanging
                            ? 'dashed'
                            : 'solid'
                    }}
                    />
                    <div
                    className='w-4 h-4 border border-current border-dashed'
                    style={{
                        borderStyle: isMatrixSizeChanging
                            ? 'dashed'
                            : 'solid'
                    }}
                    />
                </div>
            </div>
        </label>
    );
};

export default MatrixSizeRange;
