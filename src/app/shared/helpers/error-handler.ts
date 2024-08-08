import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {Action, Actions, ofActionCompleted, Store} from "@ngxs/store";
import {AddError, RemoveError, RemoveLoader} from "@core/logic/handler/handler.actions";
import {delay} from "rxjs/operators";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    storeService;

    constructor(private injector: Injector, private actions: Actions) {

        this.actions.pipe(ofActionCompleted(AddError)).pipe(delay(5000)).subscribe((res) => {
            this.storeService.dispatch(new RemoveError({code: res.action.payload.code, message: res.action.payload.message}));
        });
    }

    handleError(error: any) {
        this.storeService = this.injector.get(Store);

        this.storeService.dispatch(new AddError({code: error.code, message: error.message}));

        throw error;
    }
}
