import { Component } from '@angular/core';
import { ModalController, ToastController, LoadingController } from 'ionic-angular';

import { Task } from '../shared/task';
import { TaskFirebaseService } from './task-firebase.service';
import { TaskPage } from '../task/add-task';

@Component({
  selector: 'todo-sol',
  templateUrl: 'todo.html'
})
export class TodoPage {

  tasks: Array<Task>;

  constructor(private taskService: TaskFirebaseService, private modalCtrl: ModalController,
      private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
		  
    this.tasks = new Array<Task>();
  }

  ionViewDidEnter() {
	let loading = this.loadingCtrl.create({
	  content: 'Loading',
	  spinner: 'crescent',
	  showBackdrop: false
	});
	loading.present();
    this.taskService.getAll()
      .then(tasks => {
        if (tasks) {
          this.tasks = tasks;
        }
        console.log('get all success');
		loading.dismiss();
      })
      .catch(err => {
        console.error('get all error');
		loading.dismiss();
      });
  }

  showAddTask() {
    let addTaskModal = this.modalCtrl.create(TaskPage);
    addTaskModal.onDidDismiss(taskToAdd => {
      console.log('onDidDismiss');
      if (taskToAdd) {
        let newTask = new Task(taskToAdd);
        this.taskService.add(newTask)
          .then(data => {
            this.tasks.push(newTask);
            console.log('add success');
          })
          .catch(err => {
            console.error('add error');
          });
      }
    });
    addTaskModal.present();
  }

  checkTask(taskToUpdate: Task) {
    taskToUpdate.isDone = !taskToUpdate.isDone;
  }

  saveChanges() {
    this.taskService.saveAll(this.tasks)
      .then(data => {
        let toastSuccess = this.toastCtrl.create({
          message: 'Save Success',
          duration: 2000
        });
        toastSuccess.present();
        console.log('save success');
      })
      .catch(err => {
        console.error('save error');
      });
  }
}
