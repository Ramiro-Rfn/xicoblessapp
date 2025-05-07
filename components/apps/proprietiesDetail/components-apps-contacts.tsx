'use client';

import { revalidateData } from '@/app/action/revalidateData';
import IconEye from '@/components/icon/icon-eye';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { api } from '@/services/axios';
import { differenceInCalendarWeeks, format } from 'date-fns';
import Link from 'next/link';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';
import { Documents } from '../Documents';
import { CreatePhaseModal } from './CreatePhaseModal';
import { EditPhaseModal } from './EditPhaseModal';

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
}

type Phase = {
    id: string
    name: string
    sequenceOrder: number
    startDate: Date
    endDate: Date
    status: string
    projectId: string
    estimatedCost: number
}

type Document = {
    id: string;
    name: string;
    keyName: string;
    size: number;
    contentType: string;
    projectId: string;
    category: string;
    url: string;
    taskId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface ProjectDetailProps {
    project: Project
    phases: Phase[]
    documents: Document[]
}

const ComponentsProprietiesDetail = ({ project, phases, documents }: ProjectDetailProps) => {
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

    async function deletePhase(phaseId: string, projectId: string) {
        try {
            await api.delete(`phase/delete/${phaseId}`)

            showMessage('Fase Apagada')

            revalidateData(`propriedades/${projectId}`)
        } catch (error) {
            showMessage('Erro ao apagar fase')

            console.log(error)
        }
    }

    return (
        <div>
            <div className=" overflow-hidden flex gap-8 p-1 rounded-md text-center" key={project.id}>
                <div className="flex-1 flex overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                    <div className=" overflow-hidden p-6 w-1/2">
                        <img className="mx-auto rounded-md max-h-90 h-full bg-center object-cover" src={`/assets/images/default-home-cover.png`} alt="propriety_image" />
                    </div>
                    <div className="relative px-6 pb-24">
                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                            <div className="flex items-center">
                                <div className="truncate text-3xl font-bold text-black">{project.name}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-white-dark max-w-xl">{project.description}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Status :</div>
                                <div className="text-white-dark">{project.status}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Tipo :</div>
                                <div className="text-white-dark">{project.type}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Localização:</div>
                                <div className="text-white-dark">{project.location}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Previsão de entrega :</div>
                                <div className="text-white-dark">{differenceInCalendarWeeks(new Date(project.endDate), new Date(project.startDate))} Semanas</div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* add a section for projects documents*/}
                <Documents documents={documents} projectId={project.id} />

            </div>


            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
                <h2 className="text-xl">Etapas da obra</h2>
                <CreatePhaseModal projectId={project.id} />
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
                                    <th>Custo estimado</th>
                                    <th>Progresso</th>
                                    <th>Status</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phases.map((phase) => {
                                    return (
                                        <tr key={phase.id}>
                                            <td>{phase.sequenceOrder}</td>
                                            <td>{phase.name}</td>
                                            <td className="whitespace-nowrap">{format(new Date(phase.startDate), "dd/MM/yyyy") }</td>
                                            <td className="whitespace-nowrap">{format(new Date(phase.endDate), "dd/MM/yyyy")}</td>
                                            <td className="whitespace-nowrap">{Intl.NumberFormat('pt', {
                                                currency: 'AOA'
                                            }).format(phase.estimatedCost) } kz</td>
                                            <td className="whitespace-nowrap">
                                                <div className='w-8'>
                                                    <CircularProgressbar value={70} text={`${70}%`} />
                                                </div>
                                            </td>
                                            <td className={"whitespace-nowrap capitalize"} >
                                                <span className='badge badge-outline-primary'>{phase.status}</span>
                                            </td>
                                            <td className='flex justify-end'>
                                                <div className="flex items-center justify-center gap-4">
                                                    <Link href={`/propriedades/etapas/${phase.id}`}>
                                                        <button type="button" className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2">

                                                            <IconEye className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                        </button>
                                                    </Link>

                                                    <EditPhaseModal phase={phase}  />

                                                    <button type="button" onClick={() => deletePhase(phase.id, phase.projectId)}>
                                                        <IconTrashLines className="shrink-0 ltr:mr-2 rtl:ml-2" />
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
