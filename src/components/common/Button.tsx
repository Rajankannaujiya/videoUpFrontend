

interface ButtonProps{
    buttonFor:string;
    type:"button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({buttonFor,type, onClick}:ButtonProps) {
  return (
    <div>
        <button type={type} onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{buttonFor}</button>
    </div>
  )
}

export default Button