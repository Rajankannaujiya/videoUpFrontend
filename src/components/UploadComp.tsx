import React, { useRef, useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import Label from "./common/Label";
import TextArea from "./common/TextArea";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isRefresh } from "../state/userRecoil";

function UploadComp() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const[photo, setPhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title,setTitle] =useState<string>('');
  const [description, setDescription] = useState<string>('')
  const [isClicked, setISClicked] = useState<boolean>(false)


  const setRefreshPage = useSetRecoilState(isRefresh)


  const navigate =useNavigate();

  const handleReplaceVideo = async() => {
    setSelectedFile(null);
    setVideoPreview(null);
    

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleReplacePhoto = async()=>{
    setSelectedFile(null);
    setPhoto(null)

    if(fileInputRef.current){
      fileInputRef.current.value =''
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
      } 
      else if(file.type.startsWith('image/')){
        const imageUrl = URL.createObjectURL(file);
        setPhoto(imageUrl);
      }

      else {
        setVideoPreview(null);
        setSelectedFile(null)
        setPhoto(null)
      }
    }
  };

  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault();

    setISClicked(true)
    if(!selectedFile){
      return;
    }


    const formData = new FormData();
   if(videoPreview){
    formData.append('videoPath', selectedFile);
    
   }

   if(photo){
    formData.append('imagePath', selectedFile);
   }

    formData.append('title', title);
    formData.append('description', description);

 
    // const compressData = (formData: FormData): Uint8Array => {
    //   // Convert FormData to an object
    //   const formDataObject: { [key: string]: unknown } = {};
    //   formData.forEach((value, key) => {
    //     formDataObject[key] = value;
    //   });
    
    //   try {
    //     // Stringify the object
    //     const jsonString = JSON.stringify(formDataObject);
    
    //     // Compress the stringified data using pako
    //     const compressedData = pako.deflate(jsonString, { to: 'string' } as pako.DeflateOptions & { to: 'string' });
    //     console.log("compressed data",compressedData)
    
    //     return compressedData;
    //   } catch (error) {
    //     console.error('Compression error:', error);
    //     // If compression fails, return an empty Uint8Array as a fallback
    //     return new Uint8Array();
    //   }
    // };

    
    // const compressedData = compressData(formData);
    

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/${videoPreview? "video" : "image"}/${videoPreview ? "publishvideo":"publishimage"}`, {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem("token")}` , // Example of an Authorization header
            },
            body: formData,
        });

        if (response.ok) {
            console.log('File uploaded successfully');
            setRefreshPage(true)
            navigate("/posts")
        } else {
            console.error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};




  return (
    <div className="flex justify-between items-center flex-col max-w-xl w-full">
  <div className="flex justify-center flex-col w-full m-4">
  <div className="mt-10">
        <Label htmlFor="title" label="Title" />
        <Input
          placeholder="enter the Title of the video"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
        />
      </div>

      <div>
        <Label htmlFor="description" label="Description" />
        <TextArea value={description} onChange={(e)=>{
          setDescription(e.target.value)
        }}/>
      </div>

      <div className="w-full mt-5">
      {(!videoPreview && !photo) && (
  <label
    htmlFor="dropzone-file"
    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
  >
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Video, SVG, PNG, JPG, or GIF (MAX. 800x400px)
      </p>
    </div>
  </label>
)}
          <input id="dropzone-file" type="file"  accept="image/*,video/*" className="hidden" onChange={handleFileChange}  ref={fileInputRef}/>
        

    

       {videoPreview && (
        <div className="mt-4 w-full max-w-xl">
          <video className="w-[400px] h-[200px] object-fit" controls src={videoPreview} autoPlay>
            Your browser does not support the video tag.
          </video>
          <button
            type="button"
            onClick={handleReplaceVideo}
            className="mt-4 mb-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Replace Video
          </button>
        </div>
      )}


{photo && (
        <div className="mt-4 w-full max-w-xl">
          <img className="w-[400px] h-[200px] object-fit" src={photo} alt="image" />
          
          <button
            type="button"
            onClick={handleReplacePhoto}
            className="mt-4 mb-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Replace Photo
          </button>
        </div>
      )}
 

      </div>

  </div>
      <div className="mt-6 p-2 ">
        <Button type="button" buttonFor="Upload" onClick={handleSubmit} isClicked={isClicked} colour="green"/>
      </div>
  </div>
      
  );
}

export default UploadComp;
