type InputElementProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type SymmetryOptionProps = InputElementProps & {
	children: React.ReactNode;
	htmlFor: string;
};

export type { InputElementProps, SymmetryOptionProps };
