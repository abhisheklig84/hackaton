export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  desc: string;
  children?: MenuItem[];
  icon?: React.ReactNode;
}
