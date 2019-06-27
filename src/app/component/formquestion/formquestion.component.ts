import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-formquestion",
  templateUrl: "./formquestion.component.html",
  styleUrls: ["./formquestion.component.css"]
})
export class FormquestionComponent implements OnInit {
  public nbQuestion: string;
  public difficulty: string;
  public locatScore: string;
  public errorField: boolean = false;
  public localScore: string;


  constructor(private router: Router, public alertController: AlertController) {
  
  }

  public onClick() {

    // Petite vérif des données quand même 
    if (this.nbQuestion == undefined) {
      this.presentAlert("Nombre de question manquant");
      this.errorField = true;
    }
    if (this.difficulty == undefined) {
      this.presentAlert("Niveau de difficulté manquant");
      this.errorField = true;
    }

    // Passage à la page quizz
    if (!this.errorField) {
      this.router.navigate(["/quizz", this.nbQuestion, this.difficulty]);
    }

  }
  /**
   * 
   * @param error A
   * Affiche les messages d'erreur si l'utilisateur ne choisit aucune proposition
   */
  async presentAlert(error: string) {

    const alert = await this.alertController.create({
      header: 'Erreur',
      message: error,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() { }
}
