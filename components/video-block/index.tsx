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
  lastComponent,
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

export default VideoBlock