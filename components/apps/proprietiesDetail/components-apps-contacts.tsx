'use client';
import IconUser from '@/components/icon/icon-user';
import { useState } from 'react';

import proprieties from '@/database/propriedades.json';
import stock from '@/database/stock.json';

const ComponentsProprietiesDetail = ({ id }: {id: number}) => {
    const [search, setSearch] = useState<any>('');
    const [propriety] = useState<any>(proprieties.find(p => p.id === id));


    return (
        <div>
            <div className=" overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={propriety.id}>
                <div className="flex overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">

                    <div className=" overflow-hidden p-6">
                        <img className="mx-auto rounded-md max-h-90 w-full object-cover" src={`/assets/images/propriedades/${propriety.imagem}`} alt="propriety_image" />
                    </div>
                    <div className="relative px-6 pb-24">
                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                            <div className="flex items-center">
                                <div className="truncate text-3xl font-bold text-black">{propriety.nome}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-white-dark max-w-xl">{propriety.descricao}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Status :</div>
                                <div className="text-white-dark">{propriety.status}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Area :</div>
                                <div className="text-white-dark">{propriety.area}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Tipo :</div>
                                <div className="text-white-dark">{propriety.tipo}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Andares :</div>
                                <div className="text-white-dark">{propriety.andares}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Previsão de entrega :</div>
                                <div className="text-white-dark">{propriety.previsao_entrega}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Custo estimado :</div>
                                <div className="text-white-dark">{propriety.custo_estimado}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
                <h2 className="text-xl">Lista de Materiais</h2>

            </div>

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
                                {stock.map((stock: any) => {
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
                                                    <button type="button" className="btn btn-sm btn-outline-primary">
                                                        Solicitar
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

export default ComponentsProprietiesDetail;
