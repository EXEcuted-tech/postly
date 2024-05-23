import React from "react";

const Landing = () => {
  return (
    <div className="animate-fade-in z-100">
      <div className="absolute top-[30%] left-[55%]">
        <p className="text-8xl font-bold">Post Now.</p>
        <div className="mt-[10%] mb-[2%]">
          <button className="w-[90%] ml-[3%] bg-primary text-3xl rounded-[50px] py-[1%] font-bold">Create Account</button>
        </div>
        <div className="flex text-center mb-[3%] mt-[3%]">
          <hr className="w-[43%] mt-[1.2em] border-t-black"></hr>  

          <p className="text-3xl bg-white text-black w-[8%] font-bold">or</p>
          <hr className="w-[45%] mt-[1.2em] border-t-black"></hr>
        </div>
        <p className="text-2xl font-bold text-center mb-[3%]">Already have an account?</p>
        <button className="w-[90%] ml-[3%] bg-white text-3xl rounded-[50px] py-[1%] font-bold border-primary border-2 text-primary z-2">Sign in</button>
        <div className="text-center mt-[3%]">
        <button className="text-center justify-center">Forgot password? Click here</button>
        </div>
      </div>
    </div>
  )
};

export default Landing;
