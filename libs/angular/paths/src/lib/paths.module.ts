import { NgModule } from '@angular/core';
import { PathsPageComponent } from './components/paths-page/paths-page.component';
import { StoreModule } from '@ngrx/store';
import { pathsFeature } from './store/paths.reducer';

@NgModule({
    imports: [StoreModule.forFeature(pathsFeature)],
    declarations: [PathsPageComponent],
    exports: [PathsPageComponent],
})
export class PathsModule {}
