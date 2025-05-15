'use client';
import { revalidateData } from '@/app/action/revalidateData';
import IconSearch from '@/components/icon/icon-search';
import IconUser from '@/components/icon/icon-user';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { api } from '@/services/axios';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { Form } from './form';

type Employee = {
    id: string
    fullName: string
    email: string | null
    phone: string
    supportPhone: string | null
    position: string
    bi: string
    gender: 'male' | 'female'
    birthDate: Date
    address: string
}

interface EmployeesPros {
    employees: Employee[]
}

const Employees = ({ employees }: EmployeesPros) => {
    const [addEmployeeModal, setAddEmployeeModal] = useState<any>(false);
    const [value, setValue] = useState<any>('grid');

    function handleAddEmployee(){
        setAddEmployeeModal(true)
    }

    function handleCloseModal() {
        setAddEmployeeModal(false)
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

    async function handleDeleteEmployee(id: string) {
        try {
            await api.delete(`/employees/delete/${id}`)

            showMessage('Colaborador eliminado com sucesso!')
            revalidateData('/equipa')
        } catch (error) {
            showMessage('Erro ao eliminar colaborador!', 'error')
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Colaboradores</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Adicionar Colaboradores
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Pesquisar Colaboradores" className="peer form-input py-2 ltr:pr-11 rtl:pl-11"  />
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
                                    <th className="bg-gray-100">Nome Completo</th>
                                    <th className="bg-gray-100">Email</th>
                                    <th className="bg-gray-100">Cargo</th>
                                    <th className="bg-gray-100">Contacto</th>
                                    <th className="bg-gray-100">Contacto Alternativo</th>
                                    <th className="bg-gray-100">BI</th>
                                    <th className="bg-gray-100">Género</th>
                                    <th className="bg-gray-100">Data Nascimento</th>
                                    <th className="bg-gray-100">Endereço</th>
                                    <th className="!text-center">Acções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="text-center">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <p>Nenhum colaborador encontrado</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {employees.map((employee: Employee) => {
                                    return (
                                        <tr key={employee.id}>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    <div className="grid h-8 w-8 place-content-center rounded-full bg-primary text-sm font-semibold text-white ltr:mr-2 rtl:ml-2">
                                                        <IconUser className="h-4.5 w-4.5" />
                                                    </div>
                                                    <div>{employee.fullName}</div>
                                                </div>
                                            </td>
                                            <td>{employee.email || '-'}</td>
                                            <td>{employee.position}</td>
                                            <td className="whitespace-nowrap">{employee.phone}</td>
                                            <td className="whitespace-nowrap">{employee.supportPhone || '-'}</td>
                                            <td className="whitespace-nowrap">{employee.bi}</td>
                                            <td className="whitespace-nowrap">{employee.gender === 'male' ? 'Masculino' : 'Feminino'}</td>
                                            <td className="whitespace-nowrap">{new Date(employee.birthDate).toLocaleDateString('pt-PT')}</td>
                                            <td className="whitespace-nowrap">{employee.address}</td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button type="button" className="btn btn-sm btn-outline-primary" >
                                                        Editar
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" >
                                                        Eliminar
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
            )}


            {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {employees.map((employee: Employee) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={employee.id}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="rounded-t-md bg-white/40 bg-[url('/assets/notification-bg.png')] bg-cover bg-center  p-6 pb-0">
                                        <div className="mx-auto grid h-28 w-40 place-content-center rounded-md bg-primary text-xl font-semibold text-white">
                                            <IconUser className="h-10 w-10" />
                                        </div>
                                    </div>
                                    <div className="relative -mt-4 px-6 pb-20
                                    ">
                                        <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                                            <div className="text-xl">{employee.fullName}</div>
                                            <div className="text-white-dark">{employee.position}</div>
                                            <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                                <div className="flex items-center">
                                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Email:</div>
                                                    <div className="truncate text-white-dark">{employee.email || '-'}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Telefone:</div>
                                                    <div className="text-white-dark">{employee.phone}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex-none ltr:mr-2 rtl:ml-2">BI:</div>
                                                    <div className="text-white-dark">{employee.bi}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Género:</div>
                                                    <div className="text-white-dark">{employee.gender === 'male' ? 'Masculino' : 'Feminino'}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Data Nascimento:</div>
                                                    <div className="text-white-dark">{new Date(employee.birthDate).toLocaleDateString('pt-PT')}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Endereço:</div>
                                                    <div className="text-white-dark">{employee.address}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 mt-2 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                        <button type="button" className="btn btn-outline-primary w-1/2">
                                            Editar
                                        </button>
                                        <button type="button" className="btn btn-outline-danger w-1/2" onClick={() => handleDeleteEmployee(employee.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Transition appear show={addEmployeeModal} as={Fragment}>
                <Dialog as="div" open={addEmployeeModal} onClose={() => setAddEmployeeModal(false)} className="relative z-50">
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
                                        onClick={() => setAddEmployeeModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        Adicionar Colaborador
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

export default Employees;
