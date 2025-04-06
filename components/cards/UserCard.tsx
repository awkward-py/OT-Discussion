
import Image from "next/image";
import Link from "next/link";


interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  }
}

const UserCard = async ({ user }: Props) => {
  

  return (
    <Link href={`/profile/${user.clerkId}`} className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image 
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full object-cover w-[140px] h-[140px] overflow-hidden"
        />

<div className="mt-4 text-center">
  <h3 className="h3-bold text-dark200_light900 line-clamp-1">
    {user.name}
     
  </h3>
  <p className="body-regular text-dark500_light500 mt-2 flex items-center justify-center"> 
    <span className="mr-1">@{user.username}</span>
   {['user_2msC45rbo2Xcfzx3Qs5aa5Z9UOe','user_2n5xdgqdECnSabJtgQjgvyWL2Ch'].includes(user.clerkId) && (
 <svg viewBox="2 -1 22 22" width="17" height="17" aria-label="Verified account" role="img"  data-testid="icon-verified"><g><linearGradient gradientUnits="userSpaceOnUse" id="12-a" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"></stop><stop offset=".539" stop-color="#cd8105"></stop><stop offset=".68" stop-color="#cb7b00"></stop><stop offset="1" stop-color="#f4ec26"></stop><stop offset="1" stop-color="#f4e72a"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="12-b" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"></stop><stop offset=".406" stop-color="#e2b719"></stop><stop offset=".989" stop-color="#e2b719"></stop></linearGradient><g clip-rule="evenodd" fill-rule="evenodd"><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#12-a)"></path><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#12-b)"></path><path d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z" fill="#d18800"></path></g></g></svg>

)}
    {['user_2mnrfhoM9HBMIi3aN3HAscS2mvI', 'user_2mZ9MjK0ARsTPzJZUyEC0MWzmf4',  'user_2mZDAsYeSh6weP5IoPoJalgbr8s', 'user_2mq8dxfCaSckEyismGK4OWWprvi', 'user_2mxdwEQX81YYzm0dEZZOTkZAEQy', 'user_2mbIauEsU875Pp50WflTE8icx1n'].includes(user.clerkId) && (
      <svg 
        aria-label="Verified" 
        fill="rgb(0, 149, 246)"
        height="14" 
        role="img" 
        viewBox="0 0 40 40" 
        width="14"
        className="inline-block" // Ensure SVG stays inline
      >
        <title>IT-Verified</title>
        <path
          d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
          fillRule="evenodd"
        ></path>
      </svg>
    )}
  </p>
</div>



      </article>
    </Link>
  )
}

export default UserCard
