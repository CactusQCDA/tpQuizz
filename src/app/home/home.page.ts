import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public iddd: number = 1;
  public localScore: string;
  constructor() {
    if (localStorage.getItem('score') != null) {
      this.getMaxScore(JSON.parse(localStorage.getItem('score')));
    }
  }
  ionViewWillEnter() {

    if (localStorage.getItem('score') != null) {
      this.getMaxScore(JSON.parse(localStorage.getItem('score')));
    }

  }

  /**
   * 
   * @param tabScore Retourne la plus grande valeur d'un tableau d'entier passé en paramètre
   */
  public getMaxScore(tabScore) {
    this.localScore = Math.max.apply(Math, tabScore);
  }

}
