# Feature Management Application
![Deploy Feature Management Application](https://github.com/derekjsnyder/FeatureManagement/workflows/Deploy%20Feature%20Management%20Application/badge.svg)

### Implementation Details
- Database - Azure Storage Table API.
- React application based off of [Front End Masters Course](https://bit.ly/react-v5).  For technical details about original project this code was based on refer to [README-orig.md](README-orig.md)
- Hosted in [Azure CDN](https://clinicalabendpointdev.azureedge.net)

### Feature Context
Maintain current state of enabled features that is available to application using hook:
```
import { useFeatureData } from './feature/FeatureContext';

let [features, refreshFeatures] = useFeatureData();
```

The first item is a list of all features currently enabled, either the `KeyData` field if the feature is stored in the database, or the name of the local storage key.  The second item is a method to refresh the feature cache, typically done after a change has been made to the features.

Feature toggling to the features will be made using the appropriate API (Azure Table API, or Local Storage).  Features stored in Local Storage are features that can be turned off an on by a user.  The state of the toggle is stored in the users local storage in the current browser.  Features stored in the database are considered admin level features that can only be turned off and on by an administrator.  The changes will be applied to all users.

#### Update Local Storage
The `toggleLocal` function will invert the current toggle status.
```
import { toggleLocal } from './feature/FeatureApi';

toggleLocal('hwfeature:pettext'); //Toggle feature in local storage
```

#### Update Database
The `updateFeatureFlag` function will update the feature toggle in the database with the specified (boolean) value based on the primary key of the feature.
```
import { updateFeatureFlag } from './feature/FeatureApi';

updateFeatureFlag('dark', true); //Set the dark feature to true.
```

## Feature Flipper
Feature flippers designed in way to minimize spaghetti logic in applications for toggling a feature on and off.  The logic is pulled out of the main flow of the application into factory methods which determine the correct value to return.  The factory method can return an object (perhaps components to build up `props`), strings (for example to be used in CSS styles), or even React components.  In fact the factory method can return anything that can be represented in code. For purposes of demonstration, each feature is split into its own file.

The feature file has the following methods:
  - Method returning the key name for the feature.  This corresponds to the key of the feature in the database, or the feature in local storage.
  - Predicate for determining if key is present in feature collection.  This will always take a collection of values and return a boolean.
  - Factory method that returns either a default value (feature not toggled) or the alternate value based on if the feature is toggled.

  - Abstract if statements
  - Functions to handle feature types
    - Components / strings /etc...

  - Feature:
    - Key
    - Predicate
    - Builder / Factory
        - Contains if statement to check for flag


### API
- Azure Table Storage REST API

### Types
- Local Storage
    - If property exists in local storage with a value of "true" - then feature is enabled
    - Meant for feature toggles that users can enable/disable themselves
- Admin Driven
    - Admin page
    - Toggle for all users

### Feedback

### Considered Out of Scope
- User Management
- Back-End Feature Flippers.  While conceptually the same, wanted to focus effort on a single code base.
- Complex feature flippers with interplay between multiple different flippers.  Ideally we craft new features in a way to minimize or eliminate this.