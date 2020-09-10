import React from "react";

const Feature = props => {
  function handleUpdate() {
    props.updateFeature(props.feature.RowKey);
  }

  function handleRadioChange(event) {
    var value = event.target.value;
    props.updateFeatureValue(props.feature.RowKey, value);
  }

  return (
    <li>
      <p>{props.feature.Feature}</p>
      <ul className="flex-inner">
        <li>
          <input
            type="radio"
            id="active"
            defaultChecked={props.feature.IsActive}
            name={props.feature.Feature}
            onChange={event => handleRadioChange(event)}
            value={true}
          />
          <label htmlFor="active">Active</label>
        </li>
        <li>
          <input
            type="radio"
            id="inactive"
            defaultChecked={!props.feature.IsActive}
            name={props.feature.Feature}
            onChange={event => handleRadioChange(event)}
            value={false}
          />
          <label htmlFor="inactive">Inactive</label>
        </li>
        <li>
          <button onClick={handleUpdate}>Update</button>
        </li>
      </ul>
    </li>
  );
};

export default Feature;
