export * from "./use-fire-snapshot";
export * from "./use-firestore";

import * as FirebaseApp from "firebase/app";

let secondaryApp;

// Firestore initialization
export const Initialize = (Config: any) => {
  secondaryApp = FirebaseApp.initializeApp(Config);
};

export { secondaryApp };
