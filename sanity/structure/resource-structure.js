import { BookIcon } from '@sanity/icons'

const Resource = S => {
    return S.listItem()
        .title('Resources')
        .icon(BookIcon)
        .child(
            S.documentList()
                .title('Resources')
                .menuItems(S.documentTypeList('resource').getMenuItems())
                .filter('_type == "resource"')
                .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
        )
}

export default Resource