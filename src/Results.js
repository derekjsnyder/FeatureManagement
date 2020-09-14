import React from "react";
import Pet from "./Pet";

import {useFeatureData} from "./feature/FeatureContext";
import { petTextBuilder} from './feature/PetTextFeature';
import { themeBuilder } from './feature/ThemeFeature';

const Results = ({ pets, theme }) => {
  const [features,  ] = useFeatureData();

  return (
    <div className={themeBuilder(features) == "dark" ? "search-hw" : "search"}>
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
    </div>    
  );
};

export default Results;
