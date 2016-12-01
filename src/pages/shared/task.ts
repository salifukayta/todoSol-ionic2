
export class Task {

  id: string;
  title: string;
  isDone: boolean;

  constructor(title: string) {
    this.title = title;
    this.isDone = false;
  }
}
