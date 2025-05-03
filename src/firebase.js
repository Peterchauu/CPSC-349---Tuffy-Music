import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDbKspTa48o87OBeIes51K_BsVl9T3RgSE",
  authDomain: "tuffy-music.firebaseapp.com",
  projectId: "tuffy-music",
  storageBucket: "tuffy-music.firebasestorage.app",
  messagingSenderId: "237944373860",
  appId: "1:237944373860:web:0202869ad7c41a998fd571",
  measurementId: "G-MXJ5FNW643"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;