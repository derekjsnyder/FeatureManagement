<<<<<<< HEAD:src/FeatureApi.js
import axios from "axios";

function baseAzureTableApi(table, index = "") {
  return `https://clinicalabdatadev.table.core.windows.net/${table}${index}${
    process.env.STORAGE_TOKEN
  }`;
}

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

=======
import axios from 'axios';
import { uuidv4 } from '../Helper';

function baseAzureTableApi(table, index='') {
  return `https://clinicalabdatadev.table.core.windows.net/${table}${index}${process.env.STORAGE_TOKEN}`;
}

>>>>>>> cdbf6444a72f65c961143dc502c712c7711ce7f7:src/feature/FeatureApi.js
function authHeaders() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json;odata=nometadata"
  };
}

export function getAllFeatureFlags() {
  var url = baseAzureTableApi("featureflag");

  return axios.get(url, { headers: authHeaders() });
}

export function getFeatureFlagByName(flagName) {
<<<<<<< HEAD:src/FeatureApi.js
  var url = baseAzureTableApi(
    "featureflag",
    `(PartitionKey='darktheme',RowKey='${flagName}')`
  );
=======
    var url = baseAzureTableApi("featureflag", `(PartitionKey='features',RowKey='${flagName}')`);
>>>>>>> cdbf6444a72f65c961143dc502c712c7711ce7f7:src/feature/FeatureApi.js

  return axios.get(url, { headers: authHeaders() });
}

export function updateFeatureFlag(flagName, newValue) {
<<<<<<< HEAD:src/FeatureApi.js
  var url = baseAzureTableApi(
    "featureflag",
    `(PartitionKey='darktheme',RowKey='${flagName}')`
  );

  return axios({
    method: "merge",
    url: url,
    data: {
      IsActive: newValue
    },
    headers: authHeaders()
  });
=======
    var url = baseAzureTableApi("featureflag", `(PartitionKey='features',RowKey='${flagName}')`);

    axios({
        method: 'merge',
        url: url,
        data: {
          IsActive: newValue,
        },
        headers: authHeaders(),
    });
>>>>>>> cdbf6444a72f65c961143dc502c712c7711ce7f7:src/feature/FeatureApi.js
}

export function addFeedback(feedback, featureType) {
  var url = baseAzureTableApi("feedback");
  var data = {
    feedback,
    featureType,
    feedbackDate: new Date().getUTCDate(),
    PartitionKey: "feedback",
    RowKey: uuidv4()
  };

<<<<<<< HEAD:src/FeatureApi.js
  return axios.post(url, data, { headers: authHeaders() });
}
=======
  return axios.post(url, data, {headers: authHeaders()}); 
}

export function toggleLocal(key) {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, "true");
  }
}
>>>>>>> cdbf6444a72f65c961143dc502c712c7711ce7f7:src/feature/FeatureApi.js
