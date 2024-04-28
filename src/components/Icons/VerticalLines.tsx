/*
    Font Awesome Free 6.5.2 by @fontawesome
    https://fontawesome.com License
    https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc
*/

const VerticalLines: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
         <svg 
         xmlns='http://www.w3.org/2000/svg'
         viewBox='0 0 192 512'
         className={className}
         >
             <path 
             d='M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z'
             />
         </svg>
    );
};

export default VerticalLines;