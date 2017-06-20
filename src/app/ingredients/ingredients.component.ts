import { Params } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {PizzaService} from '../pizzas/shared/pizza.service';
import {Ingredient} from '../pizzas/shared/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @Input()
  ingredients: Ingredient[];

  constructor(private activatedRoute: ActivatedRoute,
  private location: Location,
  private pizzaService: PizzaService) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.pizzaService.getIngredientsForPizza(+params['id']))
      .subscribe(ingredients => this.ingredients = ingredients);
  }

}
