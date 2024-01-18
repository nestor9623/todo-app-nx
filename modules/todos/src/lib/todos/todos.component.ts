import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'prueba-bi-todos',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoListComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {}
