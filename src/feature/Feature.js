import {getAllFeatureFlags } from './FeatureApi';
const identityFn = x => x;
const localFlagPrefix = "hwfeature:";

const isActiveFeature = feature => feature.IsActive === true;

export async function getFeatures() {
    // Get all local storage flags
    let enabledFeatures = [];

    for (let i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        if (key.indexOf(localFlagPrefix) >= 0 && localStorage.getItem(key) === "true") {
            enabledFeatures.push(key);
        }
    }  

    let res =  await getAllFeatureFlags();


    for (let i = 0; i <= res.data.value.length - 1; i++) {
        let val = res.data.value[i];
        if (isActiveFeature(val)) {
            enabledFeatures.push(val.Feature);
        }
    }
        


    return {
        isEnabled: (feature) => enabledFeatures.indexOf(feature) >= 0,
        enabledFeatures: enabledFeatures,
    };

}

function createFeatureDecisions(features){
    return {
        useDarkTheme(){
          return features.isEnabled("DarkTheme");
      }, useAlternatePetText() {
        return features.isEnabled("hwfeature:pettext");
      }
      // ... additional decision functions also live here ...
    };
}


  function darkTheme() {
      return "dark";
  }

  function alternativePetText() {
    return "Sorry no pets";
  }

function createFeatureAwareFactoryBasedOn(featureDecisions) {
    return {
        themeBuilder(){
            if ( featureDecisions.useDarkTheme()  ) {
                return createTheme(darkTheme);
            }

            return createTheme(identityFn);
        },
        petTextBuilder() {
            if ( featureDecisions.useAlternatePetText()  ) {
                return createPetText(alternativePetText);
            }

            return createPetText(identityFn);
        }
    };
}

function createTheme(themeProps) {
        const defaultTheme = "light";
        return themeProps(defaultTheme);
}

function createPetText(petProps) {
    const defaultText = "No Pets Found";
    return petProps(defaultText);
}


export function loadTheme(features) {

    let factory = createFeatureAwareFactoryBasedOn(createFeatureDecisions(features));

    let themeCreator = factory.themeBuilder();

    return themeCreator;
}

export function petResultText(features) {
    let factory = createFeatureAwareFactoryBasedOn(createFeatureDecisions(features));

    let petTextCreator = factory.petTextBuilder();

    return petTextCreator;
}