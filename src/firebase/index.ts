'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, browserLocalPersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (typeof window !== 'undefined') {
    if (!getApps().length) {
      // Important! initializeApp() is called without any arguments because Firebase App Hosting
      // integrates with the initializeApp() function to provide the environment variables needed to
      // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
      // without arguments.
      let firebaseApp;
      try {
        // Attempt to initialize via Firebase App Hosting environment variables
        firebaseApp = initializeApp();
      } catch (e) {
        // Only warn in production because it's normal to use the firebaseConfig to initialize
        // during development
        if (process.env.NODE_ENV === "production") {
          console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
        }
        firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
      }

      return getSdks(firebaseApp);
    }
    // If already initialized, return the SDKs with the already initialized App
    return getSdks(getApp());
  }
  // On the server, return a dummy object or handle as needed
  return getSdks(null);
}


export function getSdks(firebaseApp: FirebaseApp | null) {
  // Check if firebaseApp is null (which means we are on the server)
  if (!firebaseApp) {
    // Return a structure with null or dummy objects. 
    // This avoids crashes during server-side rendering.
    return {
      firebaseApp: null,
      auth: null,
      firestore: null,
      storage: null,
    };
  }

  const auth = initializeAuth(firebaseApp, {
    persistence: browserLocalPersistence,
    // No popupRedirectResolver needed for this configuration
  });

  return {
    firebaseApp,
    auth: auth,
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
