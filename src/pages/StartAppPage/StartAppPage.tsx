import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSotrage } from "../../Utils/scripts";

checkSotrage()

const StartAppPage = () => {
    const navigate = useNavigate();

    return (
        <div>

        </div>
    )
}
export default StartAppPage;