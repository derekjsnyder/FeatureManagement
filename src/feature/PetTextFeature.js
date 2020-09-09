import {identityFn} from '../Helper';

function createPetText(petProps) {
    const defaultText = "No Pets Found";
    return petProps(defaultText);
}

function alternativePetText() {
    return "Sorry no pets";
}

export function petTextBuilder(featureDecisions) {
    if ( featureDecisions.useAlternatePetText()  ) {
        return createPetText(alternativePetText);
    }

    return createPetText(identityFn);
}

export function petTextKey() {
    return "hwfeature:pettext";
}
