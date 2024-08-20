import { Link } from "react-router-dom"

interface LinksProps{
    linkfor:string;
    linkto:string;
}

function Links({linkto,linkfor}:LinksProps) {
  return (
    <div> 
        <Link to={linkto} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" aria-current="page">{linkfor}</Link>
    </div>
  )
}

export default Links