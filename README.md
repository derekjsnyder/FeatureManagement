https://github.com/derekjsnyder/FeatureManagement/workflows/Deploy Feature Management Application/badge.svg

## For details about original project [README-orig.md](README-orig.md)

## Feature Context
  - Load Features
  - Reload features (does not actually handle inserts)

## Feature Flipper
  - Abstract if statements
  - Functions to handle feature types
    - Components / strings /etc...

  - Feature:
    - Key
    - Predicate
    - Builder / Factory
        - Contains if statement to check for flag


### API
- Azure Table Storage

### Types
- Local Storage
    - If property exists in local storage with a value of "true" - then feature is enabled
    - Meant for feature toggles that users can enable/disable themselves
- Admin Driven
    - Admin page
    - Toggle for all users

### Feedback