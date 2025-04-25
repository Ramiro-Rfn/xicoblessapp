import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string(),
    location: yup.string(),
    description: yup.string().nullable(),
    type: yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    customerId: yup.string(),
})

type FormData = {
    name: string
    location: string
    description: string
    type: string
    startDate: Date
    endDate: Date
    customerId: string
}

type Customer = {
    id: string
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

    const [customers, setCustomers] = useState<Customer[]>([])

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


        try {
            const response = await  api.post('/project/create', {
                name: data.name,
                location: data.location,
                description: data.description,
                type: data.type,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                customer_id: data.customerId
            })

            const project = response.data

            showMessage('Cliente Criado com sucesso!')
        } catch (error) {
            showMessage('Erro ao criar cliente!', 'error')
            console.log(error)
        }
    }

    useEffect(()=>{
        async function getCustomers() {

            const customersResponse = await api.get("customers/all")

            const customers = await customersResponse.data

            setCustomers(customers)
        }


        getCustomers()
    }, [])

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="name">Nome</label>
                <input {...register('name')} id="name" type="text" placeholder="Digite o nome" className="form-input"  />
            </div>


            <div className="mb-5">
                <label htmlFor="type">Cliente</label>
                <select {...register('customerId')} id="type" className='form-select'>
                    {customers.map((customer)=>{
                        return (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        )
                    })}

                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="location">Endereço</label>
                <input {...register('location')} id="location" type="text" placeholder="Digite o email" className="form-input"  />
            </div>
            <div className="mb-5">
                <label htmlFor="type">Tipo</label>
                <select {...register('type')} id="type" className='form-select'>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Pública">Pública</option>
                </select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="mb-5">
                    <label htmlFor="address">Data de início</label>
                    <input {...register('startDate')} id="address" type="date" placeholder="Digite o endereço" className="form-input" />
                </div>
                <div className="mb-5">
                    <label htmlFor="endDate">Data de término</label>
                    <input {...register('endDate')} id="endDate" type="date" className="form-input" />
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="description">Descrição</label>
                <textarea {...register('description')} id="description" className="form-textarea" />
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