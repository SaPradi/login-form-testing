
import EyeIcon from '../assets/icons/Eye.svg';
import EyeOffIcon from '../assets/icons/EyeOff.svg';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/form.css'
import useMoveGirl from '../hooks/useMoveGirl';

const Form = () => {
    // Form
    const form = useForm();
    const { register, control, handleSubmit, formState, reset, watch } = form;
    const { errors } = formState;
    
    const username = watch('username');
    const password = watch('password');


    const [showPwd,setShowPwd] = useState(false);

    const {currentExpression,updateExpresssion,currentUrlExpression} = useMoveGirl();


  
    const handleEye =()=>{
        console.log('eye ',currentExpression)
        
        if(showPwd){
            if( currentExpression === 'angryCoverEyes'){
                return;
            }
            updateExpresssion('happyCoverEyesMove')
        }else{
            if(errors.password && currentExpression === 'angryOpenEyes'){
                return;
            }
            updateExpresssion('happyOpenEyesMove')
        }

        setShowPwd((prev)=> !prev);


    }

    const coverEyes = () =>{
        console.log(currentExpression)
        if(currentExpression === 'happyCoverEyesMove' || currentExpression == 'happyOpenEyesMove'){
            return;
        }
        if(errors.password){
            if(showPwd){
                updateExpresssion('angryOpenEyes')
            }else{
                updateExpresssion('angryCoverEyes')
            }
        }
        updateExpresssion('happyCoverEyesMove')
    }
    
    const withCoverEyes = () => {
        if(showPwd && currentExpression === 'happyOpenEyesMove'){
            return;
        }
        if(!errors.username){
            updateExpresssion('neutral')
        }
    }

    useEffect(() => {


        if(errors.username){
            if(showPwd && currentExpression === 'happyOpenEyesMove'){
                updateExpresssion('angryCoverEyes');
                return;
            }
            updateExpresssion('angry');
            
        }else if(showPwd && currentExpression === 'happyOpenEyesMove'){
            return;
        }
        else{
            updateExpresssion('happy')
        }
        

    }, [username,errors.username]);

    useEffect(() => {
        
        // si hay un error
        if(errors.password){
            //  cuando hay un error y la contrasena se muestra y tiene los ojos abiertos
            if(showPwd && currentExpression === 'happyOpenEyesMove'){
                // actualiza la cara enojada con los cojos 
                updateExpresssion('angryOpenEyes');
                return;
            }
            // si la contrasena esta oculta y tiene los ojos tapados
            if(currentExpression === 'happyCoverEyesMove'){
                updateExpresssion('angryCoverEyes');
                return;
            }
        }
        // si no hay errores
        else{
            //  cuando la contrasena se muestra
            if(showPwd && currentExpression !== 'happyOpenEyesMove' ){
                updateExpresssion('happyOpenEyes');
            }
            // cuando no se muestra
            if(currentExpression !== 'happyCoverEyesMove'){
                updateExpresssion('happyCoverEyes')
            }
        }


    }, [password,errors.password]);

    const submit = (data: any) => {
        console.log('enviado')
        console.log(data)
    }


    return (

        <div className='container'>

            <div className="container__image">
                {currentUrlExpression && (
                    <img
                        src={currentUrlExpression}
                        alt="OhImage"
                        className="image"
                    />
                )}
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(submit)} className='container__form'>

                {/* Username */}
                <input
                    className={`container__form__field ${ 
                        errors.username ? 'container__form__field--error' : ''
                    }`} 
                    type="text"
                    placeholder='Username'
                    onFocus={withCoverEyes}
                    {...register('username',{
                        required:{
                            value:true,
                            message:'Username is required'
                        },
                        validate:(value)=>{
                            if(value === 'admin' || value === 'root' || value === 'santy'){
                                return 'Username not available!'
                            }
                        }
                    })}
                />
                {/* Errors */}
                <span className='container__form__error'>
                    {
                        errors.username 
                            &&
                        <div className='form__error__content'>
                            <img className='form__error__icon' src="src/assets/warningIcon.png" alt="" />
                            <p> { String(errors.username.message)} </p>
                        </div>

                    }
                </span>
                
                <div className='container__form__field__password'>
                    {/* Password */}
                    <input
                        className={`container__form__field ${ 
                            errors.password ? 'container__form__field--error' : ''
                        }`} 
                        type={ showPwd ? 'text':'password'}
                        placeholder='Password'
                        onFocus={coverEyes}
                        {...register('password',{
                            required:{
                                value:true,
                                message:'Password is required'
                            },
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Password cannot exceed 20 characters'
                            },
                            pattern: {
                                value: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/,
                                message: 'Password must need contain one special character'
                    
                            }
                        })}
                    />
                    <div onClick={handleEye} className="form__field_password">

                        <img className='field__password__icon' src={ showPwd ? EyeOffIcon : EyeIcon} alt="" />

                    </div>
                </div>

                {/* Errors */}
                <span className='container__form__error'>
                    {
                        errors.password 
                            &&
                        <div className='form__error__content'>
                            <img className='form__error__icon' src="src/assets/warningIcon.png" alt="" />
                            <p> { String(errors.password.message)} </p>
                        </div>

                    }
                </span>

                <button 
                    className='container__form__button '
                >Submit</button>

            </form>
            {/* <DevTool control={control} /> */}
        </div>
       
    )
}

export default Form
