# expo-document-picker: orphaned pick blocks every later pick (iOS)

Calling `getDocumentAsync` from a sheet that is closing leaves the module stuck. The picker never appears, the promise never settles, and every later call rejects with `PickingInProgressException` until the app restarts.

Tested with expo 58.0.23, expo-document-picker 58.0.4, react-native 0.88.1 on an iPhone 17 Pro simulator, iOS 26.4.

## Run

```sh
yarn install
yarn ios
```

## Steps

1. Tap **1. Open sheet**. It's a React Native `Modal` with `presentationStyle="pageSheet"`.
2. Tap **2. Attach a file**. Its handler closes the sheet and calls `getDocumentAsync()` in the same tick.
3. Tap **3. Pick again**.

## Expected

`pick 1` either shows a picker or settles, and `pick 2` opens a picker.

## Actual

No picker appears. `pick 1` never settles. `pick 2` rejects, and so does every call after it:

```
pick 1: calling getDocumentAsync
pick 2: calling getDocumentAsync
pick 2: rejected, Error: Calling the 'getDocumentAsync' function has failed
→ Caused by: Different document picking in progress. Await other document picking first
```

The same stuck state follows whenever the view controller that presented the picker is dismissed while the picker is up, for example by navigation or by a system popover closing.

All of the repro is in `App.tsx`.
