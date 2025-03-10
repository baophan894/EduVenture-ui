import { Link, useSearchParams } from "react-router-dom";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const isSuccess = state == "success";
  const textColor = isSuccess ? "#7F00FF" : "";
  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-[white]">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-[42px] font-bold text-black">
          {isSuccess ? (
            <span className={`text-[${textColor}]`}>
              Payment successfully!!!
            </span>
          ) : (
            <span className={`text-[${textColor}]`}>Payment failed!!!</span>
          )}
        </h2>
        <p className="mb-2 text-lg text-zinc-500">
          {isSuccess ? (
            <div>
              Let check{" "}
              <Link className="text-[#7F00FF]" to={"/profile#learn"}>
                Your learning
              </Link>
            </div>
          ) : (
            <div>Please check your balance and try again</div>
          )}
        </p>
      </div>
    </div>
  );
};
export default PaymentResult;
