import { revalidateData } from '@/app/action/revalidateData';
import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string(),
    assignedTo: yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
})


type FormData = {
    name: string
    assignedTo: string
    startDate: Date
    endDate: Date
}

type Task = {
    id: string
    name: string
    assignedTo: string
    startDate: Date
    endDate: Date
    executionPhaseId: string
    progress: number,
    status: string
}


interface FormProps {
    closeModal: ()=> void
    task: Task
}

export function CreateTaskForm({ closeModal, task }: FormProps) {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: task.name,
            assignedTo: task.assignedTo,
            startDate: new Date(task.startDate).toISOString().split('T')[0],
            endDate: new Date(task.endDate).toISOString().split('T')[0]
        }
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
            const response = await  api.put(`/task/update/${task.id}`, {
                name: data.name,
                assigned_to: data.assignedTo,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
            })

            console.log(response)

            showMessage('Tarefa Editada com sucesso!')


            revalidateData(`propriedades/etapas/${task.executionPhaseId}`)
        } catch (error) {
            showMessage('Erro ao Editar Tarefa!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="name">Nome</label>
                <input {...register('name')} id="name" type="text" placeholder="Digite o nome da tarefa" className="form-input"  />
            </div>

            <div className="mb-5">
                <label htmlFor="assignedTo">Responsável</label>
                <input {...register('assignedTo')} id="assignedTo" type="text" placeholder="Digite o nome do responsável" className="form-input"  />
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