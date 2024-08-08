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
  lastComponent,
  anchor,
  titles,
  reviews
}) => {
  const [index, setIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [])

  useEffect(() => {
    if (titles) {
      const id = setInterval(() => {
        setIndex((state) => {
          if (state >= titles.length - 1) return 0;
          return state + 1;
        });
      }, 2000);
      return () => clearInterval(id);
    }
  }, [titles]);

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'review-block-' + componentIndex}`}
        className={`w-full ${componentIndex !== 0 && 'pt-16 lg:pt-24 xl:pt-36'} flex flex-col items-center`}
      >
        <div className='flex flex-col gap-y-24 text-center items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl pb-16 lg:pb-24 xl:pb-36 px-5 lg:px-12 content'>
          <div className='w-full relative flex justify-center pb-16 px-5'>
            <AnimatePresence mode='wait'>
              {titles && titles.length > 0 && (
                <motion.div 
                  className='titles w-full text-center'
                  key={index}  // Ensure unique key for each title
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ ease: "easeInOut" }}
                  style={{ position: "absolute" }}
                >
                  <h2 className='text-4xl lg:text-5xl xl:text-6xl font-bold'>{titles[index]}</h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className='flex flex-wrap gap-y-16 w-full justify-center xl:justify-between'>
            {reviews && reviews.map((review, index) => {
              return (
                <motion.div 
                  key={`review-${index}`} 
                  className='review text-balance lg:max-w-sm 2xl:max-w-md'
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
                  <div className='w-full h-full xl:max-w-sm 2xl:max-w-md flex flex-col items-center  justify-between gap-y-10'>
                    <div className='review-title w-full flex flex-col items-center gap-y-10'>
                      <div className='space-y-3'>
                        {review?.image?.asset.url && (
                          <Avatar>
                            <AvatarImage src={review?.image?.asset.url} alt={review?.name} />
                            <AvatarFallback>{review?.name}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className='flex gap-x-1 text-[#8f80c6]'>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                        </div>
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
        {componentIndex !== lastComponent && (
          <motion.div 
            className='w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl rounded-full h-1 bg-gradient-to-r from-[#53546d] to-indigo-950' 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }} 
            transition={{ delay: 0.25 }}
          />
        )}
      </section>
    )
  }

  return null
}

export default ReviewBlock
