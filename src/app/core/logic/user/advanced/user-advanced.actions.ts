
export class Reset {
    static readonly type = '[Auth] Reset';
}

export class UpdatePassword {
    static readonly type = '[Auth] Update password';
    constructor(public payload: { newPassword: string; oldPassword: string }) {}
}

export class ResetPasswordWithMail {
    static readonly type = '[Auth] Reset password with mail';
    constructor(public payload: { email: string }) {}
}

export class ResetConfirm {
    static readonly type = '[Auth] Reset confirm';
    constructor(public payload: { code: string; newPassword: string }) {}
}

export class VerifyEmail {
    static readonly type = '[Auth] Verify Email';
    constructor(public payload: { code: string; }) {}
}

export class Unlink {
    static readonly type = '[Auth] Unlink';
    constructor(public payload: { providerId: string; }) {}
}

export class LinkWithFacebook {
    static readonly type = '[Auth] Link with facebook';
}

export class LinkWithGoogle {
    static readonly type = '[Auth] Link with google';
}

export class LinkWithPassword {
    static readonly type = '[Auth] Link with password';
    constructor(public payload: { email: string; password: string; }) {}
}

