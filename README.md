# iReporter

iReporter is a React Native application aimed at combating corruption in Africa by enabling citizens to report incidents of corruption or issues needing government intervention. Users can create red-flag records for corruption incidents and intervention records for issues requiring government action.

## Features

### MVP Features
1. Users can create an account and log in.
2. Users can create a red-flag record (An incident linked to corruption).
3. Users can create intervention records (a call for a government agency to intervene, e.g., repair bad road sections, collapsed bridges, flooding, etc.).
4. Users can edit their red-flag or intervention records.
5. Users can delete their red-flag or intervention records.
6. Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention records.
7. Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or intervention records.
8. Admin can change the status of a record to either under investigation, rejected (in the event of a false claim), or resolved (in the event that the claim has been investigated and resolved).
9. Users can add images to their red-flag or intervention records, to support their claims.
10. Users can add videos to their red-flag or intervention records, to support their claims.
11. The user gets real-time email notification when Admin changes the status of their record.

### Optional Features
1. The application displays a Google Map with Marker showing the red-flag or intervention location.
2. The user gets real-time SMS notification when Admin changes the status of their record.

## Installation

### Prerequisites

- Node.js
- npm
- React Native CLI
- Firebase project setup

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/frvrernest/iReporter.git
    cd iReporter
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Install React Navigation and dependencies:
    ```bash
    npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
    npm install react-native-screens react-native-safe-area-context
    ```

## Usage

### Running the App

To run the app on an emulator or physical device:

```bash
npm run android
# or
npm run ios
