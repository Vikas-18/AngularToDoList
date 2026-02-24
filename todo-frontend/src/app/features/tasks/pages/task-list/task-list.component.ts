import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
  hasCompletedTasks(): boolean {
    return this.tasks.some((t) => t.completed);
  }
  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(title: string, description: string) {
    if (!title.trim()) return;

    const newTask: Task = {
      title,
      description,
      completed: false,
    };

    this.taskService.createTask(newTask).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleComplete(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };

    this.taskService
      .updateTask(task.id!, updatedTask)
      .subscribe(() => this.loadTasks());
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
