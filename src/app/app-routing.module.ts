import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },

  { path: 'quizz', loadChildren: './pages/quizz/quizz.module#QuizzPageModule' },
  { path: 'eni', loadChildren: './pages/eni/eni.module#EniPageModule' },
  { path: 'author', loadChildren: './pages/author/author.module#AuthorPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
