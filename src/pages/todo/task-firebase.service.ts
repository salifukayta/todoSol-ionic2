import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Task } from '../shared/task';

@Injectable()
export class TaskFirebaseService {

  add(newTask: Task): firebase.Promise<any> {
    let uid = firebase.auth().currentUser.uid;
    newTask.id = firebase.database().ref('tasks/' + uid).push().key;
    return firebase.database().ref('tasks/' + uid + '/' + newTask.id).update(newTask);
  }

  getAll(): firebase.Promise<any> {
    let uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('tasks/' + uid).once('value').then(function(snapshot) {
      let object = snapshot.val();
      return Object.keys(object).map(key => object[key]);
    });
  }

  saveAll(tasks: Array<Task>): firebase.Promise<any> {
    let uid = firebase.auth().currentUser.uid;
    let tasksObject = tasks.reduce((result, item: Task) => {
      result[item.id] = item;
      return result;
    }, {});
    return firebase.database().ref('tasks/' + uid).update(tasksObject);
  }
}
