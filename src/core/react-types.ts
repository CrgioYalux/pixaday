import type {
	ColorMatrix,
	ColorMatrixActions,
	ColorMatrixConstructorProps,
} from './types';

type IUseColorMatrix = (
	props?: ColorMatrixConstructorProps
) => [state: ColorMatrix, actions: ColorMatrixActions];

export type { IUseColorMatrix };
