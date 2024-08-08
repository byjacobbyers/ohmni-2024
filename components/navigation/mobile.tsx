'use client'

// Tools
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

// Types
import { NavigationType } from "@/types/documents/navigation-type"

// Components
import Route from "@/components/route"

interface NavProps {
  data: NavigationType,
  closeMenu: () => void
}

const MobileNav: React.FC<NavProps> = ({
  data,
  closeMenu
}) => {

  const handleItemClick = () => {
    closeMenu();
  };

  return (
    <NavigationMenu className='w-full max-w-none mobile-menu'>
      <NavigationMenuList className='w-full flex flex-col gap-y-2 space-x-0 gap-x-2 lg:gap-x-10'>
        {data.items?.map((item: any, index: number) => (
          <NavigationMenuItem 
            key={'header' + index}
            id={'header' + index}
            className="w-full"
          >
            <Route data={item} className='flex w-full'>
              <Button variant="outline" size="navigation" onClick={handleItemClick}>
                {item.title ? item.title : 'Needs title'}
              </Button>
            </Route>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MobileNav
