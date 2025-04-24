'use client';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import IconUser from '@/components/icon/icon-user';
import IconUserPlus from '@/components/icon/icon-user-plus';
import { Fragment, useEffect, useState } from 'react';

import IconX from '@/components/icon/icon-x';
import proprieties from '@/database/propriedades.json';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Form } from '../customers/form';

const ComponentsProprieties = () => {
    const [value, setValue] = useState<any>('grid');

    const [search, setSearch] = useState<any>('');
    const [proprietiesList] = useState<any>(proprieties);

    const [filteredItems, setFilteredItems] = useState<any>(proprietiesList);

    const searchpropriety = () => {
        setFilteredItems(() => {
            return proprietiesList.filter((item: any) => {
                return item.nome.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchpropriety();
    }, [search]);


    const [addContactModal, setAddContactModal] = useState<any>(false);


    function handleAddCustomer(){
        setAddContactModal(true)
    }

    function handleCloseModal() {
        setAddContactModal(false)
    }



    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Lista de Propriedades</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleAddCustomer}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add propriety
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Pesquisar propriedade" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>Status</th>
                                    <th>Area</th>
                                    <th>Tipo</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((propriety: any) => {
                                    return (
                                        <tr key={propriety.id}>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    {propriety.imagem && (
                                                        <div className="w-max">
                                                            <img src={`/assets/images/propriedades/${propriety.imagem}`} className="h-8 w-8 rounded-md object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                    )}
                                                    {!propriety.imagem && propriety.nome && (
                                                        <div className="grid h-8 w-8 place-content-center rounded-full bg-primary text-sm font-semibold text-white ltr:mr-2 rtl:ml-2"></div>
                                                    )}
                                                    {!propriety.imagem && !propriety.nome && (
                                                        <div className="rounded-full border border-gray-300 p-2 ltr:mr-2 rtl:ml-2 dark:border-gray-800">
                                                            <IconUser className="h-4.5 w-4.5" />
                                                        </div>
                                                    )}
                                                    <div>{propriety.nome}</div>
                                                </div>
                                            </td>
                                            <td>{propriety.area}</td>
                                            <td className="whitespace-nowrap">{propriety.status}</td>
                                            <td className="whitespace-nowrap">{propriety.tipo}</td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <Link href={`/propriedades/${propriety.id}`}>
                                                        <button type="button" className="btn btn-sm btn-outline-primary">
                                                            Ver Detalhes
                                                        </button>
                                                    </Link>

                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredItems.map((propriety: any) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={propriety.id}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">

                                    <div className=" overflow-hidden p-6 pb-0">
                                        <img className="mx-auto rounded-md max-h-40 w-full object-cover" src={`/assets/images/propriedades/${propriety.imagem}`} alt="propriety_image" />
                                    </div>
                                    <div className="relative px-6 pb-24">
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <div className="truncate text-dark text-xl font-medium">{propriety.nome}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Status :</div>
                                                <div className="text-white-dark">{propriety.status}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Area :</div>
                                                <div className="text-white-dark">{propriety.area}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                        <Link href={`/propriedades/${propriety.id}`}>
                                            <button type="button" className="btn btn-outline-primary w-auto">
                                                Ver Detalhes
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        Adicionar Cliente
                                    </div>
                                    <div className="p-5">
                                        <Form closeModal={handleCloseModal} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ComponentsProprieties;
