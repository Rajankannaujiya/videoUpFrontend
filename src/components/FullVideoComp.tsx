import Avatar from "./common/Avatar";



interface FullVideoProps{
    videoUrl:string;
    title:string;
    content:string;
    publishedDate:string;
}
function FullVideoComp({videoUrl,title,content}:FullVideoProps) {
  return (
 
         <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
          <div>
            Author
          </div>
          <div className="flex mb-2">
            <div className="pr-2 ">
              <Avatar name="AuthorName"/>
            </div>
            <div className="pr-2  mr-1 font-bold font-sans ">
              AuthorName
            </div>
          </div>
          <div className="flex mb-2" >
          <div className="pr-2  mr-1">
            uploadDate
          </div>
          <div className="pr-2 mr-1">
            uploadTime
          </div>
          </div>
      <div className="overflow-hidden rounded w-full mb-4">
        <video 
            src={videoUrl}
            className="w-full rounded hover:shadow-xl transition-shadow duration-300" 
            autoPlay  
            controls 
        />
    </div>
    <div className="text-lg font-semibold text-gray-800 mb-2">
        {title}
    </div>
    <div className="text-gray-600 text-sm leading-relaxed">
     {(content.length)>100?content.slice(0, 100) + "...":content}
    </div>
  </div>
  )
}

export default FullVideoComp