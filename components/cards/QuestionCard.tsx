import Link from 'next/link';
import React from 'react'
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
    username: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={
            <span className="flex items-center">
           {['user_2mWKGv1qqkFoVZiERSgQYsSom2B', 'user_2mZ9MjK0ARsTPzJZUyEC0MWzmf4','user_2mbIauEsU875Pp50WflTE8icx1n'].includes(author.clerkId) ? (
                <>
                  {author.name}
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
                </>
              ) : (
                author.name // Just show the name if the condition is not met
              )}
            </span>
          }
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/star-line.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title="Star"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/network.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Impressions"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>

    </div>
  )
}

export default QuestionCard
