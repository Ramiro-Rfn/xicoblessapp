import { revalidateData } from '@/app/action/revalidateData';
import { api } from '@/services/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    category: yup.string().required('Categoria é obrigatório'),
})

type FormData = {
    name: string
    description: string
    file: File
    type: string
    category: string
}

interface FormProps {
    closeModal: ()=> void
    projectId: string
}

export function CreateDocumentForm({ closeModal, projectId }: FormProps) {
    const [file, setFile] = useState<File | null>(null);
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
            console.log(file?.type);


            const response = await api.post(`/document/upload/${projectId}`, {
                name: data.name,
                contentType: file?.type,
                size: file?.size,
                category: data.category,
            });

            const responseData = response.data

            await axios.put(responseData.signedUrl, file, {
                headers: {
                    'Content-Type': String(file?.type),
                }
            })

            console.log(response);
            showMessage('Documento criado com sucesso!');
            revalidateData(`propriedades/${projectId}`);
            closeModal();
        } catch (error) {
            showMessage('Erro ao criar documento!', 'error');
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="name">Nome</label>
                <input {...register('name')} id="name" type="text" placeholder="Digite o nome do documento" className="form-input" />
                {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-5">
                <label htmlFor="category">Categoria</label>
                <input {...register('category')} id="category" type="text" placeholder="Digite a categoria do documento" className="form-input" />
            </div>


            <div className="mb-5">
                <label htmlFor="file">Arquivo</label>
                <input onChange={(e) => setFile(e.target.files?.[0] || null)} id="file" type="file" className="form-input" />

            </div>

            <div className="mt-8 flex items-center justify-end">
                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
