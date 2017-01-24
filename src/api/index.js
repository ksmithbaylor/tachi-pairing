import firebase from 'firebase';
import config from './config';
import { toFirebase, fromFirebase } from './conversions';

export default class API {
  db = null;

  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.database();
  }

  set(ref, value) {
    this.db.ref(ref).set(toFirebase(value));
  }

  get(ref) {
    return this.db
      .ref(ref)
      .once('value')
      .then(snapshot => fromFirebase(snapshot.val()));
  }

  setAll({ devs, pairs }) {
    this.set('pairs', pairs);
    this.set('devs', devs);
  }

  subscribe(ref, cb) {
    this.db.ref(ref).on('value', snapshot => {
      cb(fromFirebase(snapshot.val()));
    });
  }
}
