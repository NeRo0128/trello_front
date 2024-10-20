import Navbar from '@/components/Navbar';
import NotesSection from '@/components/NotesSection';
import TasksSection from '@/components/TasksSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <NotesSection />
        <TasksSection />
      </main>
    </div>
  );
}