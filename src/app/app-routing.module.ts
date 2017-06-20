import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PizzasComponent} from './pizzas/pizzas.component';
import {IngredientsComponent} from "./ingredients/ingredients.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizzashop2010/pizzas',
    pathMatch: 'full'
  },
  {
    path: 'pizzashop2010/pizzas',
    component: PizzasComponent
  },
  {
    path: 'pizzashop2010/pizza/:id',
    component: IngredientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
