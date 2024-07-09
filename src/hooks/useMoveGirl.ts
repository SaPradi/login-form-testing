import { useState } from "react"

// import Neutral from '../assets/icons/neutral.svg';
import { expressions } from "../static/expressionsGirl";

const useMoveGirl = () => {

    const [currentExpression,setCurrentExpression] = useState<string>('neutral');
    const [currentUrlExpression,setCurrentUrlExpression] = useState<string>(expressions.neutral.url);

    const updateExpresssion = (newExpression:string): void => {
        setCurrentExpression(newExpression);
        setCurrentUrlExpression(`${expressions[newExpression].url}?${new Date().getTime()}`)
    }


    return {
        currentExpression,
        currentUrlExpression,
        updateExpresssion,
    }
}

export default useMoveGirl
