import React, { useState, useEffect, useContext } from "react";
import { getAllFeatureFlags, updateFeatureFlag } from "./feature/FeatureApi";
import Feature from "./Feature";
import Modal from "./Modal";
import Feedback from "./Feedback";
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

      <ul className="flex-outer">
        {features.map(feature => {
          return (
            <div key={feature.RowKey}>
              {showModal ? (
                <Modal>
                  <Feedback
                    featureId={feature.RowKey}
                    closeModal={closeModal}
                  />
                  <div className="buttons">
                    <button className="close-modal-button" onClick={closeModal}>
                      close
                    </button>
                  </div>
                </Modal>
              ) : null}
              <Feature
                feature={feature}
                updateFeature={updateFeature}
                key={feature.RowKey}
                updateFeatureValue={updateFeatureValue}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Admin;
