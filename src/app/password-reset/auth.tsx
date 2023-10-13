import React, { FC, useState } from 'react';
import SignInForm from '../../app/page';
import PasswordResetForm from '../../app/password-reset';

const AuthPage: FC = () => {
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const togglePasswordReset = () => {
        setIsPasswordReset((prev) => !prev);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center drop-shadow-md">
            <div className="w-full max-w-lg flex border h-1/2">
                <div className="flex flex-col items-center justify-center w-full space-y-7">
                    <h1 className="text-4xl font-bold">
                        {isPasswordReset ? 'Restablecer contraseña' : 'Iniciar sesión'}
                    </h1>
                    <form
                        onSubmit={
                            handleSubmit(
                                isPasswordReset ? onResetPassword : onSubmit
                            )
                        }
                        className=""
                    >
                        {isPasswordReset ? (
                            <PasswordResetForm
                                register={register}
                                formState={formState}
                            />
                        ) : (
                            <SignInForm
                                register={register}
                                handleSubmit={handleSubmit}
                                onSubmit={onSubmit}
                                formState={formState}
                            />
                        )}
                    </form>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={togglePasswordReset}
                            className="text-sm text-blue-600"
                        >
                            {isPasswordReset
                                ? 'Volver al inicio de sesión'
                                : '¿Olvidaste tu contraseña?'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
