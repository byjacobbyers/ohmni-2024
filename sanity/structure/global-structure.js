

import {
	EarthAmericasIcon,
	ControlsIcon,
} from '@sanity/icons'

const Global = (S, context) => {
	return S.listItem()
		.title('Global')
		.icon(EarthAmericasIcon)
		.child(
			S.list()
				.title('Global')
				.items([
					S.documentTypeListItem('site')
						.title('Site Config')
						.icon(ControlsIcon)
						.child(S.editor().id('site').schemaType('site').documentId('site')),
				]),
		)
}

export default Global
