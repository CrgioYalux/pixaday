import { TOOLS } from "./consts";

type Tool = typeof TOOLS[number];

type SymmetryOption = 'vertical' | 'horizontal' | 'diagonal' | 'custom' | 'none';

export type { Tool, SymmetryOption };
