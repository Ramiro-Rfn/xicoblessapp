'use client';
import IconPlus from '@/components/icon/icon-plus';
import IconSearch from '@/components/icon/icon-search';
import IconUser from '@/components/icon/icon-user';
import { useEffect, useState } from 'react';

import stock from '@/database/stock.json';

import { AddSolicitationModal } from '../Solicitation/addSolicitaticonModal';

const ComponentsStock = () => {
    const [value, setValue] = useState<any>('list');

    const [addSolicitationModal, setAddSolicitationModal] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<number | undefined>(undefined);

    function ChangeModalStatus(value: boolean, selectedMaterialId?: number) {
        setAddSolicitationModal(value)

        setSelectedMaterial(selectedMaterialId)
    }

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>(stock);

    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    const searchContact = () => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.nome.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchContact();
    }, [search]);

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Lista de Materiais</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" >
                                <IconPlus className="ltr:mr-2 rtl:ml-2" />
                                Adicionar material
                            </button>
                        </div>

                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Unidate</th>
                                    <th>Quantidade</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((stock: any) => {
                                    return (
                                        <tr key={stock.id}>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    {stock.imagem && (
                                                        <div className="w-max">
                                                            <img src={`/assets/images/stock/${stock.imagem}`} className="h-8 w-8 rounded-md object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                    )}
                                                    {!stock.imagem && stock.nome && (
                                                        <div className="grid h-8 w-8 place-content-center rounded-md bg-primary text-sm font-semibold text-white ltr:mr-2 rtl:ml-2"></div>
                                                    )}
                                                    {!stock.imagem && !stock.nome && (
                                                        <div className="rounded-full border border-gray-300 p-2 ltr:mr-2 rtl:ml-2 dark:border-gray-800">
                                                            <IconUser className="h-4.5 w-4.5" />
                                                        </div>
                                                    )}
                                                    <div>{stock.nome}</div>
                                                </div>
                                            </td>
                                            <td>{stock.categoria}</td>
                                            <td className="whitespace-nowrap">{stock.unidade}</td>
                                            <td className="whitespace-nowrap">{stock.estoque}</td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button onClick={()=> ChangeModalStatus(true, stock.id)} type="button" className="btn btn-sm btn-outline-primary">
                                                        Solicitar
                                                    </button>


                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <AddSolicitationModal
                            openSolicitationModal={addSolicitationModal}
                            setOpenSolicitationModal={ChangeModalStatus}
                            selectedMaterial={selectedMaterial}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComponentsStock;
