'use client'

// Tools
import { motion } from "framer-motion"
import MuxPlayer from '@mux/mux-player-react'


// Types
import { HeroBlockType } from "@/types/components/hero-block-type"

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"


const HeroBlock: React.FC<HeroBlockType> = ({
  active,
  componentIndex,
  content,
  anchor,
  video,
  cta
}) => {

  if (active) {
    return (
      <section 
        id={`${anchor ? anchor : 'hero-block-' + componentIndex}`}
        className='hero-block w-full px-5'
      >
        <div className='container flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row w-full gap-x-24'>
          <motion.div 
            className="w-full md:w-2/3 space-y-5 2xl:space-y-10"
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
            {cta && cta.active && (
              <motion.div 
                className='flex justify-center md:justify-start'
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
                    <Button className={`${cta.plausibleEvent ? `plausible-event-name=${cta.plausibleEvent}` : ''}`}>
                      {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                    </Button>
                  </motion.div>
                </Route>
              </motion.div>
            )}
          </motion.div>
          <motion.div 
            className="w-full aspect-lottie md:w-1/3  mt-0 md:mt-24"
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
            {video && video?.asset.playbackId && (
              <MuxPlayer
                key={video?.asset.playbackId}
                streamType='on-demand'
                playbackId={video?.asset.playbackId}
                autoPlay={true}
                muted
                loop={false}
                className={`h-auto w-full hide-controls`}
              />
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}

export default HeroBlock