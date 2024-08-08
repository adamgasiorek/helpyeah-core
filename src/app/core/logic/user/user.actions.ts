export class CheckUser {
    static readonly type = '[Auth] Check user';
    constructor() {}
}

export class FacebookLogin {
    static readonly type = '[Auth] Facebook login';
    constructor() {}
}

export class GoogleLogin {
    static readonly type = '[Auth] Google login';
    constructor() {}
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string; password: string }) {}
}

export class Register {
    static readonly type = '[Auth] Register';
    constructor(public payload: { email: string; password: string }) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class GetRedirectResult {
    static readonly type = '[Auth] Get Redirect Result';
}
