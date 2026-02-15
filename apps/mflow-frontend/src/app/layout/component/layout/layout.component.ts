import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import MenuComponent from '../menu/menu.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, MenuComponent],
  templateUrl: './layout.template.html',
  styleUrl: 'layout.scss',
  standalone: true,
})
class LayoutComponent {}

export default LayoutComponent;
