"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from 'react-markdown';

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters." })
    .max(100, { message: "Title must be less than 100 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." })
    .max(500, { message: "Description must be less than 500 characters." }),
  tags: z.string().min(1, { message: "At least one tag is required." }),
})

export default function AskQuestionPage() {
  const router = useRouter()
  const [aiAnswer, setAiAnswer] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('aiAnswer state changed:', aiAnswer);
  }, [aiAnswer])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    setAiAnswer(null)

    try {
      console.log('Submitting values:', values);

      const aiResponse = await fetch("/api/ai-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          tags: values.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      console.log('AI Response Status:', aiResponse.status);
      console.log('AI Response Headers:', Object.fromEntries(aiResponse.headers));

      // Improved error handling
      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('AI Answer Error:', errorText);
        setError(`Failed to get AI answer: ${errorText}`);
        setIsSubmitting(false);
        return;
      }

      const aiResponseData = await aiResponse.json();
      console.log('Full AI Response Data:', aiResponseData);
      
      // Explicitly log the answer
      console.log('AI Answer:', aiResponseData.answer);
      
      // Force update of aiAnswer state
      const answerToSet = aiResponseData.answer || 'No answer received';
      console.log('Setting aiAnswer to:', answerToSet);
      setAiAnswer(answerToSet);

      // Here you would typically send the data to your backend
      console.log({ ...values, aiAnswer: answerToSet })

      // Remove the redirection
      setIsSubmitting(false)
    } catch (err) {
      console.error('Submission Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. How do I center a div using Flexbox?" {...field} />
                </FormControl>
                <FormDescription>Be specific and imagine you're asking a question to another person.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide more details about your question..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include all the information someone would need to answer your question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. javascript,react,css" {...field} />
                </FormControl>
                <FormDescription>
                  Add up to 5 tags to describe what your question is about. Separate tags with commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Question"}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      {/* Force display of aiAnswer with debug information */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">AI Answer Debug:</h3>
        <pre className="bg-gray-100 p-2 rounded">
          Current aiAnswer state: {JSON.stringify(aiAnswer, null, 2)}
        </pre>
      </div>

      {aiAnswer && (
        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">AI-Generated Answer:</h3>
          <div className="prose max-w-none">
            <ReactMarkdown>{aiAnswer}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}
