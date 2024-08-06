import { UsersIcon } from '@sanity/icons'

const Review = S => {
	return S.listItem()
		.title('Reviews')
		.icon(UsersIcon)
		.child(
			S.documentList()
				.title('Reviews')
				.menuItems(S.documentTypeList('review').getMenuItems())
				.filter('_type == "review"')
				.defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
		)
}

export default Review
