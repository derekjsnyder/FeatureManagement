import React, {useEffect, useState} from "react";
import Pet from "./Pet";
import {toggleLocal} from './feature/FeatureApi';
import {useFeatureData} from "./feature/FeatureContext";

const Results = ({ pets, theme }) => {
  const defaultText = "No Pets Found";
  const [features, refreshFeatures ] = useFeatureData();
  const [petText, setPetText] = useState(defaultText);
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    if (features) {
      let isEnabled =  features.enabledFeatures.indexOf("hwfeature:pettext") >= 0;
      setIsEnabled(isEnabled);
      setPetText(features.petResultText());
    }

  }, [features]);

  const handleChange = () => {
    toggleLocal("hwfeature:pettext");
    refreshFeatures();
  };
  

 

  return (
    <div className={theme == "healthwise" ? "search-hw" : "search"}>
      {!pets.length ? (
        <h1>{petText}</h1>
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
