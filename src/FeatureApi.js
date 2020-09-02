import axios from 'axios';


function baseAzureTableApi(table, index='') {
  return `https://clinicalabdatadev.table.core.windows.net/${table}${index}${process.env.STORAGE_TOKEN}`;
}

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


function authHeaders() {
  return {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata=nometadata',
  }
}

//(PartitionKey='darktheme',RowKey='darktheme')

export function getAllFeatureFlags() {
    var url = baseAzureTableApi("featureflag");

    return axios.get(url, {headers: authHeaders()});
}

export function getFeatureFlagByName(flagName) {
    var url = baseAzureTableApi("featureflag", `(PartitionKey='darktheme',RowKey='${flagName}')`);

    return axios.get(url, {headers: authHeaders()});
}


export function updateFeatureFlag(flagName, newValue) {
    var url = baseAzureTableApi("featureflag", `(PartitionKey='darktheme',RowKey='${flagName}')`);

    axios({
        method: 'merge',
        url: url,
        data: {
          IsActive: newValue,
        },
        headers: authHeaders(),
    });
}

export function addFeedback(feedback, featureType) {
  var url = baseAzureTableApi("feedback");
  var data = {
    feedback,
    featureType,
    feedbackDate: new Date().getUTCDate(),
    PartitionKey: "feedback",
    RowKey: uuidv4(),
  };

  return axios.post(url, data, {headers: authHeaders()}); 
}