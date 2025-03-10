import { useSearchParams } from "react-router-dom";
const VerifyNotification = ()=>{
    const [searchParams] = useSearchParams();
    const userEmail  =searchParams.get('email');
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-[#061932]">
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-[42px] font-bold text-white">
            Check your inbox
          </h2>
          <p className="mb-2 text-lg text-zinc-500">
            We are glad, that you’re with us ? We’ve sent you a verification link to
            the email address{" "}
            <span className="font-medium text-indigo-500">{userEmail}</span>.
          </p>
        </div>
      </div>
      
      
    )
}
export default VerifyNotification;