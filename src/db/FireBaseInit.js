import admin from "firebase-admin"
import serviceAccount from "./serviceAccountKey.json" assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Initialize Firestore
const firebaseDb = admin.firestore();

export{
    firebaseDb
}
