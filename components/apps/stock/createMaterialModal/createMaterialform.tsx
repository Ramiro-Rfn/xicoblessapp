import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    reference: yup.string().min(2),
    name: yup.string().trim().min(2),
    unit: yup.string().trim().min(1), // Você pode depois transformar isso numa enum de unidades permitidas
    unitCost: yup.number().positive(),
    stockQuantity: yup.number().positive(),
})


type FormData = {
    name: string
    reference: string
    unit: string
    unitCost: number
    stockQuantity: number
}


interface FormProps {
    closeModal: ()=> void
}

export function CreateMaterialForm({ closeModal }: FormProps) {

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
            const response = await  api.post(`/material/create`, {
                name: data.name,
                reference: data.reference,
                unit: data.unit,
                unitCost: data.unitCost,
                stockQuantity: data.stockQuantity
            })

            console.log(response)

            showMessage('Material Cadastrar com sucesso!')
        } catch (error) {
            showMessage('Erro ao cadastrar Material!', 'error')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="name">Nome</label>
                <input {...register('name')} id="name" type="text" placeholder="Digite o nome do material" className="form-input"  />
            </div>

            <div className="mb-5">
                <label htmlFor="reference">Referência</label>
                <input {...register('reference')} id="reference" type="text" placeholder="Digite a referência" className="form-input"  />
            </div>

            <div className="mb-5">
                <label htmlFor="unit">Unidade</label>
                <input {...register('unit')} id="unid" type="text" placeholder="Digite a unidade" className="form-input" />
            </div>

            <div className="mb-5">
                <label htmlFor="stockQuantity">Quantidade</label>
                <input {...register("stockQuantity")} id="stockQuantity" placeholder='Digite a quantidade' type="number" className="form-input" />
            </div>

            <div className="mb-5">
                <label htmlFor="unitCost">Preço unitário</label>
                <input {...register("unitCost")} id="unitCost" placeholder='Digite o preço unitário' type="number" className="form-input" />
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