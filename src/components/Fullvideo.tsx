import { ChangeEvent, useRef, useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import Label from "./common/Label";
import { useRecoilState } from "recoil";
import { uploadVideoToBackend } from "../state/userRecoil";

function Fullvideo() {

  const [uploadVideo,setUploadVideo] = useRecoilState(uploadVideoToBackend)

  console.log(uploadVideo,setUploadVideo)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title,setTitle] =useState<string>('');
  const [description, setDescription] = useState<string>('')

  console.log("title",title, "description",description)

  console.log(selectedFile)

  const handleReplaceVideo = async() => {
    setSelectedFile(null);
    setVideoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
      } else {
        setVideoPreview(null);
        setSelectedFile(null)
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);


      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };



  return (
    <div className="flex justify-between items-center flex-col max-w-md w-full">
  <div className="flex justify-center flex-col w-full">
  <div>
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
      { !videoPreview &&   <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Video,SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>

          </label>
}
          <input id="dropzone-file" type="file"  accept="image/*,video/*" className="hidden" onChange={handleFileChange}  ref={fileInputRef}/>
        

    

       {videoPreview && (
        <div className="mt-4 w-full max-w-lg">
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
 

      </div>

  </div>
      <div className="mt-6 p-2 ">
        <Button type="button" buttonFor="Upload" onClick={handleSubmit}/>
      </div>
  </div>
      
  );
}

export default Fullvideo;


interface TextAreaProps{
  onChange:(event: ChangeEvent<HTMLTextAreaElement>) => void;
  value:string
}

export function TextArea({onChange,value}:TextAreaProps) {
  return (
    <div>
      <textarea
      value={value}
      onChange={onChange}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="write the description here..."
      ></textarea>
    </div>
  );
}
