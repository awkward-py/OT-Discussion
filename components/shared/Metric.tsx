import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react'



interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number | ReactNode; 
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
 
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,

}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={` ${href ? 'rounded-full object-cover w-[16px] h-[16px] overflow-hidden ' : ''}`}
      />

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        <span className={`small-regular line-clamp-1 ${isAuthor ?'max-sm:hidden' : ''}`}>
          {title}
        </span>
      </p>
    </>
  )

  if(href) {
    return (
      <Link href={href} className="flex-center  gap-1">
        {metricContent}
      </Link>
    )
  }

  return (
    <div className="flex-center flex-wrap gap-1">
      {metricContent}
    </div>
  )
}

export default Metric