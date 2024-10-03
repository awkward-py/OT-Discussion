"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { AnswerSchema } from '@/lib/validations'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/navigation'
import ReactQuill from 'react-quill' // Importing ReactQuill for rich text editing
import 'react-quill/dist/quill.snow.css'; // Importing Quill's default style

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingAI, setSetIsSubmittingAI] = useState(false);
  const editorRef = useRef(null)
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: ''
    }
  })

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setSetIsSubmittingAI(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, {
        method: 'POST',
        body: JSON.stringify({ question })
      })

      const aiAnswer = await response.json();

      // Convert plain text to HTML format
      const formattedAnswer = aiAnswer.reply.replace(/\n/g, '<br />');

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }

      // Toast...
    } catch (error) {
      console.log(error);
    } finally {
      setSetIsSubmittingAI(false);
    }
  }
  
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>

        <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={generateAIAnswer}
        >
          {isSubmittingAI ? (
            <>
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5 h-[100px]">
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    ref={editorRef}
                    placeholder="Write your detailed answer here..."
                    className="react-quill-editor"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "code-block"],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ align: [] }],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                      "code-block",
                      "indent",
                      "align",
                    ]}
               
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-10 sm:mt-5">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer
