// username
import Neutral from '../assets/icons/neutral.svg';
import Happy from '../assets/icons/happy.svg';
import Excited from '../assets/icons/exicted.svg';
// error username
import Serious from '../assets/icons/serious.svg';
import Angry from '../assets/icons/hangry.svg';

// cover eyes
import OhOpenMove from '../assets/icons/OhOpen-move.svg';
import OhCloseMove from '../assets/icons/OhClose-move.svg';
import happyCoverEyes from '../assets/icons/happyCoverEyes.svg';
import happyOpenEyes from '../assets/icons/happyOpenEyes.svg';
// error cover eyes
import angryOpenEyesMove from '../assets/icons/OhmalClose-move.svg';
import angryCoverEyesMove from '../assets/icons/OhmalOpen-move.svg';
import angryOpenEyes from '../assets/icons/OhMal.svg';
import angryCoverEyes from '../assets/icons/Oh.svg'


interface Expressions {
    [key: string]: { url: string };
}


export const expressions:Expressions = {
    neutral: {
        url:Neutral
    },
    happy: {
        url: Happy
    },
    excited: {
        url: Excited
    },
    serious: {
        url: Serious
    },
    angry: {
        url: Angry
    },
    happyCoverEyesMove: {
        url: OhCloseMove
    },
    happyOpenEyesMove: {
        url: OhOpenMove
    },
    happyOpenEyes:{
        url:happyOpenEyes
    },
    happyCoverEyes:{
        url:happyCoverEyes
    },
    angryCoverEyes:{
        url: angryCoverEyes
    },
    angryOpenEyes:{
        url:angryOpenEyes
    },
    angryCoverEyesMove: {
        url: angryCoverEyesMove
    },
    angryOpenEyesMove: {
        url: angryOpenEyesMove
    }
};