import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathsPageComponent } from './components/paths-page/paths-page.component';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { pathsFeature } from './store/paths.reducer';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatCardModule, StoreModule.forFeature(pathsFeature)],
  declarations: [PathsPageComponent],
  exports: [PathsPageComponent]
})
export class PathsModule {}
