import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathsModule, PathsPageComponent } from '@sol/paths';

const routes: Routes = [
  {
    path: 'paths',
    component: PathsPageComponent
  },
];

@NgModule({
  imports: [PathsModule, RouterModule.forRoot(routes), 
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
