import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTag from '@/components/shared/RenderTag';
import Votes from '@/components/shared/Votes';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { redirect } from 'next/navigation';

const Page = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();

const { userId } = auth();


  let mongoUser;

  if (!userId) redirect('/sign-in');

  mongoUser = await getUserById({ userId });

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }

  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"  >
            <Image
              src={result.author.picture}
              className="rounded-full object-cover max-sm:mt-0.5  w-[25px] h-[25px]  overflow-hidden"
              width={25}
              height={25}
              alt="profile"
            />
           <p className="paragraph-semibold text-dark300_light700 flex items-center">
  {[ 
    'user_2mZ9MjK0ARsTPzJZUyEC0MWzmf4',
    'user_2mbIauEsU875Pp50WflTE8icx1n',
              'user_2mxdwEQX81YYzm0dEZZOTkZAEQy'
  ].includes(result.author.clerkId) ? (
    <>
      {result.author.name}
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
        ></path>
      </svg>
    </>
  ) : (
    result.author.name
  )}
           
                         {['user_2msC45rbo2Xcfzx3Qs5aa5Z9UOe', 'user_2n5xdgqdECnSabJtgQjgvyWL2Ch'].includes(result.author.clerkId) && (
     
    <svg
      viewBox="-2 2 22 22"
      width="17"
      height="17"
      aria-label="Verified account"
      role="img"
      data-testid="icon-verified"
    >
      <g>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="12-a"
          x1="4.411"
          x2="18.083"
          y1="2.495"
          y2="21.508"
        >
          <stop offset="0" stopColor="#f4e72a"></stop>
          <stop offset=".539" stopColor="#cd8105"></stop>
          <stop offset=".68" stopColor="#cb7b00"></stop>
          <stop offset="1" stopColor="#f4ec26"></stop>
          <stop offset="1" stopColor="#f4e72a"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="12-b"
          x1="5.355"
          x2="16.361"
          y1="3.395"
          y2="19.133"
        >
          <stop offset="0" stopColor="#f9e87f"></stop>
          <stop offset=".406" stopColor="#e2b719"></stop>
          <stop offset=".989" stopColor="#e2b719"></stop>
        </linearGradient>
        <g clipRule="evenodd" fillRule="evenodd">
          <path
            d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"
            fill="url(#12-a)"
          ></path>
          <path
            d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"
            fill="url(#12-b)"
          ></path>
          <path
            d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z"
            fill="#d18800"
          ></path>
        </g>
      </g>
    </svg>
  )}
</p>


          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/network.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title=" Impressions"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  )
}

export default Page
