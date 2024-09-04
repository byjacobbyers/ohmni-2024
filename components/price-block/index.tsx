'use client'

// Tools
import { motion } from 'framer-motion'

// Types
import { PriceBlockType } from '@/types/components/price-block-type'

// Components
import SimpleText from '../simple-text'


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
        <div className='container flex flex-wrap justify-center text-center gap-5'>
          {content && (
            <motion.div 
              className='prose 2xl:prose-h2:text-4xl 2xl:prose-h2:leading-relaxed max-w-7xl w-full'
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
            className='flex flex-wrap lg:flex-nowrap justify-center gap-5'
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
              return (
                <div 
                  key={index} 
                  className='w-full max-w-md bg-white border-2 border-black text-black p-5 md:p-10'
                >
                  <div className='w-full h-full flex flex-col items-center justify-between gap-y-2'>
                    <div className='price-content'>
                      <div className='space-y-5'>
                        {column.title && (
                          <p className='text-2xl font-medium'>
                            {column.title}
                          </p>
                        )}
                        {column.price && (
                          <h2 className='text-4xl font-semibold'>
                            ${column.price}
                          </h2>
                        )}
                        {column.offer && (
                          <p>{column.offer}</p>
                        )}
                      </div>
                      <div className='space-y-5 mt-5 text-left'>
                        {column.perks && column.perks.map((perk, index) => (
                          <div key={index} className='flex items-start gap-x-2'>
                            <div className='border border-black rounded-md p-1 flex justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p>{perk}</p>
                          </div>
                        ))}
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
