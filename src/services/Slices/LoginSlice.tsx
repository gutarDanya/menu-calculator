import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../../Utils/Cookie";
import { currentLogin, currentPassword } from "../../Utils/Data";

type TinitialState = {
    logined: string | undefined;
    error: string | null
}

const initialState: TinitialState = {
    logined: "",
    error: null
};

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        RightLogin(state, action: PayloadAction<{ login: string, password: string }>) {
            if (action.payload.login == currentLogin && action.payload.password == currentPassword) {
                state.logined = "logined"
                setCookie("logined", "logined")
            } else {
                state.error = "не правильные логин или пароль"
            }
        },
        RightLogout(state) {
            state.logined = ""
            deleteCookie("logined")
        }
    }
})

export const { RightLogin, RightLogout } = LoginSlice.actions;
export default LoginSlice.reducer;