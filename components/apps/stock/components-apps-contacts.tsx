'use client';
import IconEye from '@/components/icon/icon-eye';
import IconPencilPaper from '@/components/icon/icon-pencil-paper';
import IconSearch from '@/components/icon/icon-search';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { CreateMaterialModal } from './createMaterialModal';



interface StockProps {
    materials: []
}

const ComponentsStock = ({ materials }: StockProps) => {


    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Lista de Materiais</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <CreateMaterialModal  />
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
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materials.map((stock: any) => {
                                    return (
                                        <tr key={stock.id}>
                                            <td>
                                                <div className="flex w-max items-center">

                                                    <div>{stock.name}</div>
                                                </div>
                                            </td>
                                            <td>{stock.reference}</td>
                                            <td className="whitespace-nowrap">{stock.unit}</td>
                                            <td className="whitespace-nowrap">{stock.stockQuantity}</td>
                                            <td className="whitespace-nowrap">{stock.unitCost}</td>
                                            <td className="whitespace-nowrap">{stock.stockQuantity * stock.unitCost}</td>
                                            <td className='flex justify-end'>
                                                <button type="button" onClick={() => console.log()}>
                                                    <IconEye className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                </button>
                                                <button type="button" onClick={() => console.log()}>
                                                    <IconPencilPaper className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                </button>
                                                <button type="button" onClick={() => console.log()}>
                                                    <IconTrashLines className="shrink-0 ltr:mr-2 rtl:ml-2" />
                                                </button>
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

export default ComponentsStock;
