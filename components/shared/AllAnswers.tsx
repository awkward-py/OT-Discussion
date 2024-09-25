import React from 'react'
import Filter from './Filter';
import { AnswerFilters } from '@/constants/filters';
import { getAnswers } from '@/lib/actions/answer.action';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import ParseHTML from './ParseHTML';
import Votes from './Votes';
import Pagination from './Pagination';

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;


}


const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: Props) => {

  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  })

  return (
    <div className="mt-11">
      <div className='flex items-center justify-between'>
        <h3 className='primary-text-gradient'>{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className='light-border border-b py-10'>
              <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link href={`/profile/${answer.author.clerkId}`} className="flex flex-1 items-start gap-1 sm:items-center">
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5  w-[18px] h-[18px]  overflow-hidden"
                  />


                 <div className="flex flex-col sm:flex-row sm:items-center">
  {answer.author.clerkId === "user_2mWKGv1qqkFoVZiERSgQYsSom2B"  ? (
    <p className="body-semibold text-dark300_light700 flex items-center">
      Pankaj Rawat 
      <svg
        aria-label="Verified"
        fill="rgb(0, 149, 246)"
        height="14"
        role="img"
        viewBox="0 0 40 40"
        width="14"
        className="ml-1" // Added margin-left for spacing
      >
        <title>IT-Verified</title>
        <path
          d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
          fillRule="evenodd"
        ></path>
      </svg>
    </p>
  ) : (
    <p className="body-semibold text-dark300_light700">
      {answer.author.name} {/* Display the author's name */}
    </p>
  )}

  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 max-w-xs">
    answered {getTimestamp(answer.createdAt)} {/* Adjust timestamp formatting */}
  </p>
</div>
                </Link>
                <div className="flex justify-end text-dark300_light700">
                  <Votes 
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>

            </div>
              <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <Pagination 
          pageNumber={page ? +page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </div>
  )
}

export default AllAnswers
