

import Global from './global-structure'
import Navigation from './navigation-structure'
import Page from './page-structure'
import Review from './review-structure'
import Customer from './customer-structure'
import Resource from './resource-structure'

export const deskStructure = (S, context) => {
	return S.list()
		.title('Content')
		.items([
			Page(S),
			Review(S, context),
			Customer(S),
      Resource(S),
			Global(S, context),
			Navigation(S),
		])
}
