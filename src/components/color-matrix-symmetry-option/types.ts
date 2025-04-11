type InputElementProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type ColorMatrixSymmetryOptionProps = InputElementProps & {
	children: React.ReactNode;
	htmlFor: string;
};

export type { ColorMatrixSymmetryOptionProps };
