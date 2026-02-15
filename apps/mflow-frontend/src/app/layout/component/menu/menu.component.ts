import { Component } from '@angular/core';
import MenuItemComponent from '../menu-item/menu-item.component';
import { MenuItem } from './types';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.template.html',
  imports: [MenuItemComponent],
  styleUrl: 'menu.scss',
})
class MenuComponent {
  public menu: MenuItem[] = [];
  ngOnInit() {
    this.menu = [
      { name: 'Dashboard', icon: '', link: '/' },
      { name: 'Portfolio', icon: '', link: '/portfolio' },
    ];
  }
}

export default MenuComponent;
