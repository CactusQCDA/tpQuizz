import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizzserviceService } from "../../service/quizzservice.service";
import { Question } from "src/app/model/question";
import { AlertController } from '@ionic/angular';
import { parse } from 'querystring';

@Component({
  selector: "app-quizz",
  templateUrl: "./quizz.page.html",
  styleUrls: ["./quizz.page.scss"]
})
export class QuizzPage implements OnInit {

  private nbOccurence: string;
  private difficulty: string;

  private idQuestion: number;

  public error: string;
  public questionSelect: Question;
  public questions: Question[];
  public itemSelected: string;
  public score: number = 0;
  public cptQuestion: number = 0;
  public backButton: boolean = false;
  public colorDiff: string;
  public colorReponse: string;
  public radioDisable: boolean = false;

  public propositions = [];
  private storedScores = [];

  constructor(private route: ActivatedRoute, private qs: QuizzserviceService, public alertController: AlertController) {
    this.route.params.subscribe(params => {
      this.nbOccurence = params["nb"];
      this.difficulty = params["diff"];
      try {
        this.chargerListeQuestion(this.nbOccurence, this.difficulty);
      } catch (error) {
        error = "Problème";
      }
    });
  }

  async chargerListeQuestion(nb: string, diff: string) {
    this.questions = await this.qs.getQuestions(nb, diff);

    this.idQuestion = 0;
    this.cptQuestion = 1;
    this.getQuestion(this.idQuestion);
  }

  public getQuestion(id: number) {
    this.radioDisable = false;
    if (id != (this.questions.length)) {
      // Application de la couleur par défaut aux radio-button 
      // (cas où ceux-ci auraient changés lors de la question précédente)
      this.colorReponse = 'dark';

      // récupe de la question depuis le tableau de questions
      this.questionSelect = this.questions[id];
      // Affectation du tableau de réponses avec les mauvaise réponses ...
      this.propositions = this.questionSelect.incorrect_answers;
      // et les bonnes !
      this.propositions.push(this.questionSelect.correct_answer);

      // Mélange du tableau pour que cela soit plus fun
      //this.shuffle(this.propositions);

      // Gère la couleur de l'affichage de la difficulté
      switch (this.questionSelect.difficulty) {
        case "easy":
          this.colorDiff = "primary";
          break;
        case "medium":
          this.colorDiff = "secondary";
          break;
        case "hard":
          this.colorDiff = "danger";
          break;
      }
    }
  }

  public selectionResponse() {
    // Rendre disable les radio-button
    this.radioDisable = true;
  }
  /**
   * Methode qui gère le boutton next.
   */
  public next() {
    if (this.itemSelected) {

      // Si bonne réponse implémentation du score du joueur
      if (this.itemSelected === this.questions[this.idQuestion].correct_answer) {
        this.score++;
        // si bonne réponse changement de couleur du radio button
        this.colorReponse = 'success';
        // Incrémentation du compteur question
        ++this.cptQuestion;
      } else {
        this.colorReponse = 'danger';
        // Incrémentation du compteur question
        ++this.cptQuestion;
      }
      if (this.idQuestion != this.questions.length - 1) {
        // On passe à la question suivante àprès un petit delai de 1s histoire
        // d'avoir le temps de voir si on a réussi ou pas grâce au changement de couleur de 
        // la réponse
        setTimeout(() =>
          this.getQuestion(++this.idQuestion)
          , 1000);

      } else {
        setTimeout(() =>
          this.presentAlert()
          , 1000);
      }
    }
  }

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
   * Merci StackOverFlow
   */
  public shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  /**
   * Alert de fin jeu
   */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Resultat',
      subHeader: 'Score',
      buttons: ['OK']
    });

    // Message personnalisé en fonction des résultats
    let indice = (Number(this.nbOccurence) / this.score);
    if (indice == 1) {
      alert.setAttribute('message', `Score : ${Number(this.score)} Waou PERFECT !!!`);
    }
    if (indice > 1 && indice < 2) {
      alert.setAttribute('message', `Score : ${Number(this.score)} Bravo !!!`);
    }
    if (indice >= 2 && indice < 3) {
      alert.setAttribute('message', `Score : ${Number(this.score)} Pas mal !`);
    }
    if (indice >= 3) {
      alert.setAttribute('message', `Score : ${Number(this.score)} Il faut encore s\'entraîner !`);
    }

    /**
     *  Enregistrement du score en mémoire (localStorage)
     */
    // Si un score a déjà été sauvegardé alors on récupère le tableau
    if (localStorage.getItem('score') != null) {
      let scoreRegistered = JSON.parse(localStorage.getItem('score'));
      this.storedScores = scoreRegistered;
    }
    // Ajout de la valeur du score dans le tableau historique des scores
    this.storedScores.push(this.score);
    localStorage.setItem("score", JSON.stringify(this.storedScores));



    // Permettre désormais le retour à la page d'accueil.
    this.backButton = true;
    await alert.present();
  }

  ngOnInit() { }
}
