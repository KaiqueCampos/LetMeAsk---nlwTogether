import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeProps = 'light' | 'dark';

type ThemeContextProps = {
    buttonThemeState: boolean;
    theme: string;
    toggleTheme: (currentTheme: string) => void;
}


type ThemesAttributes = {
    '--primaryColor': string,
    '--secondaryColor': string,
    '--illustration': string,
    '--fontColor1': string,
    '--fontColor2': string,
    '--border': string,
    '--title': string,
    '--buttonColor1': string,
    '--isOutlineButtonColor': string,
    '--questionIsAnswered': string,
    '--isHighlighted': string
}

export const ThemeContext = createContext({} as ThemeContextProps);

type ThemeContextProviderProps = {
    children: ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {

    const [theme, setTheme] = useState<ThemeProps>('light');
    const [buttonThemeState, setButtonThemeState] = useState(false)
    console.log(theme)

    function toggleTheme(currentTheme: string) {
        localStorage.setItem('theme', currentTheme === 'light' ? 'dark' : 'light');

        const newTheme = localStorage.getItem('theme');
        if (newTheme === '') {
            localStorage.setItem('theme', theme);
            setTheme('light')
        }

        setTheme(newTheme === 'light' ? 'light' : 'dark');
    }

    useEffect(() => {

        if (localStorage.getItem('theme') === '') {
            localStorage.setItem('theme', theme);
        }

        const currentTheme = localStorage.getItem('theme');
        setTheme(currentTheme === 'light' ? 'light' : 'dark');

        document.querySelector('body')?.setAttribute('data-theme', theme);

        // Styles 
        const themes = {
            dark: {
                '--primaryColor': '#191622',
                '--secondaryColor': '#44475a',
                '--illustration': '#44475a',
                '--fontColor1': '#fff',
                '--fontColor2': '#81838e',
                '--border': '#44475a',
                '--title': '#44475a',
                '--buttonColor1': '#44475a',
                '--isOutlineButtonColor': '#81838e',
                '--questionIsAnswered': '#201e29',
                '--isHighlighted': '#271c47'
            },

            light: {
                '--primaryColor': '#f8f8f8',
                '--secondaryColor': '#fefefe',
                '--illustration': '#835afd',
                '--fontColor1': '#29292e',
                '--fontColor2': '#fff',
                '--border': '#a8a8b3',
                '--title': '#29292e',
                '--buttonColor1': '#fff',
                '--isOutlineButtonColor': '#835afd',
                '--questionIsAnswered': '#dbdcdd',
                '--isHighlighted': '#f4f0ff'

            },
        }

        // Active theme in page
        function activateTheme(theme: ThemesAttributes) {

            Object.entries(theme).forEach(
                ([key, value]) =>
                    document.documentElement.style.setProperty(key, value)
            );
        }

        // Switch to the dark theme:
        setButtonThemeState(theme === 'light' ? false : true);
        activateTheme(theme === 'light' ? themes.light : themes.dark);
    }, [theme])

    return (
        <ThemeContext.Provider value={{
            buttonThemeState,
            theme,
            toggleTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )

}