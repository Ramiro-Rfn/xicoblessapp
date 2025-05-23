'use client';
import IconSearch from '@/components/icon/icon-search';
import { Fragment, useState } from 'react';

import { revalidateData } from '@/app/action/revalidateData';
import IconPlus from '@/components/icon/icon-plus';
import IconX from '@/components/icon/icon-x';
import { api } from '@/services/axios';
import { Dialog, Transition } from '@headlessui/react';
import { differenceInCalendarWeeks } from 'date-fns';
import { LucideTrash2 } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Form } from './form';
import UpdateProprietyModal from './updateProprietyModal';


type Project = {
    id: string
    name: string
    location: string
    description: string
    type: string
    geoCoordinates: string
    status: string
    startDate: Date
    endDate: Date
    customerId: string
    url: string
}

interface ProprietiesProjectProps {
    projects: Project[]
}

const ComponentsProprieties = ({ projects }: ProprietiesProjectProps) => {
    const [addContactModal, setAddContactModal] = useState<any>(false);


    function handleAddCustomer(){
        setAddContactModal(true)
    }

    function handleCloseModal() {
        setAddContactModal(false)
    }

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

    async function handleDeleteProject(id: string) {
        try {
            await api.delete(`/project/delete/${id}`)

            showMessage('Projecto deletado com sucesso')

            revalidateData(`/propriedades`)
        } catch (error) {
            showMessage('Erro ao deletar projecto')
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Lista de Propriedades</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleAddCustomer}>
                                <IconPlus className="ltr:mr-2 rtl:ml-2" />
                                Adicionar Projecto
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Pesquisar propriedade" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>



                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {projects.map((propriety) => {
                        return (
                            <div className="relative rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={propriety.id}>
                                <div className="relative rounded-md bg-white text-center shadow dark:bg-[#1c232f]">

                                    <div className=" overflow-hidden p-6 pb-0 h-40 w-full">
                                        <div className="flex w-1/4 absolute top-8 right-4 items-center justify-center">
                                            <button onClick={()=> handleDeleteProject(propriety.id)} className='w-8 h-8 rounded-full flex items-center justify-center bg-gray-100/50 hover:bg-gray-100'>
                                                <LucideTrash2 size={16} />
                                            </button>
                                        </div>
                                        <img className="mx-auto rounded-md max-h-40 w-full object-cover" src={propriety.url  ||`/assets/images/default-home-cover.png`} alt="propriety_image" />
                                    </div>
                                    <div className="relative px-6 pb-24">
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <div className="truncate text-dark text-xl font-medium">{propriety.name}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Status:</div>
                                                <div className="text-white-dark">{propriety.status}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Tipo:</div>
                                                <div className="text-white-dark">{propriety.type}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Periodo:</div>
                                                <div className="text-white-dark">
                                                    {differenceInCalendarWeeks(new Date(propriety.endDate), new Date(propriety.startDate))} Semanas
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                        <Link href={`/propriedades/${propriety.id}`}>
                                            <button type="button" className="btn btn-outline-primary w-auto">
                                                Ver Detalhes
                                            </button>
                                        </Link>

                                        <UpdateProprietyModal project={propriety} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            {/* @ts-ignore */}
            <Transition appear show={addContactModal} as={Fragment}>
                {/* @ts-ignore */}
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-50">
                    {/* @ts-ignore */}
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">

                            {/* @ts-ignore */}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {/* @ts-ignore */}
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
