import React, {useEffect, useState} from 'react';
import {toggleLocal} from './feature/FeatureApi';
import {useFeatureData} from "./feature/FeatureContext";
import { petTextKey, isPetTextEnabled } from './feature/PetTextFeature';

function ResultTextToggle() {
    const [features, refreshFeatures ] = useFeatureData();
    const [isEnabled, setIsEnabled] = useState(false);

    const handleChange = () => {
        toggleLocal(petTextKey());
        refreshFeatures();
      };
      
      useEffect(() => {
        if (features) {
          let isEnabled =  isPetTextEnabled(features);
          setIsEnabled(isEnabled);
        }
    
      }, [features]);
    

    return(
    <div className="search-toggle">   
    <label htmlFor="toggleResultText">
      <input id="toggleResultText" type="checkbox" checked={isEnabled} onChange={handleChange} />
      Use New Result Text?
    </label>
  </div>);
}

export default ResultTextToggle;