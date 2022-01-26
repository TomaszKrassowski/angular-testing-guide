import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryViewComponent} from "./components/country-view/country-view.component";

const routes: Routes = [
  {
    path: '',
    component: CountryViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
