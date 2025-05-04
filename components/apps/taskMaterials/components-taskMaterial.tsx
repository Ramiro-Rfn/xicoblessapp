'use client';
import IconSearch from '@/components/icon/icon-search';
import { CreateTaskMaterialModal } from './createTaskMaterialModal';



interface StockProps {
    taskMaterials: []
    taskId: string
}

const ComponentsTaskMaterial = ({ taskMaterials, taskId }: StockProps) => {


    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Lista de Materiais</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <CreateTaskMaterialModal taskId={taskId}  />
                        </div>

                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Referência</th>
                                    <th>Unidate</th>
                                    <th>Quantidade</th>
                                    <th>Preço unit.</th>
                                    <th>Preço total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskMaterials.map((stock: any) => {
                                    return (
                                        <tr key={stock.id}>
                                            <td>
                                                <div className="flex w-max items-center">

                                                    <div>{stock.material.name}</div>
                                                </div>
                                            </td>
                                            <td>{stock.material.reference}</td>
                                            <td className="whitespace-nowrap">{stock.material.unit}</td>
                                            <td className="whitespace-nowrap">{stock.quantityNeeded}</td>
                                            <td className="whitespace-nowrap">{Intl.NumberFormat('pt', {currency: 'AOA'}).format(stock.material.unitCost) } kz</td>
                                            <td className="whitespace-nowrap">{Intl.NumberFormat('pt', {currency: 'AOA'}).format(stock.quantityNeeded * stock.material.unitCost) } kz</td>
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
