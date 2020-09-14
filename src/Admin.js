import React, { useState, useEffect, useContext } from "react";
import { getAllFeatureFlags, updateFeatureFlag } from "./feature/FeatureApi";
import Feature from "./Feature";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

const Admin = () => {
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);

  async function getFeatures() {
    const { data } = await getAllFeatureFlags();
    const features = data.value.filter(feature => {
      return feature.RowKey !== "undefined";
    });
    setFeatures(features || []);
  }

  useEffect(() => {
    getFeatures();
  }, []);

  function updateFeature(rowKey) {
    const featureToUpdate = features.filter(feature => {
      return feature.RowKey === rowKey;
    });

    if (featureToUpdate) {
      updateFeatureFlag(featureToUpdate[0].RowKey, featureToUpdate[0].IsActive);
    }
  }

  function updateFeatureValue(rowKey, value) {
    if (value === "false") {
      setShowModal(true);
    }
    const updatedFeatures = features.map(feature => {
      if (feature.RowKey === rowKey) feature.IsActive = value;
      return feature;
    });
    if (updatedFeatures[0].Feature === "dark") {
      updatedFeatures[0].IsActive === true
        ? setTheme("dark")
        : setTheme("none");
    }

    setFeatures(updatedFeatures);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="admin">
      <div className="admin-header">Admin Settings</div>
      {showModal ? (
        <Modal>
          <h1>FEEDBACK</h1>
          <div className="buttons">
            <button>Yes</button>
            <button onClick={closeModal}>No, I am a monster</button>
          </div>
        </Modal>
      ) : null}
      <ul className="flex-outer">
        {features.map(feature => {
          return (
            <Feature
              feature={feature}
              updateFeature={updateFeature}
              key={feature.RowKey}
              updateFeatureValue={updateFeatureValue}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Admin;
