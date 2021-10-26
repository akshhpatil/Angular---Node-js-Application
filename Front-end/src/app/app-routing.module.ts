import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path:'add-student',component: CreateComponent },
  {path:'add-student/:id',component: CreateComponent },
  {path:'view' ,component:ReadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
