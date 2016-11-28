import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'todo-sol',
  templateUrl: 'todo.html'
})
export class TodoPage {

  tasks = [{id: 0, title: 'cleaning', isDone: true}, {id: 1, title: 'take bath', isDone: false}];

  checkTask(taskToUpdate: Task) {
    taskToUpdate.isDone = !taskToUpdate.isDone;
  }

  saveChanges() {
    console.log(this.tasks);

  }
}
