const TOKEN_KEY ='token';


interface IAuthService{
    login:(token: string) => void;
    logout:() => void;
    getToken: () => string | null;
    isAuthenticated: () => boolean;
}

export const AuthService: IAuthService = {
    login: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    logout: () => localStorage.removeItem(TOKEN_KEY),
    getToken: () => localStorage.getItem(TOKEN_KEY),
    isAuthenticated: ()=> !!localStorage.getItem(TOKEN_KEY),
};