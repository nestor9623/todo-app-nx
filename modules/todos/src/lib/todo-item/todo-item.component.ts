import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../interfaces/itodo';

@Component({
  selector: 'prueba-bi-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {


  @Input() todo: ITodo = { uid: '', task: '', completed: false };
  @Output() outputRemoveTodo = new EventEmitter<string>();
  @Output() outputCheckTodo = new EventEmitter<ITodo>();
  @Output() outputTodoUpdate = new EventEmitter<ITodo>();
  @ViewChild('inputTask') inputTask: ElementRef = new ElementRef({});

  itemCheck() {
    this.todo.completed = !this.todo.completed;
    this.outputCheckTodo.emit(this.todo)
  }

  removeTodo(uid: string) {
    this.outputRemoveTodo.emit(uid);
  }

  focusOut(todo: ITodo){
    const input = this.inputTask.nativeElement;
   todo = {
    ...todo,
    task: input.value
   }
   this.outputTodoUpdate.emit(todo);
  }
}