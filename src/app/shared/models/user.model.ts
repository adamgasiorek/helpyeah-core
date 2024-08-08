export interface UserModel {
    uid: string | null;
    email: string | null;
    photoURL: string | null;
    providerData: Array<ProviderModel>;
    token: string;
    permissions: PermissionModel;
}

interface ProviderModel {
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string | null;
    uid: string | null;
}

interface PermissionModel {
    admin: boolean;
    superadmin: boolean;
}
