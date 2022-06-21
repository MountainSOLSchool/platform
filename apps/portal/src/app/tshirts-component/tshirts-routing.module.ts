import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TshirtsComponent } from './tshirts.component';

const routes: Routes = [
    {
        path: '',
        component: TshirtsComponent,
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TshirtsRoutingModule {}
