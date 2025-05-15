import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    employeeId: yup.string().required(),
    role: yup.string().required(),
    startDate: yup.string().required(),
})


type FormData = {
    employeeId: string
    role: string
    startDate: string
}


interface FormProps {
    closeModal: ()=> void
    projectId: string
    loadMembers: () => void
}

type Employee = {
    id: string
    fullName    : string
}

export function CreateTaskMaterialForm({ closeModal, projectId, loadMembers }: FormProps) {
    const [employees, setEmployees] = useState<Employee[]>([])

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            employeeId: employees[0]?.id,
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

    useEffect(()=>{
        async function getEmployees(){

            const employeesResponse = await api.get(`/employees/all`)

            const employees = employeesResponse.data

            console.log(employees, "employees")

            setEmployees(employees)
        }

        getEmployees()
    }, [])

    async function handleSubmitForm(data: FormData) {
        try {
            const response = await  api.post(`/project/member/create`, {
                employeeId: data.employeeId,
                role: data.role,
                startDate: data.startDate,
                projectId: projectId,
            })

            console.log(response)


            showMessage('Material Cadastrar com sucesso!')

            loadMembers()
        } catch (error) {
            showMessage('Erro ao cadastrar Membro!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>


            <div className="mb-5">
                <label htmlFor="type">Colaborador</label>
                <select {...register('employeeId')} id="type" className='form-select'>
                    {employees.map((employee)=>{
                        return (
                            <option key={employee?.id} value={employee.id}>{employee.fullName}</option>
                        )
                    })}

                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="role">Cargo</label>
                <input {...register("role")} id="role" placeholder='Digite o cargo' type="text" className="form-input" />
            </div>

            <div className="mb-5">
                <label htmlFor="startDate">Data de início</label>
                <input {...register("startDate")} id="startDate" placeholder='Digite a data de início' type="date" className="form-input" />
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