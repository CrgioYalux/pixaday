const Themes = ['dark', 'light'] as const;

type Theme = typeof Themes[number];

function getSystemTheme(): Theme {
    let out: Theme = 'light';

    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) { out = 'dark' };
    
    applyTheme(out);

    return out;
}

function applyTheme(theme: Theme): void {
    document.documentElement.className = theme;
}

export type {
    Theme
}

export {
    getSystemTheme,
    applyTheme
}
