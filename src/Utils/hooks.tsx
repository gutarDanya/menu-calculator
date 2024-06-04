import React, {useEffect, useState} from "react";

export const useValidation = (value: any, validations: any) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLenthError, setminLenthError] = useState(false);
    const [isNumberError, setIsNumberError] = useState(false);
    const [inputValid, setInputValid] = useState(false)
    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "isNumber": 
                    const re = /^\d+$/
                    re.test(value) ? setIsNumberError(false) : setIsNumberError(true)
                break;
                case "minLenth":
                    value.length < validations[validation] ? setminLenthError(true) : setminLenthError(false)
                break;
                case "minNumber":

                break;
                case "isEmpty": 
                    value ? setIsEmpty(false) : setIsEmpty(true)
                break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLenthError || isNumberError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLenthError, isNumberError])

    return {
        isEmpty,
        minLenthError,
        isNumberError,
        inputValid
    }
}

export const useInput = (initialValue: any, validations: any) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations)

    const onChange = (e: any) => {
        if (typeof e === "number") {
            setValue(e)
        } else {
            setValue(e.target.value)
        }
    }

    const onBlur = (e: any) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}