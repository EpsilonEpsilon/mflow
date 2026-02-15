import { Component, Input } from '@angular/core';
import { MenuItem } from '../menu/types';

@Component({
  selector: '[app-menu-item]',
  standalone: true,
  templateUrl: './menu-item.template.html',
  styleUrl: './menu-item.scss',
})
class MenuItemComponent {
  @Input() item!: MenuItem;
}

export default MenuItemComponent;
