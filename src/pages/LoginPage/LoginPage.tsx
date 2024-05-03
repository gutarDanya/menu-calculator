import React, { useRef, useState } from "react";
import styles from './LoginPage.module.css';
import { currentLogin, currentPassword } from "../../Utils/Data";
import { useAppDispatch } from "../../services/store";
import { RightLogin } from "../../services/Slices/LoginSlice";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");

    const submit = () => {
       if (password == currentPassword && login == currentLogin) {
        dispatch(RightLogin({login: login, password: password}))
        navigate('/')
       }
    }
    
    return(
        <div className={styles.page}>
            <div className={styles.loginContainer}>
                <h1 className={styles.header}>Вход</h1>
                <input className={styles.input} type="text" onChange={(e) => {setLogin(e.target.value)}} placeholder="Логин"/>
                <input className={styles.input} type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="пароль"/>
                <button type="submit" className={styles.button} onClick={submit}>Сохрнаить</button>
            </div>
        </div>
    )
}

export default LoginPage