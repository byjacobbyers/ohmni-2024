

import {
	EarthAmericasIcon,
	ControlsIcon,
  ClipboardIcon,
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
          S.documentTypeListItem('form')
						.title('Forms')
						.icon(ClipboardIcon)
						.child(
							S.documentList()
								.title('Forms')
								.menuItems(S.documentTypeList('form').getMenuItems())
								.filter('_type == "form"')
								.defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
						),
				]),
		)
}

export default Global
