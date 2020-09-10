export function themeKey() {
    return "dark";
}

export function isThemeEnabled(features) {
    return features.indexOf(themeKey()) >= 0;
}

function createTheme(themeProps) {
    return themeProps();
}

function darkThemeClassName() {
    return "dark";
}

function defaultClassName() {
    return "";
}


export function themeBuilder(features){
    if ( isThemeEnabled(features)) {
        return createTheme(darkThemeClassName);
    }

    return createTheme(defaultClassName);
}
