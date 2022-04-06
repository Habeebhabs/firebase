import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {path:'',redirectTo:'main',pathMatch:'full'},
  {path:'child',component:ChildComponent},
  {path:'load',component:GlobalLoaderComponent},
  {path:'main',component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
