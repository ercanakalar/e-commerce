export interface ICurrentUserCookie {
    user?: string | undefined;
    profile?: string | undefined;
    [key: string]: string | undefined;
}