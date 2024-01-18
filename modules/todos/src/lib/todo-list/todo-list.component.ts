import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../interfaces/itodo';
import { v4 as uuidv4 } from 'uuid';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { sortBy as _sortBy, isNil as _isNil, isEmpty as _isEmpty } from 'lodash';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
@Component({
  selector: 'prueba-bi-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, ReactiveFormsModule ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  filteredTodos: ITodo[] = [];
  countTodosActive: number = 0;
  selActive = false;
  selAll = false;
  selCompleted = false;
  form: FormGroup = new FormGroup({
    textToSearch: new FormControl('')
  });
  submitted = false;

  @ViewChild('inputTask') inputTask: ElementRef = new ElementRef({});

  constructor(private formBuilder: FormBuilder) {
    const valoresObtenidos = this.getListTodoSessionStorage();
    if (valoresObtenidos) {
      this.todos = valoresObtenidos;
      this.filteredTodos = [...this.todos];
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        textToSearch: ['', Validators.required]
      }
    );
  }

  onSubmit(todo: FormGroup){
    console.log('agregando', todo);
  }
  addItemTodo(form: FormGroup) {
    this.submitted = true;
    const valueForm = form.value;
    console.log('form', form);
    if (!_isNil(valueForm.textToSearch) && !_isEmpty(valueForm.textToSearch)){
      this.todos.push({
        uid: uuidv4(),
        task: valueForm.textToSearch,
        completed: false
      })
  
      this.filteredTodos = [...this.todos];
      this.updateListTodoSessionStorage(this.todos);
      this.form.reset();
      this.inputTask.nativeElement.focus()
      this.sortElements();
    }
  }

  onRemoveTodo(uid: string) {
    this.todos = this.todos.filter(item => item.uid != uid);
    this.filteredTodos = [...this.todos];
    this.updateListTodoSessionStorage(this.todos);
    this.sortElements();
  }

  onCheckTodo(todo: ITodo) {
    this.todos = this.todos.map((item: ITodo) => {
      return { ...item, completed: item.uid === todo.uid ? todo.completed : item.completed }
    })

    this.countTodosActive = this.todos.filter(item => item.completed)?.length;
    this.filteredTodos = [...this.todos];
    this.updateListTodoSessionStorage(this.todos);
    this.sortElements();
  }

  viewAll(event: MouseEvent) {
    event.preventDefault();
    this.selAll = true;
    this.selActive = false;
    this.selCompleted = false;

    this.filteredTodos = [...this.todos];
  }

  viewActive(event: MouseEvent) {
    event.preventDefault();
    this.selAll = false;
    this.selActive = true;
    this.selCompleted = false;
    this.filteredTodos = this.todos.filter(item => item.completed == false);
  }

  viewCompleted(event: MouseEvent) {
    event.preventDefault();
    this.selAll = false;
    this.selActive = false;
    this.selCompleted = true;
    this.filteredTodos = this.todos.filter(item => item.completed == true);
  }

  clearCompleted(event: MouseEvent) {
    event.preventDefault();
    this.selAll = false;
    this.selActive = false;
    this.selCompleted = false;
    this.todos = this.todos.filter(item => item.completed == false)
    this.filteredTodos = [...this.todos];
    this.countTodosActive = 0;
    this.updateListTodoSessionStorage(this.todos);
    this.sortElements();
  }

  onUpdateTodo(todo: ITodo) {
    const index = this.todos.findIndex(item => item.uid == todo.uid);
    this.todos[index] = todo;
    this.filteredTodos = [...this.todos];
    this.updateListTodoSessionStorage(this.todos);
    this.sortElements();
  }

  todosLeft() {
    return this.filteredTodos.filter(item => !item.completed)?.length;
  }

  sortElements() {
    if (this.filteredTodos.length > 0) {
      this.filteredTodos = _sortBy(this.filteredTodos, ['completed'])
    }
  }

  updateListTodoSessionStorage(value: ITodo[]) {
    const valorAGuardar = JSON.stringify(value);
    if (valorAGuardar) {
      sessionStorage.setItem('todoList', valorAGuardar);
    }
  }

  getListTodoSessionStorage() {
    if (sessionStorage.getItem('todoList')) {
      return JSON.parse(sessionStorage.getItem('todoList') || '{}');
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
