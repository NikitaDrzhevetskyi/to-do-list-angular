import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
})
export class ToDoComponent implements OnInit {
  Title: string = 'To Do List Application';

  tasks: string[] = [];
  newTask: string = '';
  isAvalible: boolean = false;

  // Observable
  tasksObservable!: Observable<string[]>; 
  private tasksSubject: Subject<string[]> = new Subject<string[]>();

  ngOnInit() {
    this.tasksObservable = this.tasksSubject.asObservable();
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask);
      this.newTask = '';
      this.isAvalible = true;
      this.tasksSubject.next(this.tasks);
    }
  }

  RemoveTask(index: number) {
    this.tasks.splice(index, 1);
    this.isAvalible = this.tasks.length > 0;
    this.tasksSubject.next(this.tasks);
  }

  EditTask(index: number, newtaskEdit: string): string | void {
    const trimmedTask = newtaskEdit.trim();
    if (trimmedTask !== '') {
      this.tasks[index] = trimmedTask;
    } else {
      newtaskEdit = this.tasks[index];
      return (this.newTask = newtaskEdit);
    }
    this.newTask = '';
    this.tasksSubject.next(this.tasks);
  }
}
