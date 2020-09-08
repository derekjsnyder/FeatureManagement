import React, {useContext, useEffect, useState} from "react";
import Pet from "./Pet";
import {petResultText} from './feature/Feature';
import {toggleLocal} from './feature/FeatureApi';
import {FeatureContext} from "./feature/FeatureContext";


const Results = ({ pets, theme }) => {
  const defaultText = "No Pets Found";
  const [features, ] = useContext(FeatureContext);
  const [petText, setPetText] = useState(defaultText);
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    if (features && features.hasOwnProperty('isEnabled')) {
      setIsEnabled(features.isEnabled("hwfeature:pettext"));
      setPetText(petResultText(features));
    }
 
  }, [features]);

  const handleChange = () => {
    toggleLocal("hwfeature:pettext");
    setIsEnabled(!isEnabled);
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
