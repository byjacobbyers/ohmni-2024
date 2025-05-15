// arrays
import columnArray from './arrays/column-array-schema'

// documents
import page from './documents/page-schema'
import site from './documents/site-schema'
import navigation from './documents/navigation-schema'
import review from './documents/review-schema'
import customer from './documents/customer-schema'
import resource from './documents/resource-schema'
import form from './documents/form-schema'

// components
import sections from './components/page-builder-schema'
import seo from './components/seo-schema'
import social from './components/social-schema'
import columnBlock from './components/column-block-schema'
import reviewBlock from './components/review-block-schema'
import ctaBlock from './components/cta-block-schema'
import priceBlock from './components/price-block-schema'
import textBlock from './components/text-block-schema'
import heroBlock from './components/hero-block-schema'
import customerRef from './components/customer-ref-schema'
import formBlock from './components/form-block-schema'
import faqBlock from './components/faq-block-schema'
import videoBlock from './components/video-block-schema'
import imageBlock from './components/image-block-schema'
import galleryBlock from './components/gallery-block-schema'

// objects
import defaultImage from './objects/default-img-schema'
import defaultVideo from './objects/default-video-schema'
import cta from './objects/cta-schema'
import route from './objects/route-schema'
import column from './objects/column-schema'
import price from './objects/price-schema'
import simpleText from './objects/simple-text-schema'
import navObject from './objects/navigation-obj-schema'
import normalText from './objects/normal-text-schema'

const schemas = [
  //arrays
  columnArray,

  // documents
  page,
  site,
  navigation,
  review,
  customer,
  resource,
  form,

  // components
  sections,
  seo,
  social,
  columnBlock,
  reviewBlock,
  ctaBlock,
  priceBlock,
  textBlock,
  heroBlock,
  customerRef,
  formBlock,
  faqBlock,
  videoBlock,
  imageBlock,
  galleryBlock,

  // objects
  defaultImage,
  defaultVideo,
  cta,
  route,
  column,
  price,
  simpleText,
  navObject,
  normalText,
]

export default schemas
