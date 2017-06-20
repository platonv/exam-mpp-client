import { Component, OnInit } from '@angular/core';
import {PizzaService} from './shared/pizza.service';
import {Pizza} from './shared/pizza.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  private pizzas: Pizza[];
  private price: number;

  constructor(private pizzaService: PizzaService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    });
  }

  update(pizza: Pizza) {
    this.pizzaService.updatePizza(pizza).subscribe(pizza => {
      console.log(pizza);
    });
  }

  updateAll() {
    this.pizzaService.updateAll(this.pizzas, this.price).subscribe(pizzas => {
      this.pizzas = pizzas;
    });
  }

  goToIngredients(pizza: Pizza) {
    this.router.navigate(['/pizzashop2010/pizza/', pizza.id]);
  }
}
