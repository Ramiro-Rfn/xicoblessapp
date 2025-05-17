'use client';

import { revalidateData } from '@/app/action/revalidateData';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { api } from '@/services/axios';
import { differenceInCalendarWeeks, format } from 'date-fns';
import { LucideEye, LucideInfo } from 'lucide-react';
import Link from 'next/link';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';
import { Documents } from '../Documents';
import { CreatePhaseModal } from './CreatePhaseModal';
import { EditPhaseModal } from './EditPhaseModal';
import { ProjectMembers } from './ProjectMembers';
import { ProjectImage } from './ProjectMembers/ProjectImage';

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
    image: string
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

            revalidateData(`/propriedades/${projectId}`)
        } catch (error) {
            showMessage('Erro ao apagar fase')

            console.log(error)
        }
    }

    function begdeStatus(status: string) {
        if (status === 'planned') {
            return 'Pendente'
        }
        if (status === 'in_progress') {
            return 'Em andamento'
        }
        if (status === 'done') {
            return 'Concluído'
        }
    }


    function begdeColorStatus(status: string) {
        if (status === 'planned') {
            return 'bg-yellow-500'
        }
        if (status === 'in_progress') {
            return 'bg-blue-500'
        }
        if (status === 'done') {
            return 'bg-green-500'
        }
    }

    return (
        <div>
            <div className=" flex flex-col gap-8 p-1 rounded-md text-center" key={project.id}>
                <div className="flex-1 flex overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                    <div className="overflow-hidden h-full p-6">
                        <ProjectImage image={project.image} projectId={project.id} />
                    </div>
                    <div className="relative px-6">
                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                            <div className="flex items-center">
                                <div className="truncate text-3xl font-bold text-black">{project.name}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-white-dark max-w-xl">{project.description}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-none ltr:mr-2 rtl:ml-2">Status :</div>
                                <div className="text-white-dark capitalize">{ begdeStatus(project.status)}</div>
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

            </div>




            <div className="flex items-end justify-between gap-4 mt-10">

                <div className='flex flex-col'>
                    <h2 className="text-xl font-bold">Etapas da obra</h2>
                    <p className='text-gray-500'>Lista de etapas que compõem o projeto</p>
                </div>
                <CreatePhaseModal projectId={project.id} />

            </div>

            <div className="panel mt-5 overflow-hidden border-0 p-0">
            {/* <ComponentsDatatablesBasic /> */}
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead className='bg-gray-500 dark:bg-[#1c232f]'>
                                <tr className='bg-gray-500 dark:bg-[#1c232f]'>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Ordem</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Nome</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Data início</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Data início</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Custo estimado</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Progresso</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Status</th>
                                    <th className='bg-gray-300 dark:bg-[#1c232f]'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!phases.length && (
                                    <tr>
                                        <td colSpan={8} className='text-center'>
                                            <div className='flex items-center gap-2 justify-center'>
                                                <LucideInfo className='h-4.5 text-gray-500 w-4.5 shrink-0' />
                                                <span className='text-gray-500'>Nenhuma etapa encontrada</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
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
                                                <span className={`badge badge-outline-primary ${begdeColorStatus(phase.status)}`}>{begdeStatus(phase.status)}</span>
                                            </td>
                                            <td className='flex items-center'>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/propriedades/etapas/${phase.id}`} className="h-4.5 w-4.5">
                                                        <button type="button" className="">
                                                            <LucideEye size={20} className="shrink-0" />
                                                        </button>
                                                    </Link>

                                                    <EditPhaseModal phase={phase}  />

                                                    <button type="button" onClick={() => deletePhase(phase.id, phase.projectId)}>
                                                        <IconTrashLines className="shrink-0" />
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

            <div className="w-full mt-10">
                <Documents documents={documents} projectId={project.id} />
            </div>
            <div className="w-full mt-10">
                <ProjectMembers projectId={project.id} />
            </div>

        </div>
    );
};

export default ComponentsProprietiesDetail;
