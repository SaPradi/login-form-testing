import React from "react";
import { render,screen, waitFor } from "@testing-library/react"
import Form from '../../src/components/Form';
import userEvent from '@testing-library/user-event';


describe('Testing in <Form/>',()=>{

    const username:string = 'pepito11';
    const password:string = 'contrasena123$';

    test('Should show a tittle Login ',()=>{

        render( <Form/> )

        const titleElement = screen.getByRole('heading',{level:1});
        expect(titleElement).not.toBeNull();
        expect(titleElement.textContent).toBe('Login');

    });

    test('Should show inputs (username & password & button)',()=>{
        render( <Form/> );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const buttonForm    = screen.getAllByRole('button',{name:'Submit'});

        expect(usernameInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();
        expect(buttonForm).not.toBeNull();

    });

    test('Should assign values to the input for the user event',async()=>{

        render(<Form />);

        const usernameInput:HTMLInputElement = screen.getByRole('textbox',{name: /username/i});
        const passwordInput:HTMLInputElement = screen.getByPlaceholderText('Password');

        await userEvent.type(usernameInput, username);
        await userEvent.type(passwordInput, password);

        expect(usernameInput.value).toBe(username);
        expect(passwordInput.value).toBe(password);
    });

    test('onSubmit is called with all valid fields ', async()=>{
        
        render( <Form/> );
        const usernameInput:HTMLInputElement = screen.getByRole('textbox',{name: /username/i});
        const passwordInput:HTMLInputElement = screen.getByPlaceholderText('Password');
        const buttonForm    = screen.getByRole('button',{name:'Submit'});

        await userEvent.type(usernameInput,username);
        await userEvent.type(passwordInput,password);
        await userEvent.click(buttonForm);
        
        await waitFor(()=>{
            // Verificar que los valores ingresados sean correctos
            expect(usernameInput.value).toBe(username);
            expect(passwordInput.value).toBe(password);

            // Verificar que no haya mensajes de error visibles
            expect(screen.queryByText('Username is required')).toBeNull();
            expect(screen.queryByText('Password is required')).toBeNull();
        });

    });


    test('Should validate username field and show error by required data' , async()=>{

        render( <Form/> );
        const passwordInput:HTMLInputElement = screen.getByPlaceholderText('Password');
        const buttonForm    = screen.getByRole('button',{name:'Submit'});

        await userEvent.type(passwordInput,'contrasena123@');
        await userEvent.click(buttonForm);

        await waitFor(()=>{
         
            expect(screen.queryByText('Username is required')).not.toBeNull();
        });
    });

    test('Should validate username field and show error by length' , async()=>{

        render( <Form/> );
        const usernameInput:HTMLInputElement = screen.getByRole('textbox',{name: /username/i});
        const passwordInput:HTMLInputElement = screen.getByPlaceholderText('Password');
        const buttonForm    = screen.getByRole('button',{name:'Submit'});

        await userEvent.type(usernameInput,'ad');
        await userEvent.type(passwordInput,'contrasena123@');
        await userEvent.click(buttonForm);

        await waitFor(()=>{
            
            expect(screen.queryByText('Username must be at least 4 characters long')).not.toBeNull();
        });
    });

    // test('Should validate ', async()=>{
    //     render( <Form/> );




    // })

})