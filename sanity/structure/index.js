

import Global from './global-structure'
import Navigation from './navigation-structure'
import Page from './page-structure'
import Review from './review-structure'
import Customer from './customer-structure'

export const deskStructure = (S, context) => {
	return S.list()
		.title('Content')
		.items([
			Page(S),
			Review(S),
			Customer(S),
			Global(S, context),
			Navigation(S),
		])
}
