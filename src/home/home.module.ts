import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountryViewComponent} from './components/country-view/country-view.component';
import {HomeRoutingModule} from "./home-routing.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CountryViewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule {
}
