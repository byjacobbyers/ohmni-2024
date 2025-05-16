"use client"

import type React from "react"
import {
  FileText,
  ClipboardCheck,
  Lock,
  Video,
  Podcast,
  Calendar,
  AppWindow,
  Wrench
} from 'lucide-react'
import { motion } from "framer-motion"

// Types
import type { ResourceType } from "@/types/documents/resource-type"

// Components
import SanityImage from "@/components/sanity-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Route from "@/components/route"
import SimpleText from "@/components/simple-text"

interface ResourceCardProps {
  resource: ResourceType
  componentIndex?: number
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, componentIndex = 0 }) => {
  const { title, description, lock, image, category, cta } = resource

  const getCategoryIcon = () => {
    switch (category) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "quiz":
        return <ClipboardCheck className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "podcast":
        return <Podcast className="h-5 w-5" />
      case "webinar":
        return <Calendar className="h-5 w-5" />
      case "app":
        return <AppWindow className="h-5 w-5" />
      case "tool":
        return <Wrench className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Card className="group border-2 border-black h-full flex flex-col overflow-hidden hover:shadow-md transition-all duration-300">
      {image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden border-b-2 border-black">
          <SanityImage
            source={image}
            alt={image.alt}
            width={600}
            height={338}
            componentIndex={1}
            className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1.5">
                {getCategoryIcon()}
                <span className="capitalize">{category}</span>
              </span>
            </div>
          )}
          {lock && (
            <div className="absolute top-3 right-3">
              <span className="bg-background/90 backdrop-blur-sm p-2 rounded-full flex items-center justify-center">
                <Lock className="h-4 w-4" />
              </span>
            </div>
          )}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-heading">{title}</CardTitle>
        {description && <CardDescription className="mt-2 text-black text-lg"><SimpleText content={description} /></CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter>
        {cta && cta.active && (
          <motion.div 
            className="flex justify-center w-full"
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
            <Route data={cta.route} className="flex w-full">
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
                className="flex w-full"
              >
                <Button 
                  className={`w-full bg-teal hover:bg-teal/90 text-teal-foreground ${cta.plausibleEvent ? `plausible-event-name=${cta.plausibleEvent}` : ''}`}
                >
                  {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                </Button>
              </motion.div>
            </Route>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  )
}

export default ResourceCard
