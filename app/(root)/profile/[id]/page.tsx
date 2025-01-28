import { Button } from '@/components/ui/button'
import { getUserInfo } from '@/lib/actions/user.action'
import { URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React from 'react'
import { getJoinedDate } from '@/lib/utils'
import ProfileLink from '@/components/shared/ProfileLink'
import Stats from '@/components/shared/Stats'
import QuestionTab from '@/components/shared/QuestionTab'
import AnswersTab from '@/components/shared/AnswersTab'
import { redirect } from 'next/navigation';

const Page = async ({ params, searchParams }: URLProps) => {

   const { userId } = auth();

  if (!userId) redirect('/sign-in');
  
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id })

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={150}
            height={150}
            className="rounded-full object-cover w-[150px] h-[150px] overflow-hidden"
          />


          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900 flex items-center">

              {userInfo.user.name}
          
           {['user_2msC45rbo2Xcfzx3Qs5aa5Z9UOe', 'user_2n5xdgqdECnSabJtgQjgvyWL2Ch'].includes(userInfo.user.clerkId) && (
                <svg viewBox="-2 -1 22 22" width="17" height="17" aria-label="Verified account" role="img" data-testid="icon-verified"><g><linearGradient gradientUnits="userSpaceOnUse" id="12-a" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"></stop><stop offset=".539" stop-color="#cd8105"></stop><stop offset=".68" stop-color="#cb7b00"></stop><stop offset="1" stop-color="#f4ec26"></stop><stop offset="1" stop-color="#f4e72a"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="12-b" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"></stop><stop offset=".406" stop-color="#e2b719"></stop><stop offset=".989" stop-color="#e2b719"></stop></linearGradient><g clip-rule="evenodd" fill-rule="evenodd"><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#12-a)"></path><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#12-b)"></path><path d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z" fill="#d18800"></path></g></g></svg>

              )}
              {['user_2mnrfhoM9HBMIi3aN3HAscS2mvI', 'user_2mZ9MjK0ARsTPzJZUyEC0MWzmf4', 'user_2mZDAsYeSh6weP5IoPoJalgbr8s', 'user_2mq8dxfCaSckEyismGK4OWWprvi','user_2mbIauEsU875Pp50WflTE8icx1n' , 'user_2mxdwEQX81YYzm0dEZZOTkZAEQy'].includes(userInfo.user.clerkId) && (
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
              )}
            </h2>
            <p className="paragraph-regular text-blue-500">@{userInfo.user.username}</p>

            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-5">
                {userInfo.user.bio}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Connection"
                />
              )}

              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/stream.svg"
                  title={userInfo.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />
            </div>


          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Update Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        reputation={userInfo.reputation}
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.badgeCounts}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-5 flex w-full flex-col gap-6">
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Page
