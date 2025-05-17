import { api } from "@/services/axios"
import axios from "axios"
import { LucideAlertCircle, LucideCamera } from "lucide-react"
import { useEffect, useState } from "react"

interface ProjectImageProps {
    image: string
    projectId: string
}

export function ProjectImage({ image, projectId }: ProjectImageProps) {
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [upLoadImageUrl, setUpLoadImageUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<any>(undefined)
    const [progress, setProgress] = useState(0)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        setImageFile(file || null)
    }

    const handleImageUpload = async () => {
        if (!imageFile) return

        setError(undefined)

        setIsUploading(true)

        const formData = new FormData()
        formData.append('image', imageFile)

        const imageUrl = URL.createObjectURL(imageFile)

        setUpLoadImageUrl(imageUrl)


        try {
            const response = await api.post(`/project/coverimage/upload/${projectId}`, {
                name: imageFile.name,
                contentType: imageFile.type,
                size: imageFile.size,
                category: 'image',
            });

            const responseData = response.data

            await axios.put(responseData.signedUrl, imageFile, {
                headers: {
                    'Content-Type': String(imageFile?.type),
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1))
                    setProgress(progress)
                },
            })

            setProgress(0)
            setIsUploading(false)
        } catch (error) {
            console.log(error)
            setError(error)
            setProgress(0)
            setIsUploading(false)
            setImageFile(null)
            setUpLoadImageUrl('')
        }



    }

    useEffect(() => {
        if (imageFile) {
            handleImageUpload()
        }
    }, [imageFile])

    return (
        <div className='h-64 rounded-md relative w-80 overflow-hidden bg-gray-200'>
            {error && (
                <div className="absolute top-0 left-0 w-full h-full bg-red-500/50 flex items-center justify-center">
                    <div className="text-white flex items-center gap-2 flex-col text-2xl font-bold">
                        <LucideAlertCircle size={20} />
                        <span className="text-white text-sm">
                            Erro ao carregar imagem
                        </span>
                    </div>
                </div>
            )}
            {isUploading && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="text-white text-2xl font-bold">
                        {progress}%
                    </div>
                </div>
            )}
            <div className=''>
                <form action="">
                    <label htmlFor="image" className="absolute flex items-center justify-center cursor-pointer hover:opacity-80   bottom-4 right-4 w-10 h-10 bg-gray-500  rounded-md">
                        <LucideCamera size={20} className="shrink-0 text-white" />
                    </label>
                    <input type="file" id="image" name="image" className="hidden" onChange={handleImageChange} />
                </form>
            </div>
            <img className="h-full w-full object-cover" src={ upLoadImageUrl || image || '/assets/images/default-home-cover.png'} alt="propriety_image" />
        </div>
    )
}