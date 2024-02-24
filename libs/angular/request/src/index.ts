import { SolLoadedDirective } from './lib/directives/loaded-state.directive';
import { SolLoadingDirective } from './lib/directives/loading-state.directive';
import { SolErrorDirective } from './lib/directives/error-state.directive';
import { SolEmptyDirective } from './lib/directives/empty-state.directive';

export { RequestState } from './lib/models/requested.type';
export { Requested } from './lib/models/requested.type';
export {
    SolLoadedDirective,
    SolLoadingDirective,
    SolErrorDirective,
    SolEmptyDirective,
};
export { RequestedOperatorsUtility } from './lib/utilities/requested-operators.utility';
export { RequestedUtility } from './lib/utilities/requested.utility';
export { RequestService } from './lib/services/request.service';
export { provideRequests } from './lib/store/request.provider';
export const requestStateDirectives = [
    SolLoadedDirective,
    SolLoadingDirective,
    SolErrorDirective,
    SolEmptyDirective,
];
