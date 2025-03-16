import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import QuestionCard from "@/components/question-card"
import Link from "next/link"

export default function HomePage() {
  // Mock data for questions
  const questions = [
    { id: 1, title: "How to center a div?", tags: ["css", "html"], votes: 10, answers: 5 },
    {
      id: 2,
      title: "What is the difference between let and const in JavaScript?",
      tags: ["javascript"],
      votes: 15,
      answers: 8,
    },
    { id: 3, title: "How to use useEffect in React?", tags: ["react", "hooks"], votes: 20, answers: 12 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Questions</h1>
        <Button asChild>
          <Link href="/ask">Ask Question</Link>
        </Button>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Search Questions</h2>
        <div className="flex gap-2">
          <Input type="text" placeholder="Search..." className="flex-grow" />
          <Button>Search</Button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Questions</h2>
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  )
}

