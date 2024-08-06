import { LinkIcon } from '@sanity/icons'

const Navigation = S => {
	return S.listItem()
		.title('Navigation')
		.icon(LinkIcon)
		.child(
			S.documentList()
				.title('Navigation')
				.menuItems(S.documentTypeList('navigation').getMenuItems())
				.filter('_type == "navigation"')
				.defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
		)
}

export default Navigation
