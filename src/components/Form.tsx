
import EyeIcon from '../assets/icons/Eye.svg';
import EyeOffIcon from '../assets/icons/EyeOff.svg';

import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/form.css'
import useMoveGirl from '../hooks/useMoveGirl';

interface FormData {
    username: string;
    password: string;
}

const Form :FC = ()  => {
    
    // Form
    const { register, handleSubmit, formState, reset, watch } = useForm<FormData>();
    const { errors } = formState;
    // inputs value
    const username = watch('username');
    const password = watch('password');


    const [showPwd,setShowPwd] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false)
    const {currentExpression,updateExpresssion,currentUrlExpression} = useMoveGirl();

  
    const handleEye =():void=>{
        if(showPwd){
            if( currentExpression === 'angryCoverEyes') return;
            updateExpresssion('happyCoverEyesMove')
            
        }else{
            if(errors.password && currentExpression === 'angryOpenEyes') return;
            updateExpresssion('happyOpenEyesMove')
        }
        setShowPwd((prev)=> !prev);
    }

    const onFocusInputPassword = ():void =>{
        if(currentExpression === 'happyCoverEyesMove' 
            || currentExpression == 'happyOpenEyesMove'
        )return;
        if(errors.password){
            if(showPwd){
                updateExpresssion('angryOpenEyes')
            }else{
                updateExpresssion('angryCoverEyes')
            }
        }

        updateExpresssion('happyCoverEyesMove')
    }

    const onFocusInputUsername = ():void => {
        if(showPwd && currentExpression === 'happyOpenEyesMove')return;
        if(!errors.username) updateExpresssion('neutral')
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
            if(currentExpression === 'happyCoverEyesMove'){
                updateExpresssion('happyCoverEyes')
            }
        }


    }, [password,errors.password]);

    useEffect(()=>{
        
        // cuando no hay errores, pondra cara de excitada
        if(!errors.username && !errors.password){
            if(username && password){
                // si no hay erores y existe los dos inputs -> todo OK
                if(password.length !== 0 && username.length !== 0){
                    updateExpresssion('excited');
                }
            }
        }

    },[password,username])

    const submit = (data: any):void => {
        
        setLoading(true);
        console.log(data)
        
        setTimeout(()=>{
            setLoading(false);
            alert(JSON.stringify(data))
            // limpia los inputs
            reset();
        },600)

    }


    return (

        <div className='container'>

            <h1 className='container__title'>Login</h1>
            {/* Imagen de la chica */}
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
                    className={`container__form__field ${ errors.username ? 'container__form__field--error' : ''}`}
                    disabled={loading}
                    type="text"
                    placeholder='Username'
                    onFocus={onFocusInputUsername}
                    {...register('username',{
                        required:{
                            value:true,
                            message:'Username is required'
                        },
                        minLength: {
                            value: 4,
                            message: 'Username must be at least 4 characters long'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Username cannot exceed 20 characters'
                        },
                        validate:(value)=>{
                            if(value === 'admin' || value === 'root' || value === 'santy'){
                                return 'Username not available!'
                            }
                        }
                    })}
                />
                {/* Errors username*/}
                <span className='container__form__error'>
                    {
                        errors.username 
                            &&
                        <div className='form__error__content'>
                            <img className='form__error__icon' src="src/assets/errorIcon.png" alt="" />
                            <p> { String(errors.username.message)} </p>
                        </div>

                    }
                </span>
                
                <div className='container__form__field__password'>
                    {/* Password */}
                    <input
                        className={`container__form__field 
                            ${errors.password?.type === 'required' || errors.password?.type === 'pattern' ? 'container__form__field--error' : ''}
                            ${errors.password?.type === 'minLength' || errors.password?.type == 'maxLength' ? 'container__form__field--warning' : ''} 
                            `
                        } 
                        type={ showPwd ? 'text':'password'}
                        placeholder='Password'
                        onFocus={onFocusInputPassword}
                        disabled={loading}
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
                    {/* contenedor eye */}
                    <div onClick={handleEye} className="form__field_password">
                        <img className='field__password__icon' src={ showPwd ? EyeOffIcon : EyeIcon} alt="" />
                    </div>

                </div>

                {/* Errors password*/}
                <span className={`container__form__error ${errors.password?.type === 'minLength' || errors.password?.type == 'maxLength' ? 'container__form__error--warning' : ''}`
                } 
                >
                    {
                        errors.password 
                            &&
                        <div className='form__error__content'>
                            <img className='form__error__icon' src={`src/assets/${ errors.password.type === 'required' || errors.password.type === 'pattern' ? 'errorIcon.png' : 'warningIcon.png' }`} alt="" />
                            <p> { String(errors.password.message)} </p>
                        </div>

                    }
                </span>
                
                {/* Button */}
                <button
                    disabled={ loading }
                    className='container__form__button '
                >
                    {
                        loading 
                        ? <img className='container__form__button__loading' src="src/assets/loading.svg" alt="" />
                        : 'Submit'
                    }
                </button>

            </form>
            {/* <DevTool control={control} /> */}
        </div>
       
    )
}

export default Form
