import firebase from 'firebase';
import config from './config';

export default class API {
  db = null;

  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.database();
  }

  set(ref, value) {
    this.db.ref(ref).set(value);
  }

  get(ref) {
    return this.db
      .ref(ref)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  setAll({ devs, pairs }) {
    this.db.ref('devs').set(devs);
    this.db.ref('pairs').set(pairs);
  }
}
