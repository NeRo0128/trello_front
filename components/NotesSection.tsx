"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Project Ideas", content: "1. Build a task management app\n2. Create a recipe sharing platform\n3. Develop a personal finance tracker" },
    { id: 2, title: "Meeting Notes", content: "Discussed project timeline and deliverables. Next steps: finalize design by Friday." },
    { id: 3, title: "Shopping List", content: "- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee" },
  ])
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { id: Date.now(), ...newNote }])
      setNewNote({ title: '', content: '' })
    }
  }

  return (
    <div className="w-full md:w-3/4 bg-secondary/20 p-4 rounded-lg border border-secondary">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Note</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new note</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="mb-4"
            />
            <Textarea
              placeholder="Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="mb-4"
            />
            <Button onClick={addNote}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="bg-background">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 whitespace-pre-line">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}