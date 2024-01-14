import { Component } from '@angular/core';
import { MenuItem } from 'src/app/services/models/MenuItems';
import { SubItem } from 'src/app/services/models/SubItem';
import { loggedin } from 'src/app/services/models/loggedin';
import { userProfileService } from 'src/app/services/service/user.service';




@Component({
  selector: 'app-affectationde-taches',
  templateUrl: './affectationde-taches.component.html',
  styleUrls: ['./affectationde-taches.component.scss']
})
export class AffectationdeTachesComponent {
   // bread crumb items
   breadCrumbItems!: Array<{}>;
   listUsers: any;
   selectedUserId: string | undefined = undefined;
  selectedUser: loggedin | null = null;
  selectedMenuItemId: String | undefined = undefined;
  selectedMenuItem:any;
  
   constructor(private userService:userProfileService) {}
 
   ngOnInit(): void {
     /**
      * BreadCrumb
      */
     this.breadCrumbItems = [
       { label: 'Affectation de Taches' },
       { label: 'Affectation de Taches', active: true }
     ];
     this.findallUsers()
   }
   findallUsers() {
    this.userService.fiddalluser().subscribe(
      (user) => {
        this.listUsers = user;
        console.log(user)
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    );
  }
  onUserChange() {
    if (this.selectedUserId !== null) {
      this.selectedUser = this.listUsers.find((user: loggedin) => user.id === this.selectedUserId) || null;
    } else {
      this.selectedUser = null; // Reset selected user when no user is selected
    }
  }
  onMenuItemChaange() {
    if (this.selectedUser !== null && this.selectedUser !== undefined) {
      if (
        this.selectedUser.menuItems !== null &&
        this.selectedUser.menuItems !== undefined
      ) {
        // Corrected the type to MenuItem
        this.selectedMenuItem = this.selectedUser.menuItems.find(
          (menuItem: MenuItem) => menuItem.id === this.selectedMenuItemId
        ) || null;
        console.log(this.selectedMenuItem);
      } else {
        this.selectedMenuItem = null;
      }
    } else {
      this.selectedMenuItem = null;
    }
  }
  onCheckboxChange(subItemId: string): void {
    if (this.selectedUser && this.selectedUser.menuItems) {
      for (const menuItem of this.selectedUser.menuItems) {
        if (menuItem.subItems) {
          const subItem = menuItem.subItems.find((item: SubItem) => item.id === subItemId);
  
          if (subItem) {
            subItem.active = true;
            menuItem.active=true;
            
            
  
            // Save the updated menu items here if needed
             this.saveMenuItems(this.selectedUser.menuItems);
             this.updateTable();
            break;  // Break the loop once the subItem is found and updated
          }
        }
      }
    }
  }
  

  saveMenuItems(menuItem:MenuItem[]): void {
    if (this.selectedUserId) {
      this.userService.updateMenu(this.selectedUserId, menuItem).subscribe(
        (updatedMenuItems) => {
          console.log('data saved', updatedMenuItems);
          if (this.selectedUser?.menuItems) {
          this.selectedUser.menuItems = [...updatedMenuItems];
          this.selectedMenuItem=[...this.selectedMenuItem]
        
        }
        },
        (error) => {
          console.error('Error fetching data:', error);
          // Handle error as needed
        }
      );
    } else {
      console.error('selectedUserId is undefined. Cannot make API call.');
      // Handle the case where selectedUserId is undefined
    }
  }
  updateTable(): void {
   this.onMenuItemChaange();
    this.onUserChange();
  }
  onDeleteIconClick(subItemId: string): void {
    if (this.selectedUser && this.selectedUser.menuItems) {
      for (const menuItem of this.selectedUser.menuItems) {
        if (menuItem.subItems) {
          const subItem = menuItem.subItems.find((item: SubItem) => item.id === subItemId);
  
          if (subItem) {
            subItem.active = false;
            if (menuItem.subItems.every((item) => !item.active)) {
              menuItem.active = false;
            }
  
            // Save the updated menu items here if needed
            this.saveMenuItems(this.selectedUser.menuItems);
            this.updateTable();
            break;  // Break the loop once the subItem is found and updated
          }
        }
      }
    }
  }
  
}
