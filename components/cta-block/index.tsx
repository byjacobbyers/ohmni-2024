'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { CtaBlockType } from '@/types/components/cta-block-type'

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"


const CtaBlock: React.FC<CtaBlockType> = ({
  active,
  componentIndex,
  anchor,
  content,
  cta
}) => {

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'cta-block-' + componentIndex}`}
        className={`w-full ${componentIndex !== 0 && 'pt-16 lg:pt-24 xl:pt-36'} flex flex-col items-center`}
      >
        <div className='flex flex-col text-center items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl pb-16 lg:pb-24 xl:pb-36 px-5 lg:px-12'>
          {content && (
            <motion.div 
              className='prose max-w-none'
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
          {cta && cta.active && (
            <motion.div 
              className='mt-5 flex justify-center md:justify-start'
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
              <Route data={cta.route} className='flex'>
                <motion.div
                  initial={{ 
                    scale: 1
                  }}
                  whileHover={{ 
                    scale: 1.05
                  }}
                  whileTap={{ 
                    scale: 0.95
                  }}
                  transition={{ 
                    type: 'spring',
                    duration: 0.5
                  }}
                  className='flex w-full'
                >
                  <Button variant='default' size='lg'>
                    {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                  </Button>
                </motion.div>
              </Route>
            </motion.div>
          )}
        </div>
      </section>
    )
  }

  return null
}

export default CtaBlock