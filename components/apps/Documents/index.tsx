import { CreateDocumentModal } from "./CreateDocumentModal";
import { DocumentList } from "./DocumentList";

interface Document {
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

interface DocumentsProps {
    projectId: string;
    documents: Document[];
}

export function Documents({ projectId, documents }: DocumentsProps) {


    return (
        <div className="w-full items-center bg-white shadow rounded-md p-4 gap-4">
            <div className="flex justify-between gap-4 border-b-2 border-gray-200 py-2">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">Documentos da obra</h2>
                    <p className="text-sm text-gray-500">
                        Lista de documentos que estão relacionados ao projeto.
                    </p>
                </div>
                <CreateDocumentModal projectId={projectId} />
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <DocumentList documents={documents} projectId={projectId} />
            </div>
        </div>
    );
}
