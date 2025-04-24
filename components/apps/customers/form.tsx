import { yupResolver } from '@hookform/resolvers/yup';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  biNif: yup.string().required(),
  address: yup.string().nullable(),
  company: yup.string().nullable()
})

type FormData = {
    name: string
    email: string
    phone: string
    biNif: string
    address: string
    company: string
}

interface FormProps {
    closeModal: ()=> void
}

export function Form({ closeModal }: FormProps) {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(schema),
    })

    const showMessage = (msg = '', type = 'success') => {
        /* const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        }); */
    };

    async function handleSubmitForm(data: FormData) {
        const cookies = parseCookies()
        const token = cookies['xicobless_token']


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/create`, {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    bi_nif: data.biNif,
                    address: data.address,
                    company: data.company,
                }),
            })

            showMessage('Cliente Criado com sucesso!')
        } catch (error) {
            showMessage('Erro ao criar cliente!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="name">Nome</label>
                <input {...register('name')} id="name" type="text" placeholder="Digite o nome" className="form-input"  />
            </div>
            <div className="mb-5">
                <label htmlFor="email">Email</label>
                <input {...register('email')} id="email" type="email" placeholder="Digite o email" className="form-input"  />
            </div>
            <div className="mb-5">
                <label htmlFor="phone">Contacto</label>
                <input {...register('phone')} id="phone" type="text" placeholder="Digite o contacto" className="form-input" />
            </div>
            <div className="mb-5">
                <label htmlFor="BI">BI/NIF</label>
                <input {...register('biNif')} id="BI" type="text" placeholder="Digite o BI/NIF" className="form-input" />
            </div>
            <div className="mb-5">
                <label htmlFor="address">Endereço</label>
                <input {...register('address')} id="address" type="text" placeholder="Digite o endereço" className="form-input" />
            </div>
            <div className="mb-5">
                <label htmlFor="company">Empresa</label>
                <input {...register('company')} id="company" type="text" placeholder="Digite a empresa" className="form-input" />
            </div>
            <div className="mt-8 flex items-center justify-end">
                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" >
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
                        'Adicionar'
                    )}
                </button>
            </div>
        </form>
    )
}