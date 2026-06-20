import {
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';

import { LayoutSideContent } from '@gravity-ui/icons';

const DashboardSidebar = () => {
  const navItems = [
    { icon: House, label: 'Home' },
    { icon: Magnifier, label: 'Search' },
    { icon: Bell, label: 'Notifications' },
    { icon: Envelope, label: 'Messages' },
    { icon: Person, label: 'Profile' },
    { icon: Gear, label: 'Settings' },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map(item => (
        <button
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="">
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <div>
        <Drawer>
          <Button variant="secondary" className="lg:hidden">
            <LayoutSideContent />
            Menu
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>DashBoard</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </div>
  );
};

export default DashboardSidebar;
