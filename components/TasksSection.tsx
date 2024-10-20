"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Task {
  id: number;
  text: string;
  dueDate: string;
  completed: boolean;
}

export default function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Complete project proposal", dueDate: "2023-07-15", completed: false },
    { id: 2, text: "Review team presentations", dueDate: "2023-07-10", completed: true },
    { id: 3, text: "Schedule client meeting", dueDate: "2023-07-20", completed: false },
    { id: 4, text: "Update website content", dueDate: "2023-07-05", completed: false },
  ])
  const [newTask, setNewTask] = useState({ text: '', dueDate: '' })

  const addTask = () => {
    if (newTask.text && newTask.dueDate) {
      setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }])
      setNewTask({ text: '', dueDate: '' })
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }
    return a.completed ? 1 : -1
  })

  return (
    <div className="w-full md:w-1/4 bg-secondary/20 p-4 rounded-lg border border-secondary">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new task</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Task"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              className="mb-4"
            />
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="mb-4"
            />
            <Button onClick={addTask}>Add Task</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={cn(
                task.completed && "line-through text-muted-foreground",
                new Date(task.dueDate) < new Date() && !task.completed && "text-destructive"
              )}>
                {task.text} - {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}