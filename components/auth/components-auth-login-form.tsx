'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ComponentsAuthLoginForm = () => {
    const [emailField,setEmailField] = useState("")
    const [passwordField,setPasswordField] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();
    const submitForm = async (e: any) => {
        e.preventDefault();

        if(!emailField || !passwordField) {
            return alert("Email ou senha vazias")
        }

        setIsLoading(true)

        const response = await fetch('http://localhost:3000/api/auth', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: emailField, password: passwordField})
        })

        if(response.status === 200) {
            router.push('/');
        }else {
            alert("Email ou Senha invalidas")
        }

        setIsLoading(false)
    };

    return (
        <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
            <div>
                <label htmlFor="Email">Email</label>
                <div className="relative text-white-dark">
                    <input onChange={(e)=> setEmailField(e.target.value)} id="Email" type="email" placeholder="Digite seu Email" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconMail fill={true} />
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Password">Senha</label>
                <div className="relative text-white-dark">
                    <input onChange={(e)=> setPasswordField(e.target.value)}  id="Password" type="password" placeholder="Digite sua senha" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                </div>
            </div>

            <button type="submit" className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {
                    isLoading ? "Carregando...": "Entrar"
                }
            </button>
        </form>
    );
};

export default ComponentsAuthLoginForm;
