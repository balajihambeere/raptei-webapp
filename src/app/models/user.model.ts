export interface User {
    uid: string;
    email?: string | null;
    picture?: string | null;
    fullName?: string | null;
    phoneNumber?: string | null;
    createdDate?: Date | null;
    displayName ?: string | null;
}
