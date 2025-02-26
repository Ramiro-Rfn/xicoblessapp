import IconX from "@/components/icon/icon-x";
import { Dialog, Transition } from "@headlessui/react";

import propriedades from '@/database/propriedades.json';
import stock from '@/database/stock.json';
import { Fragment, useState } from 'react';

interface AddSolicitationModalProps {
    openSolicitationModal: boolean
    selectedMaterial: number | undefined
    setOpenSolicitationModal: (value: boolean)=> void
}

export function AddSolicitationModal({openSolicitationModal, selectedMaterial, setOpenSolicitationModal }: AddSolicitationModalProps) {
    const [notesList, setNoteList] = useState([])

    const changeValue = (e: any) => {
        const { value, id } = e.target;
    };

    const saveNote = () => {
        setOpenSolicitationModal(false);
    };


    return (
        <Transition appear show={openSolicitationModal} as={Fragment}>
            <Dialog as="div" open={openSolicitationModal} onClose={() => setOpenSolicitationModal(false)} className="relative z-[51]">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[black]/20" />
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
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => setOpenSolicitationModal(false)}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    Nova solicitação de material
                                </div>
                                <div className="p-5">
                                    <form>
                                        <div className="mb-5">
                                            <label htmlFor="name">Material</label>
                                            <select id="user" className="form-select"  onChange={(e) => changeValue(e)}>
                                                {stock.map((material)=>{
                                                    return (
                                                        <option key={material.id} defaultChecked={material.id === selectedMaterial } value={material.nome}>{material.nome}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="title">Quantidade</label>
                                            <input id="title" type="number" placeholder="Digite a quantidade" className="form-input"  onChange={(e) => changeValue(e)} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="tag">Solicitante</label>
                                            <select id="tag" className="form-select" onChange={(e) => changeValue(e)}>
                                            {propriedades.map((propriedade)=>{
                                                    return (
                                                        <option key={propriedade.id} defaultChecked={propriedade.id === selectedMaterial } value={propriedade.nome}>{propriedade.nome}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="desc">Nota</label>
                                            <textarea
                                                id="description"
                                                rows={3}
                                                className="form-textarea resize-none min-h-[130px]"
                                                placeholder="Digite uma nota"
                                                onChange={(e) => changeValue(e)}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setOpenSolicitationModal(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveNote}>
                                                Enviar Solicitação
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
