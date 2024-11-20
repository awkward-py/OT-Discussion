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
                 <p className="body-semibold text-dark300_light700 flex items-center">
  {answer.author.name}

{["user_2msC45rbo2Xcfzx3Qs5aa5Z9UOe", "user_2n5xdgqdECnSabJtgQjgvyWL2Ch"].includes(answer.author.clerkId) && (
 
 <svg viewBox="-2 2 22 22" width="17" height="17" aria-label="Verified account" role="img"  data-testid="icon-verified"><g><linearGradient gradientUnits="userSpaceOnUse" id="12-a" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"></stop><stop offset=".539" stop-color="#cd8105"></stop><stop offset=".68" stop-color="#cb7b00"></stop><stop offset="1" stop-color="#f4ec26"></stop><stop offset="1" stop-color="#f4e72a"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="12-b" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"></stop><stop offset=".406" stop-color="#e2b719"></stop><stop offset=".989" stop-color="#e2b719"></stop></linearGradient><g clip-rule="evenodd" fill-rule="evenodd"><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#12-a)"></path><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#12-b)"></path><path d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z" fill="#d18800"></path></g></g></svg>
)}

{["user_2mnrfhoM9HBMIi3aN3HAscS2mvI" ,  "user_2mZDAsYeSh6weP5IoPoJalgbr8s", "user_2mq8dxfCaSckEyismGK4OWWprvi", "user_2mbIauEsU875Pp50WflTE8icx1n", "user_2mZ9MjK0ARsTPzJZUyEC0MWzmf4"].includes(answer.author.clerkId) && (
  <svg
    aria-label="Verified"
    fill="rgb(0, 149, 246)"
    height="14"
    role="img"
    viewBox="0 0 40 40"
    width="14"
    className="ml-1"
  >
    <title>IT-Verified</title>
    <path
      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
      fillRule="evenodd"
    />
  </svg>
)}


</p>


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
