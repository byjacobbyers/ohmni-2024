'use client'

// Tools
import { motion } from "framer-motion"
import MuxPlayer from "@mux/mux-player-react"

// Types
import { VideoBlockType } from "@/types/components/videio-block-type"

// Components
import SimpleText from "@/components/simple-text"

const VideoBlock: React.FC<VideoBlockType> = ({
  active,
  componentIndex,
  anchor,
  video,
  fullScreen,
  autoPlay,
  loop,
  hideControls,
  content,
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "video-block-" + componentIndex}`}
      className={`video-block w-full ${fullScreen ? "relative" : "px-5"}`}
    >
      {fullScreen ? (
        // Full-Screen Layout
        <div className="relative w-full h-[calc(100vh-178px)] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              className="text-white text-center max-w-4xl px-5"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: "spring",
                duration: 1.5,
              }}
            >
              {content && <SimpleText content={content} />}
            </motion.div>
          </div>
          {video?.asset.playbackId && (
            <MuxPlayer
              key={video.asset.playbackId}
              streamType="on-demand"
              playbackId={video.asset.playbackId}
              autoPlay={autoPlay}
              muted
              loop={loop}
              className={`absolute inset-0 w-full h-full object-cover ${hideControls && 'hide-controls'}`}
            />
          )}
        </div>
      ) : (
        // Regular Layout
        <div className="container flex flex-col items-center justify-center">
          <motion.div
            className="w-full aspect-video max-w-4xl"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: "spring",
              duration: 1.5,
            }}
          >
            {video?.asset.playbackId && (
              <MuxPlayer
                key={video.asset.playbackId}
                streamType="on-demand"
                playbackId={video.asset.playbackId}
                autoPlay={autoPlay}
                muted
                loop={loop}
                className={`w-full h-full object-cover ${hideControls && 'hide-controls'}`}
              />
            )}
          </motion.div>
          {content && (
            <motion.div
              className="text-center max-w-4xl mt-10"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: "spring",
                duration: 1.5,
              }}
            >
              <SimpleText content={content} />
            </motion.div>
          )}
        </div>
      )}
    </section>
  )
}

export default VideoBlock