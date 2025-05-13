import { CtaType } from '../objects/cta-type'
import { DefaultImageType } from '../objects/default-img-type'

export type ResourceType = {
  _id: string
  _createdAt: Date
  _updatedAt: Date
  title: string
  description: string
  lock: boolean
  category: 'quiz' | 'document'
  image: DefaultImageType
  cta: CtaType
}