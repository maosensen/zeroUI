import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/zero/navigation-menu";

const jobs = [
  ["#board", "Job board", "Every open job, by reward or distance."],
  ["#rush", "Rush jobs", "Higher rewards, shorter windows."],
  ["#taken", "Taken", "What you are carrying now."],
  ["#history", "History", "Every job you handed in."],
] as const;

const districts = [
  ["#harbor", "Harbor", "Cranes, crates, the night shift."],
  ["#rail-yards", "Rail yards", "Long routes, sealed cargo."],
] as const;

export default function NavigationMenuSite() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Jobs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-[28rem] sm:grid-cols-2">
              {jobs.map(([href, title, line]) => (
                <li key={href}>
                  <NavigationMenuLink href={href}>
                    <strong>{title}</strong>
                    {line}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Districts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-64">
              {districts.map(([href, title, line]) => (
                <li key={href}>
                  <NavigationMenuLink href={href}>
                    <strong>{title}</strong>
                    {line}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="#drivers" className={navigationMenuTriggerStyle}>
            Drivers
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
