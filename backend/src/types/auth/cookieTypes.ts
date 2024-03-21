export interface ICurrentAuthCookie {
    auth?: string | undefined;
    profile?: string | undefined;
    [key: string]: string | undefined;
}