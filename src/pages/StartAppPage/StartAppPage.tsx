import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSotrage } from "../../Utils/scripts";
import { useAppSelector } from "../../services/store";
import { TMenu } from "../../Utils/Types";

checkSotrage()

const StartAppPage = () => {
    const navigate = useNavigate();
    const menus = useAppSelector(state => state.MenuSlices.menu)

    setTimeout(() => {
        navigate(`${menus[0]!.routing!}`)
    }, 300)


    return (
        <div>
            Загрузка
        </div>
    )
}
export default StartAppPage;