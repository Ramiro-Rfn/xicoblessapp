import { revalidateData } from "@/app/action/revalidateData";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { api } from "@/services/axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Swal from "sweetalert2";
import ComponentsTaskMaterial from "../../taskMaterials/components-taskMaterial";
import { CreateTaskMaterialModal } from "../../taskMaterials/createTaskMaterialModal";
import { EditTaskModal } from "../EditTaskModal";


type Task = {
    id: string
    name: string
    assignedTo: string
    startDate: Date
    endDate: Date
    executionPhaseId: string
    progress: number,
    status: string
}

interface TaskMaterialsProps {
    task: Task
}

export function TaskMaterials({ task }: TaskMaterialsProps) {
    const [taskMaterials, setTaskMaterials] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(task.status);
    const fetchTaskMaterials = async () => {
        setIsLoading(true);
        const response = await api.get(`/taskmaterials/all/${task.id}`);

        setTaskMaterials(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsOpen(false)

        fetchTaskMaterials();
    }, []);

    function handleViewTaskMaterials() {
        setIsOpen((prev) => !prev);
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



    async function deleteTask(taskId: string, executionPhaseId: string) {
        try {
            await api.delete(`task/delete/${taskId}`)

            showMessage('Tarefa Apagada')

            revalidateData(`propriedades/etapas/${executionPhaseId}`)
        } catch (error) {
            showMessage('Erro ao apagar tarefa')

            console.log(error)
        }
    }

    function handleLoadMaterials() {
        fetchTaskMaterials()
    }

    function begdeStatus(status: string) {
        if (status === 'pending') {
            return 'Pendente'
        }
        if (status === 'in_progress') {
            return 'Em andamento'
        }
        if (status === 'completed') {
            return 'Concluído'
        }
    }


    function begdeColorStatus(status: string) {
        if (status === 'pending') {
            return 'bg-yellow-500'
        }
        if (status === 'in_progress') {
            return 'bg-blue-500'
        }
        if (status === 'completed') {
            return 'bg-green-500'
        }
    }

    async function handleChangeStatus(status: string) {
        try {
            const response = await api.put(`/task/update/status/${task.id}`, { status })

            const statusResponse = response.data.status

            setStatus(statusResponse)

            showMessage('Status atualizado com sucesso')
            revalidateData(`propriedades/etapas/${task.executionPhaseId}`)
        } catch (error) {
            showMessage('Erro ao atualizar status')

            console.log(error)
        }
    }

    return (
        <div className="flex flex-col panel p-0 ">
            <div key={task.id} className="py-4 px-4 shadow-md rounded-md border-b items-center">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="whitespace-nowrap font-bold text-lg">{task.name}</div>

                        <div className="flex gap-4">
                            <div className="whitespace-nowrap">Prazo: {format(new Date(task.endDate), "dd/MM/yyyy") }</div>
                            <div className="whitespace-nowrap">Responsável: {task.assignedTo}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <div className={"whitespace-nowrap capitalize"} >
                            <div className={`badge rounded-full ${begdeColorStatus(status)}`}>
                                <form action="">
                                    <select className="bg-transparent border-none focus:outline-none" name="status" id="status" value={status} onChange={(e) => handleChangeStatus(e.target.value)}>
                                        <option value="pending">Pendente</option>
                                        <option value="in_progress">Em andamento</option>
                                        <option value="completed">Concluído</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-2 mt-1">
                            <EditTaskModal task={task} />
                            <button type="button" onClick={() => deleteTask(task.id, task.executionPhaseId)}>
                                <IconTrashLines className="shrink-0 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <hr  className="my-4"/>

                <div className="flex font-bold flex-wrap items-center justify-between">
                    <h3 className="text-base">Lista de Materiais</h3>

                    <div className="flex items-center gap-2">
                            <CreateTaskMaterialModal taskId={task.id} loadMaterials={handleLoadMaterials} />

                            <button type="button" onClick={handleViewTaskMaterials}>
                                {isOpen ? (
                                    // @ts-ignore
                                    <FiChevronUp className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                ) : (
                                    // @ts-ignore
                                    <FiChevronDown className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                )}
                            </button>

                    </div>
                </div>

                <div className="transition-all duration-300 overflow-hidden">
                    {isOpen && (
                        <div className="transition-all duration-300 overflow-hidden">
                            <ComponentsTaskMaterial
                                taskMaterials={taskMaterials}
                                taskId={task.id}
                                loadMaterials={fetchTaskMaterials}
                            />
                        </div>
                    )}
                </div>
            </div>




        </div>
    )
}