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
  todos: Checklist[] = [];

  constructor(private service: DatenightService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.todos = this.service.getTasks()
  }

  addTask(form: NgForm) {
    this.service.addTask(form);
    this.getTasks();
  }

  deleteTask(index: number) {
    this.service.deleteTask(index);
    this.getTasks();
  }

  updateTask(index: number) {
    this.service.updateTask(index);
    this.getTasks();
  }

}
