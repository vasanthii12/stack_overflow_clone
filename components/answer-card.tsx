import VoteButton from "./vote-button"

interface AnswerCardProps {
  answer: {
    id: number
    content: string
    votes: number
  }
}

export default function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center gap-4">
        <VoteButton votes={answer.votes} />
        <div className="flex-grow">
          <p className="text-gray-700">{answer.content}</p>
        </div>
      </div>
    </div>
  )
}

