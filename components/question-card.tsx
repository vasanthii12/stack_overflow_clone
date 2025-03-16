import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface QuestionCardProps {
  question: {
    id: number
    title: string
    tags: string[]
    votes: number
    answers: number
  }
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Link href={`/question/${question.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
        {question.title}
      </Link>
      <div className="mt-2 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <span>{question.votes} votes</span>
        <span className="mx-2">•</span>
        <span>{question.answers} answers</span>
      </div>
    </div>
  )
}

