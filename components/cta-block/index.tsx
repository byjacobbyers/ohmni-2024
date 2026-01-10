'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { CtaBlockType } from '@/types/components/cta-block-type'

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"

// Animations
import { scrollReveal } from "@/lib/animations"


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
       className="cta-block w-full px-5"
      >
        <motion.div 
          className='container py-16 lg:py-24 flex flex-col justify-center items-center p-5 bg-white w-full border-2 border-black min-h-24'
          initial={scrollReveal.initial}
          whileInView={scrollReveal.animate}
          viewport={scrollReveal.viewport}
          transition={scrollReveal.transition}
        >
          {content && (
            <div className='text-center max-w-4xl 2xl:max-w-6xl pb-5 md:pb-10 content'>
              <SimpleText content={content} />
            </div>
          )}
          {cta && cta.active && (
            <motion.div 
              className='flex justify-center md:justify-start'
              initial={scrollReveal.initial}
              whileInView={scrollReveal.animate}
              viewport={scrollReveal.viewport}
              transition={{ ...scrollReveal.transition, delay: 0.1 }}
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
                  <Button className={`${cta.plausibleEvent ? `plausible-event-name=${cta.plausibleEvent}` : ''}`}>
                    {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                  </Button>
                </motion.div>
              </Route>
            </motion.div>
          )}
        </motion.div>
      </section>
    )
  }

  return null
}

export default CtaBlock