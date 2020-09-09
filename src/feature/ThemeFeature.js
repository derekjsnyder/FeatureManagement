import {identityFn} from '../Helper';

export function themeKey() {
    return "DarkTheme";
}

function createTheme(themeProps) {
    const defaultTheme = "light";
    return themeProps(defaultTheme);
}

function darkTheme() {
    return "dark";
}


export function themeBuilder(featureDecisions){
    if ( featureDecisions.useDarkTheme()  ) {
        return createTheme(darkTheme);
    }

    return createTheme(identityFn);
}

