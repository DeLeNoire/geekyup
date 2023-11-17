import React from 'react'
import {useDropzone} from 'react-dropzone'
import {Inbox} from 'lucide-react'
// import { log } from 'console'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const FileUpload = () => {

    const {mutate} = useMutation({
        mutationFn: async ({fileKey , fileName}: {fileKey: string , fileName: string}) => {
            const response = await axios.post('/api/create-chat' , {
                fileKey , fileName,

            })
            return response.data;
        }

    })

const {getRootProps , getInputProps} = useDropzone({
    accept: {'application/pdf':[".pdf"]},
    maxFiles:1,
    onDrop: async (acceptedFiles) => {
        console.log(acceptedFiles);
        const file = acceptedFiles[0]

        if(file.size > 10 * 1024 * 1024) {
            toast.error("File is too Large");
         alert ( 'Please Upload files under the size of 10Mb' ) 
        return
     }

        try{ 
            const data = await uploadToS3(file);
            if(!data?.fileKey || !data.fileName){
                toast.error("Something went Wrong");
                alert("Something went wrong");
                return;
            }
            mutate(data , {
                onSuccess : (data) =>{
                    console.log(data);
                    
                },
                onError: (err) => {
                    toast.error("Error Creating chats")
                    

                }
            })
            
          }

        catch(error){
            console.log(error);
            

        }
        
    }
})

  return (
    <div className='bg-gradient-to-r from-slate-900 dark:from-black dark:via-pink-950 via-pink-700 dark:to-black to-slate-900 p-2 w-[400px] rounded-xl shadow-2xl'>
        <div {...getRootProps({
            className: 'border-dashed border-2 dark:border-purple-200 rounded-xl cursor-pointer bg-black py-16 flex items-center justify-center space-x-4'

        })}>
        <input {...getInputProps()}/>
        <>
        <Inbox className='w-10 h-8 text-primary'/>
        <p className='text-white text-xl'>
            Drop Your Files Here . . !
        </p>
        </>
        </div>
    </div>
  )
}

export default FileUpload

function async() {
    throw new Error('Function not implemented.')
}
