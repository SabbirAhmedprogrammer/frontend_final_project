import { Component, OnInit } from '@angular/core';
import { DatenightService } from '../datenight.service';
import { Checklist } from '../interfaces/checklist';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  constructor(private service: DatenightService) { }
  todos: Checklist[] = [];
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.service.getTasks().subscribe(response => {
      this.todos = response;
      console.log(this.todos)
    })
  }

  addTask(form: NgForm): void {
    let todo = form.value;
    todo.completed = false
    console.log(todo);
    this.service.addTask(todo).subscribe(() => {
      this.getTasks();
      form.reset();
    });
  }

  deleteTask(id: number): void {
    console.log(id);
    this.service.deleteTask(id).subscribe(() => {
      this.getTasks();
    })
  }

  updateTask(task: Checklist): void {
    task.completed = true;
    this.service.updateTask(task.id, task).subscribe(() => {
      this.getTasks();
    })
  }
}
