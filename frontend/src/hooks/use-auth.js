import React, {useCallback, useEffect, useState} from "react";

let logoutTimerID;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
    const login = useCallback((uid, token, expirationDate) => {
        console.log(token, uid);
        setToken(token);
        setUserId(uid);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 60*60*1000);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem("userData", JSON.stringify({
        userId: uid,
        token: token,
        expireAt: tokenExpirationDate.toISOString(),
        }));
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if(storedData && storedData.token && new Date(storedData.expireAt) > new Date()){
        login(storedData.userId, storedData.token, new Date(storedData.expireAt));
        }
    }, [login]);

    useEffect(() => {
        if(token && tokenExpirationDate){
        const remaining_time = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimerID = setTimeout(logout, remaining_time)
        }
        else{
        // Maybe manually clicked on timeout
        clearTimeout(logoutTimerID);     
        }
    }, [token, logout, tokenExpirationDate]);

    return {
        token,
        login,
        logout,
        userId
    };
}