

interface TextAreaProps{
    onChange?:(event: import("react").ChangeEvent<HTMLTextAreaElement>) => void;
    value?:string
  }
  
 function TextArea({onChange,value}:TextAreaProps) {
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
  
export default TextArea
