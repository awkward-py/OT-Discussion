
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
    {['user_2mWKGv1qqkFoVZiERSgQYsSom2B', 'user_2mZ9MjK0ARsTPzJZUyEC0MWzmf4','user_2mbIauEsU875Pp50WflTE8icx1n'].includes(user.clerkId) && (
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
