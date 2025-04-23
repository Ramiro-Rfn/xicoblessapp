'use client';
import { useState } from 'react';

import proprieties from '@/database/propriedades.json';
import Tasks from '@/database/tasks.json';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ComponentsProprietiesDetail = ({ id }: {id: number}) => {
    const [search, setSearch] = useState<any>('');
    const [propriety] = useState<any>(proprieties.find(p => p.id === id));


    return (
        <div>
            <div className=" overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={propriety.id}>

                <div className="flex overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">



                    <div className="relative px-6 py-6">
                        <div className="flex mb-4 items-center">
                            <div className="truncate text-3xl font-bold text-black">Fundação</div>
                        </div>

                        <div className='flex gap-8'>
                            <div className="flex items-center">
                                <div className="w-32">
                                    <CircularProgressbar value={79} text={`${79}%`} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 ltr:text-left rtl:text-right">
                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Tempo Estimado:</p>
                                    <h4 className="text-dark text-lg font-bold">14/10/24 - 21/10/25</h4>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Tempo real:</p>
                                    <h4 className="text-dark text-lg font-bold">14/10/24 - 21/10/25</h4>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Custo Estimado:</p>
                                    <h4 className="text-dark text-3xl font-bold">100.000 kz</h4>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Custo real:</p>
                                    <h4 className="text-dark text-3xl font-bold">150.000 kz</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
                <h2 className="text-xl">Tarefas</h2>

            </div>

            <div className="panel mt-5 overflow-hidden border-0 p-0">
            {/* <ComponentsDatatablesBasic /> */}
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Ordem</th>
                                    <th>Nome</th>
                                    <th>Data início</th>
                                    <th>Data início</th>
                                    <th>Responsável</th>
                                    <th>Progresso</th>
                                    <th>Status</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Tasks.map((stock) => {
                                    return (
                                        <tr key={stock.id}>
                                            <td>{stock.id}</td>
                                            <td>{stock.name}</td>
                                            <td className="whitespace-nowrap">{stock.start_date}</td>
                                            <td className="whitespace-nowrap">{stock.end_date}</td>
                                            <td className="whitespace-nowrap">{stock.assigned_to}</td>
                                            <td className="whitespace-nowrap">
                                                <div className='w-8'>
                                                    <CircularProgressbar value={stock.progress} text={`${stock.progress}%`} />
                                                </div>
                                            </td>
                                            <td className={"whitespace-nowrap capitalize"} >
                                                <span className='badge badge-outline-primary'>{stock.status}</span>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button type="button" className="btn btn-sm btn-outline-primary">
                                                        Ver
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-success">
                                                        Editar
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
