import {Injectable} from "@angular/core";
import {Action, NgxsOnInit, Selector, State, StateContext, Store} from "@ngxs/store";
import {UserModel} from "@shared/models/user.model";
import {AdminService} from "@core/logic/admin/admin.service";
import {AdminModel} from "@shared/models/admin.model";
import {GetAllUsers} from "@core/logic/admin/admin.actions";
import {UserState} from "@core/logic/user/user.state";
import {filter, take} from "rxjs/operators";

@State<AdminModel>({
    name: 'admin',
    defaults: {
        users: []
    }
})
@Injectable()
export class AdminState {
    @Selector()
    static users(state: AdminModel): Array<any> | [] {
        return state.users;
    }

    constructor(private adminService: AdminService, private store: Store) {
    }

    @Action(GetAllUsers)
    getAllUsers(ctx: StateContext<AdminModel>, action: GetAllUsers) {
        return this.store.select(UserState.token).pipe(filter(x => x !== null), take(1))
            .toPromise()
            .then((data) => {
                return this.adminService.getAllUsers(data).then((res: Array<any>) => {
                    ctx.patchState({
                        users: res
                    })
                })
        })
    }

}
