import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Question } from "../model/question";


@Injectable({
  providedIn: "root"
})
export class QuizzserviceService {

  // Après avoir importé HttpClient ne pas oublier de le déclarer dans le controlleur
  constructor(private httpClient: HttpClient) { }

  public error: string;
  public nbQuestion: string;
  public difficulty: string;


  public getQuestions(
    nbQuestion: string,
    difficulty: string
  ): Promise<Array<Question>> {
    return new Promise((resolve, reject) => {

      // Paramètrage de la requête
      let params = new HttpParams();

      params = params.append("amount", nbQuestion);
      params = params.append("difficulty", difficulty);

      this.httpClient.get("https://opentdb.com/api.php", {
        params: params,
      })
        .toPromise()
        .then(response => {
          // response['results'] n'est pas sortit du chapeau c'est l'api qui indique le mot result.
          if (response && response['results']) {
            resolve(response['results']);
          } else {
            reject("Le serveur à renvoyé une réponse inatendue");
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
