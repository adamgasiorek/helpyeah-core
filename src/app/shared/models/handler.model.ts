import {LoaderEnum} from "@shared/enums/loader.enum";

export interface LoaderModel {
    type: LoaderEnum;
    value: boolean;
}

export interface HandlerModel {
    loaders: Array<LoaderModel>;
    errors: Array<any>;
}
