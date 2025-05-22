'use client';

import { revalidateData } from "@/app/action/revalidateData";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { api } from "@/services/axios";
import Swal from "sweetalert2";

interface StockProps {
    taskMaterials: any[]
    taskId: string
    loadMaterials: () => void
}

const   ComponentsTaskMaterial = ({ taskMaterials, taskId }: StockProps) => {

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

    async function handleDeleteTaskMaterial(taskMaterialId: string) {
        try {
            await api.delete(`/taskmaterials/delete/${taskMaterialId}`)

            showMessage('Material apagado com sucesso!')
            revalidateData(`/propriedades/etapas/`)
        } catch (error) {
            console.log(error)
            showMessage('Erro ao apagar material!', 'error')
        }
    }

    return (
        <div className="mt-4">
                <div className="panel overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr className="pt-0 ">

                                    <th className='bg-gray-100 font-bold'>Nome</th>
                                    <th className='bg-gray-100 font-bold'>Referência</th>
                                    <th className='bg-gray-100 font-bold'>Unidate</th>
                                    <th className='bg-gray-100 font-bold'>Qtd</th>
                                    <th className='bg-gray-100 font-bold'>Preço unit.</th>
                                    <th className='bg-gray-100 font-bold'>Preço total</th>
                                    <th className='bg-gray-100 font-bold'>Status</th>
                                    <th className='bg-gray-100 font-bold'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskMaterials.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center">
                                            <div className="flex justify-center items-center w-full col-span-6">
                                                Nenhum material encontrado
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {taskMaterials.map((stock: any) => {
                                    return (
                                        <tr key={stock.id}>

                                            <td>
                                                <div className="flex w-max items-center">

                                                    <div>{stock.material?.name}</div>
                                                </div>
                                            </td>
                                            <td>{stock.material?.reference}</td>
                                            <td className="whitespace-nowrap">{stock.material?.unit}</td>
                                            <td className="whitespace-nowrap">{stock.quantityNeeded}</td>
                                            <td className="whitespace-nowrap">{Intl.NumberFormat('pt', {currency: 'AOA'}).format(stock.material?.unitCost) } kz</td>
                                            <td className="whitespace-nowrap font-bold">{Intl.NumberFormat('pt', {currency: 'AOA'}).format(stock.quantityNeeded * stock.material?.unitCost) } kz</td>
                                            <td>
                                                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Aprovado</span>
                                            </td>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    <button onClick={() => handleDeleteTaskMaterial(stock.id)} type="button" className=" text-black py-1 rounded-md">
                                                        <IconTrashLines className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default ComponentsTaskMaterial;
