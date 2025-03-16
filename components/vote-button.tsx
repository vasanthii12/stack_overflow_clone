"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoteButtonProps {
  votes: number
}

export default function VoteButton({ votes: initialVotes }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes)

  const handleUpvote = () => {
    setVotes(votes + 1)
  }

  const handleDownvote = () => {
    setVotes(votes - 1)
  }

  return (
    <div className="flex flex-col items-center">
      <Button variant="ghost" size="icon" onClick={handleUpvote}>
        <ChevronUp className="h-4 w-4" />
      </Button>
      <span className="text-lg font-semibold">{votes}</span>
      <Button variant="ghost" size="icon" onClick={handleDownvote}>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}

