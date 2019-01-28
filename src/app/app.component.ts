import { Component } from '@angular/core';

import { TodoInteractor } from "clean-architecture-todo/dist/interactors/todoInteractor";
import { TodoLocalStorageApi } from "clean-architecture-todo/dist/framework/todoLocalStorageApi";
import { TodoList } from 'clean-architecture-todo/dist/entities/todoList';
import * as Todo from 'clean-architecture-todo/dist/entities/todo';

const todoInteractor = new TodoInteractor(new TodoLocalStorageApi());

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private todoList: TodoList;
  private todoTitle: string;

  constructor() {
    this.loadTodos();
  }
  title = 'clean-architecture-todo-angular';

  async loadTodos() {
    this.todoList = await todoInteractor.getTodoList();
  }

  async addTodo() {
    this.todoList = await todoInteractor.addTodo(this.todoList, this.todoTitle);
  }

  async toggleTodo(todo: Todo.Todo) {
    this.todoList = await todoInteractor.toggleTodo(this.todoList, todo);
  }
}
