import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { loginSuccess, logout } from "./user.actions";

export const userReducer = createReducer(
    initialUserState,
    on(loginSuccess, (state, { id, username, role }) => ({
      ...state,
      id,
      username,
      role,
      isAuthenticated: true,
    })),
    on(logout, () => initialUserState)
  );