import React, {useEffect, useState} from "react";
import Pet from "./Pet";
import {toggleLocal} from './feature/FeatureApi';
import {useFeatureData} from "./feature/FeatureContext";
import { petTextBuilder, petTextKey, isPetTextEnabled } from './feature/PetTextFeature';

const Results = ({ pets, theme }) => {
  const [features, refreshFeatures ] = useFeatureData();
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    if (features) {
      let isEnabled =  isPetTextEnabled(features);
      setIsEnabled(isEnabled);
    }

  }, [features]);

  const handleChange = () => {
    toggleLocal(petTextKey());
    refreshFeatures();
  };
  

 

  return (
    <div className={theme == "healthwise" ? "search-hw" : "search"}>
      {!pets.length ? (
        petTextBuilder(features)
      ) : (
        pets.map(pet => {
          return (
            <Pet
              animal={pet.type}
              key={pet.id}
              name={pet.name}
              breed={pet.breeds.primary}
              media={pet.photos}
              location={`${pet.contact.address.city}, ${
                pet.contact.address.state
              }`}
              id={pet.id}
              theme={theme}
            />
          );
        })
      )}
      <input type="checkbox" checked={isEnabled} onChange={handleChange} />
    </div>
  );
};

export default Results;
