/**
 * Created by Alex on 6/19/2017.
 */

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import {Pizza} from './pizza.model';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {isNumber} from 'util';
import {Ingredient} from "./ingredient.model";

@Injectable()
export class PizzaService {

  private pizzasUrl = 'http://localhost:8080/api/pizzas/';
  private ingredientsUrl = 'http://localhost:8080/api/ingredients/';

  constructor(private http: Http) {
  }

  private extractPizzaData(res: Response) {
    const body = res.json();
    return body.pizza || {};
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.pizzas || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getPizzas(): Observable<Pizza[]> {
    const url = this.pizzasUrl;
    console.log('service get url: ', url);
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePizza(pizza: Pizza): Observable<Pizza> {
    console.log(pizza);
    const url = this.pizzasUrl + '/' + pizza.id;
    return this.http.put(url, { 'price': pizza.price })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAll(pizzas: Pizza[], price: number): Observable<Pizza[]> {
    const url = this.pizzasUrl;
    return this.http.put(url, { 'price': price })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getIngredientsForPizza(pizzaID: number): Observable<Ingredient[]> {
    const url = this.ingredientsUrl + pizzaID;
    console.log('service ingredients url: ', url);
    return this.http.get(url)
      .map(res => res.json().ingredients || {})
      .catch(this.handleError);
  }
}
