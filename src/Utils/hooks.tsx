import React, {useState} from "react";

export const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const onBlur = (e: any) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur
    }
}