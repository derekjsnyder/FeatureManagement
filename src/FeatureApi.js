import axios from 'axios';


function baseAzureTableApi(table, index='') {
  return `https://clinicalabdatadev.table.core.windows.net/${table}${index}${process.env.STORAGE_TOKEN}`;
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
