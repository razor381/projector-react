const JWT_KEY = 'jwt';

interface IGetToken {
  (): string | null;
}

export const getToken: IGetToken = () => localStorage.getItem(JWT_KEY);

interface ISetToken {
  (token: string): void;
}

export const setToken: ISetToken = (token) => {
  localStorage.setItem(JWT_KEY, token);
};

export const unsetToken = () => {
  localStorage.removeItem(JWT_KEY);
};
