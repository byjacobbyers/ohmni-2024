'use client'

// Tools
import Link from 'next/link'
import { inter } from '../../app/(site)/fonts'
import { motion } from 'framer-motion'

// Types
import { PriceBlockType } from '@/types/components/price-block-type'


// Components
import SimpleText from '../simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"


const PriceBlock: React.FC<PriceBlockType> = ({
  active,
  componentIndex,
  anchor,
  content,
  columns,
}) => {



  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'prices-block-' + componentIndex}`}
        className={`prices-block w-full flex flex-col items-center px-5`}
      >
        <div className='container flex flex-wrap justify-center text-center'>
          {content && (
            <motion.div 
              className='prose max-w-7xl w-full'
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
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: 'spring',
                duration: 1.5
              }}
            >
              <SimpleText content={content} />
            </motion.div>
          )}
          <motion.div 
            className='flex flex-wrap lg:flex-nowrap justify-center'
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
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: 'spring',
              duration: 1.5
            }}  
          >
            {columns && columns.map((column, index) => {

              const last = index === columns.length - 1

              return (
                <div key={index} className='w-full max-w-md  px-5 md:px-16 py-5 md:py-10 first:rounded-tl-3xl md:first:rounded-bl-3xl first:rounded-tr-3xl md:first:rounded-tr-none last:rounded-tr-none md:last:rounded-tr-3xl last:rounded-br-3xl last:rounded-bl-3xl md:last:rounded-bl-none md:last:rounded-bl-0 border-[#c8a7f2]  first:border-t-2 md:border-t-2 border-b-2 first:border-r-2 md:first:border-r-0 border-l-2 last:border-r-2 md:last:border-r-2 shadow shadow-white'>
                  <div className='w-full h-full flex flex-col items-center justify-between gap-y-2'>
                    <div className='price-content'>
                      <div className='space-y-5'>
                        {column.title && (<p className={`text-3xl font-medium bg-gradient-to-b ${column.featured ? 'from-[#9c83fe]' : 'from-[#d6d5d5]'} ${column.featured ? 'to-[#f6f5f5]' : 'to-white'} text-transparent bg-clip-text`}>{column.title}</p>)}
                        {column.price && (<h2 className={`text-7xl font-semibold bg-gradient-to-b ${column.featured ? 'from-[#9c83fe]' : 'from-[#d6d5d5]'} ${column.featured ? 'to-[#f6f5f5]' : 'to-white'} ${inter.className} text-transparent bg-clip-text`}>${column.price}</h2>)}
                        {column.offer && (<p>{column.offer}</p>)}
                      </div>
                      <div className='space-y-5 mt-5'> 
                        {column.perks && column.perks.map((perk, index) => {

                          return (
                            <div key={index} className='flex gap-x-2 text-white'>
                              <div className='border border-[#8669ff] rounded-md p-1 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p>{perk}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}

export default PriceBlock