import { MenuItem } from "./MenuItems";

export interface loggedin {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: string[];
  menuItems?:MenuItem[];
  accessToken?: string;
}
