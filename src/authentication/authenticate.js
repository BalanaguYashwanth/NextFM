import firebase from '@firebase/app'
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
  };


const fb = firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {fb,storage};

