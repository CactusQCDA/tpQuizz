## tp Quizz
tp - ENI 2018/2019
Application developpée sous Ionic.
- Mon developpement ne prends pas en compte l'implémentation d'un compte à rebours ... 
- Je suis parti d'un projet side-page plutôt que d'un projet blank.


### Objectif

Réaliser une application ludique permettant de répondre à une série de 10 questions.

### Spécifications

#### Etape 1

- Développer une première page permettant de sélectionner un nombre de questions entre 5 et 10, et un niveau de difficulté (facile, moyen difficile)
- Un bouton "C'est parti" envoie sur la page de quizz en transportant les paramètres saisis dans le formulaire

#### Etape 2

- Développer un provider "QuizzProvider" qui expose une méthode "getQuizz" qui récupère une liste de X questions depuis l'API OpenTrivia, selon un niveau de difficulté
- La méthode "getQuestions" doit renvoyer un tableau de questions ou renvoyer une erreur
- La documentation de l'API OpenTrivia se trouve à l'adresse suivante : `https://opentdb.com/api_config.php`

#### Etape 3

- Développer une page qui appelle le provider "QuizzProvider" en fonction des paramètres donnés à l'écran suivant et qui propose le gameplay suivant :
  - La question s'affiche, ainsi que les réponses (attention, il existe deux types de questions !) et un chronomètre de 5s
  - Le chronomètre se déclenche instantannément et jusqu'à ce que le joueur clique sur une réponse ou que le temps soit écoulé
    - Si le joueur répond, on lui indique s'il a correctement répondu
    - Si le chronomètre est écoulé, on lui indique qu'il a dépassé le temps
    - Dans tous les cas, les boutons sont désactivés si le joueur répond ou si le temps est écoulé
  - Un bouton "Question suivante" permet ensuite de passer à la question suivante. Ce bouton est caché dès que la question suivante est affichée
  - A la fin des X questions, le score du joueur est affiché et un bouton permet de retourner à l'écran principal

#### Etape 4

- Enregistrer tous les scores du joueurs dans le localstorage te lui présenter ses 10 derniers résultats dans l'écran principal

#### Etape 5

- Lorsque le score est présenté, proposer au joueur de partager ce score à l'aide du plugin social et de se prendre en selfie
