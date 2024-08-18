
interface LabelProps{
  htmlFor:string;
  label:string;
}


function Label({htmlFor,label}:LabelProps) {
  return (
    <div>
            <label htmlFor={htmlFor} className="block m-2 text-lg font-medium text-gray-900">{label}</label>
        </div>
  )
}

export default Label