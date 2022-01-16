import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathsPageComponent } from './components/paths-page/paths-page.component';
import { StoreModule } from '@ngrx/store';
import { pathsFeature } from './store/paths.reducer';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature(pathsFeature)],
    declarations: [PathsPageComponent],
    exports: [PathsPageComponent],
})
export class PathsModule {}
