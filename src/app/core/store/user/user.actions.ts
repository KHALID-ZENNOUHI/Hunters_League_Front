import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth] login success',
    props<{ id: string, username: string, role: string}>()
);

export const logout = createAction('[Auth] logout');