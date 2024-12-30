import { initialUserState, UserState } from "./user.state";

export class StateStorage {
    static saveUserState (state: UserState) {
        localStorage.setItem('user', JSON.stringify(state));
    }

    static loadUserState (): UserState {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : initialUserState;
    }
}

