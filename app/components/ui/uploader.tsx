/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GZEWx5UTIXD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, {useState} from "react"
import {Button} from "@/components/ui/button"

async function extracted(file) {
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({filename: file.name, contentType: file.type}),
        }
    )

    if (response.ok) {
        const {url, fields} = await response.json()

        const formData = new FormData()
        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value as string);
            console.log(key);
            console.log(value as string);
        })

        formData.append('file', file)

        console.log("url " + url);
        const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (uploadResponse.ok) {
            alert('Upload successful!')
            //criar registro em Documentos
        } else {
            console.error('S3 Upload Error:', uploadResponse)
            alert('Upload failed.')
        }
    } else {
        alert('Failed to get pre-signed URL.')
    }
}

export default function Uploader() {
    // Maximum file size (10MB in this example)
    const maxFileSize = 10 * 1024 * 1024; // 10 MB

    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragOver(true)
    }
    const handleDragLeave = () => {
        setIsDragOver(false)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        const filesFromDrop: FileList = e.dataTransfer.files;
        const filteredFiles = Array.from(filesFromDrop).filter((file: File) => allowedFileTypes.includes(file.type)  && file.size <= maxFileSize);
        setFiles([...files, ...filteredFiles]);
    }
    const handleFileSelect = (e) => {
        const filesFromInput: FileList = e.target.files!;
        const filteredFiles = Array.from(filesFromInput).filter((file: File) => allowedFileTypes.includes(file.type)  && file.size <= maxFileSize);
        setFiles([...files, ...filteredFiles]);
    }
    const handleRemoveFile = (index) => {
        const updatedFiles = [...files]
        updatedFiles.splice(index, 1)
        setFiles(updatedFiles)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!files) {
            alert('Please select a file to upload.')
            return
        }

        setUploading(true)

        await Promise.all(files.map(async (file) => {

            const originalFile = file;
            const imageFile = file;
            //check whether the file type is image or pdf. If PDF, convert PDF to image
            // if (file.type === 'application/pdf') {
            //     const pdf = await pdfjsLib.getDocument(file);
            //     const page = await pdf.getPage(1);
            //     const scale = 1.5;
            //     const viewport = page.getViewport({scale});
            //     const canvas = document.createElement('canvas');
            //     const context = canvas.getContext('2d');
            //     canvas.height = viewport.height;
            //     canvas.width = viewport.width;
            //     const renderContext = {
            //         canvasContext: context,
            //         viewport: viewport
            //     };
            //     const renderTask = page.render(renderContext);
            //     await renderTask.promise;
            //     const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
            //     const blob = await fetch(dataUrl).then(r => r.blob());
            //     imageFile = new File([blob], file.name, {type: 'image/jpeg'});
            // }

            if(imageFile){
                
            }
            await extracted(file);
        }));
        setUploading(false);
        setFiles([]);
        setIsDragOver(false);
    }
    return (
        <div className="grid gap-4">
            <div
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
                    isDragOver ? "border-primary bg-primary/10 text-primary" : "border-muted hover:border-primary"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <UploadIcon className="w-8 h-8 mb-2 text-muted-foreground"/>
                <p className="text-muted-foreground">
                    Drag and drop files here or{" "}
                    <label htmlFor="file-upload" className="text-primary cursor-pointer hover:underline">
                        select from your computer
                    </label>
                </p>
                <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileSelect} accept={allowedFileTypes.join(",")}/>
            </div>
            {files.length > 0 && (
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Allowed file extensions: .jpg, .png, .pdf, .doc,
                            .docx</p>
                        <p className="text-sm text-muted-foreground">Maximum file size: 10MB</p>
                    </div>
                    <ul className="grid gap-2">
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-muted rounded-md p-2">
                                <div className="flex items-center gap-2">
                                    <FileTypeIcon className="w-6 h-6 text-muted-foreground"/>
                                    <p className="text-sm truncate">{file.name}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                                    <XIcon className="w-4 h-4 text-muted-foreground"/>
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit}
                                disabled={uploading}
                                className={`${
                                    uploading
                                        ? "bg-primary text-primary-foreground cursor-not-allowed"
                                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                                }`}
                        >
                            {uploading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"/>
                                        <path className="opacity-75" stroke="currentColor" strokeWidth="4" fill="none"
                                              d="M12 2a10 10 0 0 1 0 20">
                                            <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 12 12"
                                                to="360 12 12"
                                                dur="2s"
                                                repeatCount="indefinite"/>
                                        </path>
                                    </svg>


                                    {/*<div className="mr-2 h-4 w-4 animate-spin"/>*/}
                                    Uploading...
                                </div>
                            ) : (
                                "Upload"
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

function FileTypeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M9 13v-1h6v1"/>
            <path d="M12 12v6"/>
            <path d="M11 18h2"/>
        </svg>
    )
}


function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
    )
}


function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}