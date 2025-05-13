"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { ResourceType } from "@/types/documents/resource-type"
import ResourceCard from "@/components/resource-card"

interface ResourceBlockProps {
  resources: ResourceType[]
}

const ResourceBlock: React.FC<ResourceBlockProps> = ({ resources }) => {
  return (
    <section className="w-full flex flex-col justify-center px-5">
      <div className="container">
        {resources && resources.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {resources.map((resource: ResourceType, index) => (
              <motion.div
                key={`resource-${index}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  type: "spring",
                  duration: 1,
                }}
              >
                <ResourceCard resource={resource} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-16">
            <h3 className="text-xl font-medium text-muted-foreground">No resources available</h3>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourceBlock
