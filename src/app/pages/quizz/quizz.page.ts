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
  private idQuestion: number;

  public error: string;
  public questionSelect: Question;
  public questions: Question[];
  public itemSelected: string;
  public score: number = 0;
  public backButton: boolean = false;

  public propositions = [];

  constructor(private route: ActivatedRoute, private qs: QuizzserviceService,public alertController: AlertController) {
    this.route.params.subscribe(params => {
      try {
        this.chargerListeQuestion(params["nb"], params["diff"]);
      } catch (error) {
        error = "Problème";
      }
    });
  }

  async chargerListeQuestion(nb: string, diff: string) {
    this.questions = await this.qs.getQuestions(nb, diff);
    this.idQuestion = 0;
    this.getQuestion(this.idQuestion);
  }

  public getQuestion(id: number) {
    if(id != this.questions.length){
      this.questionSelect = this.questions[id];
      this.propositions = this.questionSelect.incorrect_answers;
      this.propositions.push(this.questionSelect.correct_answer);
      this.shuffle(this.propositions);
    }
  }

  public next() {
    if (this.itemSelected) {
      if (this.itemSelected === this.questions[this.idQuestion].correct_answer) {
        this.score++;
      }
      if(this.idQuestion == this.propositions.length){
        this.presentAlert();
      }else{
        this.getQuestion(++this.idQuestion);
      }
     
    }
  }

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
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

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Resultat',
      subHeader: 'Score',
      message: ` ${ Number(this.score) }`,
      buttons: ['OK']
    });
    localStorage.setItem("score", this.score.toString());
    this.backButton = true;
    await alert.present();
  }

  ngOnInit() {}
}
