Is the issue that `create-expo-app` uses Expo Go?
- attempting @1.3.4
- attempting https://docs.amplify.aws/gen2/start/manual-installation/
- CONCLUSION: I don't think so.

THE FOLLOWING ALWAYS FAILS (and is in our docs):

- npx expo run:ios?
- TODO: update this

My build issues were related to this:

- https://github.com/expo/expo/issues/15809
- related to something in bash profile
- need to run the build with bash_profile disabled

A lot of the deps we have in docs were included here:
- https://github.com/aws-amplify/amplify-js/pull/12157/files#diff-f072bee94dca5484f9e77eb75ea731d7c7d2ddce396036b029b86c20d27e28cc
- see `packages/react-native/package.json`
- could the issue be newer netinfo, etc?
- CONCLUSION: no.

