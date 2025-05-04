import { revalidateData } from '@/app/action/revalidateData';
import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    materialId: yup.string(),
    quantity_needed: yup.number().min(1), // Você pode depois transformar isso numa enum de unidades permitidas

})


type FormData = {
    materialId: string
    quantity_needed: string
}


interface FormProps {
    closeModal: ()=> void
    taskId: string
}

export function CreateTaskMaterialForm({ closeModal, taskId }: FormProps) {
    const [materials, setMaterial] = useState([])

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

    useEffect(()=>{
        async function getMaterial(){

            const materialsResponse = await api.get(`/materials/all`)

            const materials = materialsResponse.data

            console.log(materials, "material")

            setMaterial(materials)
        }

        getMaterial()
    }, [])

    async function handleSubmitForm(data: FormData) {
        try {
            const response = await  api.post(`/taskmaterials/create`, {
                material_id: data.materialId,
                quantity_needed: data.quantity_needed,
                task_id: taskId,
            })

            console.log(response)


            showMessage('Material Cadastrar com sucesso!')

            revalidateData(`/propriedades/etapas/tarefa/${taskId}`)
        } catch (error) {
            showMessage('Erro ao cadastrar Material!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>


            <div className="mb-5">
                <label htmlFor="type">Material</label>
                <select {...register('materialId')} id="type" className='form-select'>
                    {materials.map((material)=>{
                        return (
                            <option key={material?.id} value={material.id}>{material.name}</option>
                        )
                    })}

                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="stockQuantity">Quantidade</label>
                <input {...register("quantity_needed")} id="stockQuantity" placeholder='Digite a quantidade' type="number" className="form-input" />
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