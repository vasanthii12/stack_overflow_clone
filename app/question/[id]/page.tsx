import { Badge } from "@/components/ui/badge"
import AnswerCard from "@/components/answer-card"
import VoteButton from "@/components/vote-button"

export default function QuestionPage({ params }: { params: { id: string } }) {
  // Mock data for the question and answers
  const question = {
    id: Number.parseInt(params.id),
    title: "How to center a div?",
    content:
      "I'm trying to center a div horizontally and vertically within its parent container. What's the best way to do this using CSS?",
    tags: ["css", "html"],
    votes: 10,
    aiAnswer:
      "To center a div both horizontally and vertically within its parent container, you can use CSS Flexbox. Here's how:\n\n1. Set the parent container to use flexbox:\n   ```css\n   .parent {\n     display: flex;\n     justify-content: center;\n     align-items: center;\n     height: 100vh; /* Adjust as needed */\n   }\n   ```\n\n2. The child div will automatically be centered:\n   ```css\n   .child {\n     /* No additional CSS needed for centering */\n   }\n   ```\n\nThis method works well for most scenarios and is widely supported in modern browsers.",
    answers: [
      { id: 1, content: "You can use flexbox to center a div both horizontally and vertically.", votes: 5 },
      { id: 2, content: "Another approach is to use CSS Grid for centering.", votes: 3 },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <VoteButton votes={question.votes} />
          <div className="flex-grow">
            <p className="text-gray-700">{question.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      {question.aiAnswer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">AI-Generated Answer</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{question.aiAnswer}</p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Answers ({question.answers.length})</h2>
      <div className="space-y-6">
        {question.answers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  )
}

