import { revalidateData } from '@/app/action/revalidateData';
import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
  fullName: yup.string().min(3).max(255).required(),
  email: yup.string().email().nullable(),
  phone: yup.string().required(),
  supportPhone: yup.string().nullable(),
  position: yup.string().min(3).max(255).required(),
  BI: yup.string().min(14).max(14).required(),
  gender: yup.string().oneOf(['male', 'female']).required(),
  birthDate: yup.date().required(),
  address: yup.string().required(),
  salary: yup.number().required(),
})

type FormData = {
    fullName: string
    email: string | null
    phone: string
    supportPhone: string | null
    position: string
    BI: string
    gender: 'male' | 'female'
    birthDate: Date
    address: string
    salary: number
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
        const toast: any = Swal.mixin({
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
        });
    };

    async function handleSubmitForm(data: FormData) {

        console.log(data)

        try {
            const response = await api.post(`/employees/create`, {
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    supportPhone: data.supportPhone,
                    position: data.position,
                    bi: data.BI,
                    gender: data.gender,
                    birthDate: data.birthDate,
                    address: data.address,
                    salary: data.salary,
                },
            )

            showMessage('Colaborador Criado com sucesso!')

            revalidateData('/equipa')
        } catch (error) {
            showMessage('Erro ao criar colaborador!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="fullName">Nome Completo</label>
                <input {...register('fullName')} id="fullName" type="text" placeholder="Digite o nome completo" className="form-input" />
                {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="email">Email</label>
                <input {...register('email')} id="email" type="email" placeholder="Digite o email" className="form-input" />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="phone">Contacto Principal</label>
                <input {...register('phone')} id="phone" type="text" placeholder="Digite o contacto principal" className="form-input" />
                {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="supportPhone">Contacto Alternativo</label>
                <input {...register('supportPhone')} id="supportPhone" type="text" placeholder="Digite o contacto alternativo" className="form-input" />
                {errors.supportPhone && <span className="text-danger">{errors.supportPhone.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="position">Cargo</label>
                <input {...register('position')} id="position" type="text" placeholder="Digite o cargo" className="form-input" />
                {errors.position && <span className="text-danger">{errors.position.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="BI">BI</label>
                <input {...register('BI')} id="BI" type="text" placeholder="Digite o BI" className="form-input" />
                {errors.BI && <span className="text-danger">{errors.BI.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="gender">Género</label>
                <select {...register('gender')} id="gender" className="form-select">
                    <option value="">Selecione o género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                </select>
                {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="birthDate">Data de Nascimento</label>
                <input {...register('birthDate')} id="birthDate" type="date" className="form-input" />
                {errors.birthDate && <span className="text-danger">{errors.birthDate.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="address">Endereço</label>
                <input {...register('address')} id="address" type="text" placeholder="Digite o endereço" className="form-input" />
                {errors.address && <span className="text-danger">{errors.address.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="salary">Salário</label>
                <input {...register('salary')} id="salary" type="number" placeholder="Digite o salário" className="form-input" />
                {errors.salary && <span className="text-danger">{errors.salary.message}</span>}
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