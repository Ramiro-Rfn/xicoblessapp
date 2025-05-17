import { api } from "@/services/axios";
import { format } from "date-fns";
import { LucideInfo } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CreateProjectMemberModal } from "./createProjectMemberModal";
import { EditProjectMemberModal } from "./editProjectMemberModal";

interface ProjectMembersProps {
    projectId: string;
}

interface Member {
    id: string;
    employee: {
        id: string;
        fullName: string;
        salary: number;
    }
    role: string;
    startDate: string;
    endDate: string;
    projectId: string;
    employeeId: string;
}

export function ProjectMembers({projectId}: ProjectMembersProps) {
    const [members, setMembers] = useState<Member[]>([])

    async function getMembers() {
        const membersResponse = await api.get(`/project/members/all/${projectId}`)
        setMembers(membersResponse.data)
    }

    function loadMembers(){
        getMembers()
    }

    useEffect(() => {
        getMembers()
    }, [projectId])

    async function deleteMember(memberId: string) {
        try {
            await api.delete(`/project/member/delete/${memberId}`)
            showMessage('Membro removido com sucesso')
            loadMembers()
        } catch (error) {
            showMessage('Erro ao remover membro', 'error')
            console.log(error)
        }
    }

    function showMessage(msg = '', type = 'success') {
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
    }

    return (
        <div className='flex flex-col rounded-md mt-8 flex-1 bg-white shadow p-6 gap-8 dark:bg-[#1c232f]'>

                <div className="flex justify-between border-b-2 border-gray-200">
                    <div className="flex flex-col  pb-4">
                        <h2 className="text-2xl font-bold">Equipe do Projeto</h2>
                        <p className="text-sm text-gray-500">
                        Lista de membros que estão trabalhando no projeto.
                        </p>
                    </div>

                    <div>
                        <CreateProjectMemberModal projectId={projectId} loadMembers={loadMembers} />
                    </div>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Membro 1 */}
                    {members.length === 0 && (
                        <div className="flex col-span-4 flex-col w-full items-center bg-gray-50 rounded-md p-4 shadow-sm">
                            <span className="text-xs text-gray-500">
                                <div className='flex items-center gap-2 justify-center'>
                                    <LucideInfo className='h-4.5 text-gray-500 w-4.5 shrink-0' />
                                    <span className='text-gray-500'>Nenhum membro encontrado</span>
                                </div>
                            </span>
                        </div>
                    )}
                    {members.map((member) => (
                        <div key={member.id} className="flex flex-col items-center bg-gray-50 rounded-md p-4 shadow-sm">
                            {/* Substitua pelo seu ícone */}
                            <span className="mb-2">
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="1.5"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.5"/></svg>
                        </span>
                        <h4 className="font-bold">{member.employee.fullName}</h4>
                        <span className="text-xs text-gray-500">{member.role}</span>
                        <span className="text-[11px] text-gray-400">Salário: R$ {member.employee.salary}</span>
                        <span className="text-[11px] text-gray-400">Data de início: {format(new Date(member.startDate), 'dd/MM/yyyy')}</span>
                        <div className="flex gap-2 mt-2">
                            <EditProjectMemberModal  projectId={projectId} member={member} loadMembers={loadMembers} />
                            <button onClick={() => deleteMember(member.id)} className="btn btn-sm btn-outline-danger">Apagar</button>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
    );
}