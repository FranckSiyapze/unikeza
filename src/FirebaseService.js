import firebase from './Firebase';

const db = firebase.database().ref('/personlist');
let customers = [];

class FirebaseService {
  
  addCustomer = (customer) => {
    db.push(customer);
  };

  getAll() {
    return db;
  }

  get(key) {
    return db.child(key);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }
}

export default new FirebaseService();