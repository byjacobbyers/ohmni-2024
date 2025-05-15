'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { GalleryBlockType } from "@/types/components/gallery-block-type"

// Components
import SimpleText from "@/components/simple-text"
import SanityImage from "@/components/sanity-image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const GalleryBlock: React.FC<GalleryBlockType> = ({
  active,
  componentIndex,
  anchor,
  images,
  fullScreen,
  content,
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "gallery-block-" + componentIndex}`}
      className={`gallery-block w-full ${fullScreen ? "relative" : "px-5"}`}
    >
      {fullScreen ? (
        // Full-Screen Layout with Carousel
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
          <Carousel
            opts={{
              align: "start",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <CarouselContent>
              {images?.map((image, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <SanityImage
                    source={image}
                    alt={image?.alt || `Gallery image ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="z-50 left-10" />
            <CarouselNext className="z-50 right-10" />
          </Carousel>
        </div>
      ) : (
        // Regular Layout with Carousel
        <div className="container flex flex-col items-center justify-center py-16 lg:py-24">
          <motion.div
            className="w-full max-w-6xl"
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
            <Carousel
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {images?.map((image, index) => (
                  <CarouselItem key={index} className="w-full">
                    <SanityImage
                      source={image}
                      alt={image?.alt || `Gallery image ${index + 1}`}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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

export default GalleryBlock