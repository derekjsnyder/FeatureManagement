import React, { useEffect, useState } from "react";
import Pet from "./Pet";
import { toggleLocal } from "./feature/FeatureApi";
import { useFeatureData } from "./feature/FeatureContext";
import {
  petTextBuilder,
  petTextKey,
  isPetTextEnabled
} from "./feature/PetTextFeature";
import Modal from "./Modal";
import Feedback from "./Feedback";

const Results = ({ pets, theme }) => {
  const [features, refreshFeatures] = useFeatureData();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (features) {
      let isEnabled = isPetTextEnabled(features);
      setIsEnabled(isEnabled);
    }
  }, [features]);

  const handleChange = e => {
    toggleLocal(petTextKey());
    refreshFeatures();

    if (e.target.checked === false) {
      setShowModal(true);
    }
  };

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={theme[0] == "dark" ? "search-hw" : "search"}>
      {!pets.length
        ? petTextBuilder(features)
        : pets.map(pet => {
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
          })}
      {showModal ? (
        <Modal>
          <Feedback featureId={petTextKey()} closeModal={closeModal} />
          <div className="buttons">
            <button className="close-modal-button" onClick={closeModal}>
              close
            </button>
          </div>
        </Modal>
      ) : null}
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={e => handleChange(e)}
      />
    </div>
  );
};

export default Results;
