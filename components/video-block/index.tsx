'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { VideoBlockType } from "@/types/components/video-block-type"

// Components



const VideoBlock: React.FC<VideoBlockType> = ({
  active,
  componentIndex,
  anchor,
  video,
}) => {

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'video-block-' + componentIndex}`}
        className={`w-full ${componentIndex !== 0 && 'pt-16 lg:pt-24 xl:pt-36'} flex flex-col items-center`}
      >
        {video && (
          <motion.div 
            className='w-full max-w-6xl pb-16 lg:pb-24 xl:pb-36 px-5 lg:px-12'
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
            <video src={video.asset.url} preload='auto' controls={true} />
          </motion.div>
        )}
      </section>
    )
  }

  return null
}

export default VideoBlock