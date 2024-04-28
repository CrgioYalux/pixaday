import HorizontalLines from '../Icons/HorizontalLines';
import VerticalLines from '../Icons/VerticalLines';

import { useColorMatrixProvider } from '../../providers/ColorMatrix';

type InputElementProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
>;

type SymmetryOptionProps = InputElementProps & {
    children: React.ReactNode;
    htmlFor: string;
}

const SymmetryOption: React.FC<SymmetryOptionProps> = ({
    children,
    htmlFor,
    ...inputProps
}) => {
    return (
        <label
        className='h-full p-0.5 aspect-square rounded has-[:checked]:bg-gray-100 has-[:checked]:text-gray-900 cursor-pointer border-2 grid place-items-center select-none'
        htmlFor={htmlFor}
        >
            <input
            {...inputProps}
            className='hidden'
            type='radio'
            id={htmlFor}
            name='symmetry'
            />
            {children}
        </label>
    );
};

const SymmetryPicker: React.FC<{}> = () => {
    const [state, actions] = useColorMatrixProvider();

    return (
        <div 
        className='flex'
        >
            <span 
            className='flex-none basis-[12ch] my-auto text-center'
            >
                symmetry
            </span>
            <div className='flex-1 flex gap-2 justify-center rounded'>
                <SymmetryOption 
                htmlFor='horizontal'
                checked={state.style.symmetryOption === 'horizontal'}
                onChange={(event) => {
                    if (event.target.checked)
                        actions.style.chooseSymmetry('horizontal');
                }}
                >
                    <HorizontalLines
                    className='w-4 fill-current'
                    />
                </SymmetryOption>
                <SymmetryOption 
                htmlFor='vertical'
                checked={state.style.symmetryOption === 'vertical'}
                onChange={(event) => {
                    if (event.target.checked)
                        actions.style.chooseSymmetry('vertical');
                }}
                >
                    <VerticalLines
                    className='h-6 fill-current'
                    />
                </SymmetryOption>
                <SymmetryOption
                htmlFor='none'
                checked={state.style.symmetryOption === 'none'}
                onChange={(event) => {
                    if (event.target.checked)
                        actions.style.chooseSymmetry('none');
                }}
                >
                    <span 
                    className='font-semibold'
                    >
                        no
                    </span>
                </SymmetryOption>
            </div>
        </div>
    );
};

export default SymmetryPicker;
