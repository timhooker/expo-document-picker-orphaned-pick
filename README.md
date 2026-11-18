# expo-document-picker: orphaned pick blocks every later pick (iOS)

When the view controller that presented the document picker is dismissed while the picker is up, `getDocumentAsync` never settles, and every later call rejects with `PickingInProgressException` until the app restarts.

Tested with expo 58.0.23, expo-document-picker 58.0.4, react-native 0.88.1 on an iPhone 17 Pro simulator, iOS 26.4.

## Run

```sh
yarn install
yarn ios
```

## Steps

1. Tap **1. Open modal**.
2. Tap **2. Pick, then dismiss this modal after 2500ms** and leave the picker alone. After 2.5s the modal closes and takes the picker with it.
3. Tap **3. Pick again**.

## Expected

`pick 1` settles as canceled once its picker is gone, and `pick 2` opens a picker.

## Actual

`pick 1` never settles. `pick 2` rejects, and so does every call after it:

```
pick 1: calling getDocumentAsync
dismissing the modal under the picker
pick 2: calling getDocumentAsync
pick 2: rejected, Error: Calling the 'getDocumentAsync' function has failed
→ Caused by: Different document picking in progress. Await other document picking first
```

All of the repro is in `App.tsx`.
