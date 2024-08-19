

function AuthSide() {
  return (
    <div className="h-screen overflow-hidden max-w-full flex justify-center items-center relative">
      <div className="flex justify-center flex-col text-center relative">
        <img src="./pexels-michael-block-1691617-3225517.jpg" alt="image" className="w-full h-auto" />

        <div className="absolute inset-0 flex justify-center items-center flex-col max-w-md w-full">
         <div className="flex justify-centers flex-row m-2 p-2">
         <p className="text-6xl font-extrabold p-1">
          &#x1F3A4;
          </p>
          <p className="text-6xl font-extrabold p-1">
          &#x1F4E2;
          </p>
         </div>
          <div className="text-white font-bold text-3xl rounded flex justify-center items-center w-full m-4">
            Upload the post you want including videos and photos
          </div>
          <div className="m-2 p-2 font-bold text-3xl text-orange-500">
            Signup to know how it works!! &#x1F609;
          </div>
        </div>
      </div>
    </div>
  );
}


export default AuthSide;
