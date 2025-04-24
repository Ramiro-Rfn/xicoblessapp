'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

type FormData = {
    email: string
    password: string
}

const ComponentsAuthLoginForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(schema),
    })

    const router = useRouter();

    async function handleSubmitForm(data: FormData) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/login`, {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: data.email, password: data.password}),
            })

            const { token } = await response.json()

            setCookie(undefined, 'xicobless_token', token, {
                maxAge: 60 * 60 * 24 * 30,
            })

            router.push('/');
        } catch (error) {
            alert("Email ou Senha invalidas")
            console.log(error)
        }
    }

    return (
        <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(handleSubmitForm)}>
            <div>
                <label htmlFor="Email">Email</label>
                <div className="relative text-white-dark">
                    <input {...register('email')}  id="Email" type="email" placeholder="Digite seu Email" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconMail fill={true} />
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Password">Senha</label>
                <div className="relative text-white-dark">
                    <input {...register('password')} id="Password" type="password" placeholder="Digite sua senha" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                </div>
            </div>

            <button type="submit" className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {isSubmitting ? (
                    <Bars
                        height="20"
                        width="20"
                        color="rgb(234 234 234)"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                    ) : (
                    'Entrar'
                )}
            </button>
        </form>
    );
};

export default ComponentsAuthLoginForm;
