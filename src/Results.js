import React, {useContext, useEffect, useState} from "react";
import Pet from "./Pet";
import {petResultText} from './feature/Feature';
import FeatureContext from "./feature/FeatureContext";

const Results = ({ pets }) => {
  const defaultText = "No Pets Found";
  const [features, ] = useContext(FeatureContext);
  const [petText, setPetText] = useState(defaultText);

  
  useEffect(() => {
    console.log("Feature changed");
    console.log(features);
    if (features) {
      setPetText(petResultText(features));
    }

  }, [features]);

  
  return (
    <div className="search">
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
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
