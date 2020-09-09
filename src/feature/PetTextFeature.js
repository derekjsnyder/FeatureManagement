function enabledFeaturePetText() {
    return "Sorry no pets";
}

function defaultPetText() {
    return "No Pets Found";
}

export function petTextBuilder(features) {
    if ( isPetTextEnabled(features)) {
        return createPetTextComponent(enabledFeaturePetText);
    }

    return createPetTextComponent(defaultPetText);
}

function createPetTextComponent(petProps) {
    return petProps();
}

export function petTextKey() {
    return "hwfeature:pettext";
}

export function isPetTextEnabled(features) {
    return features.indexOf(petTextKey()) >= 0;
}

