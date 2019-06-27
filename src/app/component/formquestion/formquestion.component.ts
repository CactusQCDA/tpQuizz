import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-formquestion",
  templateUrl: "./formquestion.component.html",
  styleUrls: ["./formquestion.component.css"]
})
export class FormquestionComponent implements OnInit {
  public nbQuestion: string;
  public difficulty: string;
  public locatScore: string;

  constructor(private router: Router) {}
  public onClick() {
    this.router.navigate(["/quizz", this.nbQuestion, this.difficulty]);
  }



  ngOnInit() {}
}
