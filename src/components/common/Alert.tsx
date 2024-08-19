
interface AlertProps{
    textColor:string;
    alertType:string;
    alertContent:string;
}


function Alert({textColor,alertType,alertContent}:AlertProps) {
  return (
    <div className={`p-4 mb-4 text-sm ${textColor} rounded-lg bg-red-5" role="alert`}>
    <span className="font-medium">{alertType}</span> {alertContent}
  </div>
  )
}

export default Alert