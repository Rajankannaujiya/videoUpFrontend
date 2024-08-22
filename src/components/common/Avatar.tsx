

function Avatar({name}:{name:string}) {
  return (

        
<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
    <span className="font-semibold text-gray-600">{name[0]}</span>
</div>

  )
}

export default Avatar