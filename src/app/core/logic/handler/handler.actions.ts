import {LoaderEnum} from "@shared/enums/loader.enum";

export class RemoveLoader {
    static readonly type = '[Handler] Remove loader';
    constructor(public payload: {type: LoaderEnum}) {}
}

export class AddLoader {
    static readonly type = '[Handler] Add loader';
    constructor(public payload: {type: LoaderEnum, value: boolean}) {}
}

export class AddError {
    static readonly type = '[Handler] Add error';
    constructor(public payload: {code: string, message: string}) {}
}

export class RemoveError {
    static readonly type = '[Handler] Remove error';
    constructor(public payload: {code: string, message: string}) {}
}
