import { RocketIcon } from '@sanity/icons'

const Customer = S => {
	return S.listItem()
		.title('Customers')
		.icon(RocketIcon)
		.child(
			S.documentList()
				.title('Reviews')
				.menuItems(S.documentTypeList('customer').getMenuItems())
				.filter('_type == "customer"')
				.defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
		)
}

export default Customer
