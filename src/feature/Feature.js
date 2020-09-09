import {getAllFeatureFlags } from './FeatureApi';
import { petTextBuilder, petTextKey } from './PetTextFeature';
import { themeKey, themeBuilder } from './ThemeFeature';

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

    let factory = createFeatureAwareFactoryBasedOn(createFeatureDecisions(enabledFeatures));
        
    return {
        enabledFeatures,
        petResultText: function() {
            return factory.petTextBuilder();
        }, 
        loadTheme: function() {
            return factory.themeBuilder();
        },
    };
}

function createFeatureDecisions(features){
    return {
        useDarkTheme(){
          return features.indexOf(themeKey()) >= 0;
      }, useAlternatePetText() {
        return features.indexOf(petTextKey()) >= 0;
      }
      // ... additional decision functions also live here ...
    };
}



function createFeatureAwareFactoryBasedOn(featureDecisions) {
    return {
        themeBuilder: function() {
            return themeBuilder(featureDecisions);
        },
        petTextBuilder: function() {
            return petTextBuilder(featureDecisions);
        } ,
    };
}


