import React, { useState, useEffect } from "react";
import { getAllFeatureFlags, updateFeatureFlag } from "./FeatureApi";
import Feature from "./Feature";

const Admin = () => {
  const [features, setFeatures] = useState([]);

  async function getFeatures() {
    const request = await getAllFeatureFlags();
    var features = request.data.value;
    setFeatures(features || []);
  }

  useEffect(() => {
    getFeatures();
  }, []);

  function updateFeature(rowKey) {
    var featureToUpdate;
    for (var i = 0; i < features.length; i++) {
      if (features[i].RowKey == rowKey) {
        featureToUpdate = features[i];
        break;
      }
    }
    if (featureToUpdate) {
      updateFeatureFlag(featureToUpdate.RowKey, featureToUpdate.IsActive).then(
        () => {
          getFeatures();
        }
      );
    }
  }

  function updateFeatureValue(rowKey, value) {
    for (var i = 0; i < features.length; i++) {
      if (features[i].RowKey == rowKey) {
        features[i].IsActive = value;
        break;
      }
    }
    setFeatures(features);
  }

  return (
    <div className="admin">
      <div className="admin-header">Admin Settings</div>
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
