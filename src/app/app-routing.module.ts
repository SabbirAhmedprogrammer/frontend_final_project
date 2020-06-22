import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokesComponent } from './jokes/jokes.component';
import { ChecklistComponent } from './checklist/checklist.component';


const routes: Routes = [
  { path: "", redirectTo: "/search", pathMatch: "full" },
  { path: "checklist", component: ChecklistComponent },
  { path: "search", component: JokesComponent },
  { path: "**", redirectTo: "/search", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
