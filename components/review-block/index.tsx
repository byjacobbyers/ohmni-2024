'use client'

// Tools
import { ReviewBlockType } from "@/types/components/review-block-type"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from 'react-device-detect';

// Components
import SimpleText from "@/components/simple-text"
import { AiFillStar } from "react-icons/ai";

const ReviewBlock: React.FC<ReviewBlockType> = ({
  active,
  componentIndex,
  anchor,
  title,
  reviews
}) => {
  const [index, setIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [])

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'review-block-' + componentIndex}`}
        className={`review-block w-full flex flex-col items-center px-5`}
      >
        <div className='container flex flex-col text-center gap-y-10'>
          <div className='w-full relative flex justify-center'>
            <h2 className='text-3xl max-w-6xl'>{title}</h2>
          </div>
          <div className='flex flex-wrap gap-16 w-full justify-center'>
            {reviews && reviews.map((review, index) => {
              return (
                <motion.div 
                  key={`review-${index}`} 
                  className='review text-balance w-full max-w-2xl  p-5 bg-white border-2 border-black'
                  initial={{ 
                    opacity: 0,
                    scale: 0.95
                  }}
                  whileInView={{ 
                    opacity: 1,
                    scale: 1
                  }}
                  viewport={{ once: true }} 
                  transition={{ 
                    delay: !isMobileView ? 0+index*0.5 : 0,
                    type: 'spring',
                    duration: 1.5
                  }}  
                >
                  <div className='w-full flex flex-col items-center  justify-center gap-y-10'>
                    <div className='review-title w-full flex flex-col items-center gap-y-5'>
                      <div className='space-y-3'>
                        {review?.image?.asset.url && (
                          <Avatar>
                            <AvatarImage src={review?.image?.asset.url} alt={review?.name} />
                            <AvatarFallback>{review?.name}</AvatarFallback>
                          </Avatar>
                        )}
                        {/* <div className='flex gap-x-1 text-[#8f80c6]'>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                        </div> */}
                      </div>
                      {review?.content && (
                        <div className='2xl:text-lg space-y-2'>
                          <SimpleText content={review?.content} />
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col text-center'>
                      {review?.name && (<h3 className='2xl:text-2xl font-bold'>{review?.name}</h3>)}
                      {review?.title && (<p className='2xl:text-lg'>{review?.title}</p>)}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return null
}

export default ReviewBlock
