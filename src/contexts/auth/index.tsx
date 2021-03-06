import { createContext, useCallback, useState } from 'react';
import { IAuthProviderProps, ICurrentUser } from '../../types';

export const AuthContext = createContext<
    | {
          currentUser: ICurrentUser | null;
          setCurrentUser: (data: ICurrentUser) => void;
          isAuthenticated: () => boolean;
      }
    | undefined
>(undefined);

export const AuthProvider = (props: IAuthProviderProps) => {
    const initalState = () => {
        const state = window.localStorage.getItem('userInfo');
        if (state) {
            return JSON.parse(state);
        }
        return null;
    };
    const [currentUser, setState] = useState<ICurrentUser | null>(initalState);

    const setCurrentUser = (data: ICurrentUser | null) => {
        if (data) {
            window.localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
            window.localStorage.removeItem('userInfo');
        }
        setState(data);
    };
    const isAuthenticated = useCallback(() => {
        if (currentUser) {
            if (
                parseInt(currentUser.expiresAt) * 1000 > new Date().getTime() &&
                currentUser.user
            ) {
                return true;
            }
        }
        return false;
    }, [currentUser]);
    const { children } = props;
    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};
