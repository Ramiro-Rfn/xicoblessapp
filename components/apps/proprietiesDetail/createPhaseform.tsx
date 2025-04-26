import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string(),
    sequenceOrder: yup.number(),
    estimatedCost: yup.number(),
    startDate: yup.date(),
    endDate: yup.date(),
})


type FormData = {
    name: string
    sequenceOrder: number
    startDate: Date
    endDate: Date
    estimatedCost: number
}


interface FormProps {
    closeModal: ()=> void
    projectId: string
}

export function CreatePhaseForm({ closeModal, projectId }: FormProps) {

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


        try {
            const response = await  api.post(`/phase/create/${projectId}`, {
                name: data.name,
                sequence_order: data.sequenceOrder,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                estimated_cost: data.estimatedCost
            })

            console.log(response)

            showMessage('Fase Criado com sucesso!')
        } catch (error) {
            showMessage('Erro ao criar Fase!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="name">Nome</label>
                <input {...register('name')} id="name" type="text" placeholder="Digite o nome da fase" className="form-input"  />
            </div>

            <div className="mb-5">
                <label htmlFor="sequenceOrder">Ordem de execução</label>
                <input {...register('sequenceOrder')} id="sequenceOrder" type="number" placeholder="Digite a ordem de execução" className="form-input"  />
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
                <label htmlFor="estimatedCost">Custo Estimado</label>
                <input {...register('estimatedCost')} id="estimatedCost" type="number" placeholder='Digite o custo estimado' className="form-input" />
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