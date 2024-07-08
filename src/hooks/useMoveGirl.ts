import { useEffect, useState } from "react"

// import Neutral from '../assets/icons/neutral.svg';
import { expressions } from "../static/expressionsGirl";

const useMoveGirl = () => {

    const [currentExpression,setCurrentExpression] = useState('neutral');
    const [currentUrlExpression,setCurrentUrlExpression] = useState(expressions.neutral.url);

    const updateExpresssion = (newExpression:string):void => {
        setCurrentExpression(newExpression);
        setCurrentUrlExpression(`${expressions[newExpression].url}?${new Date().getTime()}`)
    }

    // const handle = () => {

    //     setSrcCoverEyes(`${OhOpen}?${new Date().getTime()}`);

    //     if (stage === 0) {
    //         setSrcCoverEyes(`${OhOpen}?${new Date().getTime()}`);
    //         setStage(1);
    //     } else {
    //         setSrcCoverEyes(`${OhClose}?${new Date().getTime()}`);
    //         setStage(0);
    //     }

    // };

    return {
        currentExpression,
        currentUrlExpression,
        updateExpresssion,
    }
}

export default useMoveGirl
