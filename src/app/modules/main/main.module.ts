import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MainRoutingModule } from './main-routing.module';
import { AddressDetailsComponent } from './components';

@NgModule({
  declarations: [HomeComponent, AddressDetailsComponent],
  imports: [CommonModule, MainRoutingModule, SidebarModule, ButtonModule],
  exports: [],
})
export class MainModule {}
