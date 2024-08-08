import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext} from "@ngxs/store";
import {HandlerModel} from "@shared/models/handler.model";
import {LoaderEnum} from "@shared/enums/loader.enum";
import {AddError, AddLoader, RemoveError, RemoveLoader} from "@core/logic/handler/handler.actions";

@State<HandlerModel>({
    name: 'handler',
    defaults: {
        loaders: [
            {
                type: LoaderEnum.INIT_APP,
                value: true
            }
        ],
        errors: []
    }
})
@Injectable()
export class HandlerState {
    @Selector()
    static isAppInitialized(state: HandlerModel): boolean {
        return state.loaders.findIndex(x => x.type === LoaderEnum.INIT_APP) === -1;
    }

    @Selector()
    static isAuthLoading(state: HandlerModel): boolean {
        return state.loaders.findIndex(x => x.type === LoaderEnum.AUTH_LOADER) !== -1;
    }

    static error(code: string) {
        return createSelector([HandlerState], (state: HandlerModel) => {
            return state.errors.find((x) => x.code === code)?.message
        });
    }

    constructor() {
    }

    @Action(AddLoader)
    addLoader(ctx: StateContext<HandlerModel>, action: AddLoader) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            loaders: [...state.loaders, {type: action.payload.type, value: action.payload.value}]
        });
    }

    @Action(RemoveLoader)
    removeLoader(ctx: StateContext<HandlerModel>, action: RemoveLoader) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            loaders: state.loaders.filter((x) => x.type !== action.payload.type)
        });
    }

    @Action(AddError)
    addError(ctx: StateContext<HandlerModel>, action: AddError) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            errors: [...state.errors, action.payload]
        });
    }

    @Action(RemoveError)
    removeError(ctx: StateContext<HandlerModel>, action: RemoveError) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            errors: state.errors.filter((x) => x.code !== action.payload.code)
        });
    }
}
