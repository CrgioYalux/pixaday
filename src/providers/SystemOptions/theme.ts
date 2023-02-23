const Themes = ['dark', 'light'] as const;

export type Theme = typeof Themes[number];

export function getSystemTheme(): Theme {
    let out: Theme = 'light';

    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) { out = 'dark' };
    
    applyTheme(out);

    return out;
}

export function applyTheme(theme: Theme): void {
    document.documentElement.className = theme;
}
