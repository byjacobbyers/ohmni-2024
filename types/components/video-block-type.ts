import { DefaultVideoType } from '../objects/default-video-type'

export type VideoBlockType = {
	active: boolean
	componentIndex?: number
	anchor: string
	video: DefaultVideoType
}
