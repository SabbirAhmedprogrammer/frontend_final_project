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

  }

  addTask(form: NgForm) {
    let newTask: Checklist = { task: form.value.task, completed: false };
    this.todos.push(newTask);
    form.reset();
  }

  deleteTask(index: number) {
    this.todos.splice(index, 1)
  }

  updateTask(index: number) {
    this.todos[index].completed = true;
  }

}
