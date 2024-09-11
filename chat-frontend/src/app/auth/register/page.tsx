import RegisterForm from './Form';
const RegisterPage = () => {
  return (
    <div className="w-full px-[10px] py-[10px] md:p-5 bg-gray-300_07 ">
      <div className="w-full mb-[3px] p-[43px] mx-auto md:p-5 bg-white-A700 max-w-[1200px] rounded-[10px]">
        <div className="flex md:flex-col justify-between items-center mt-[31px] mb-[34px] gap-5">
          <div className="flex flex-col items-center w-[36%] md:w-full gap-[246px] md:gap-[184px] sm:gap-[123px]">
            <div className="flex flex-col items-start gap-3.5">
              <h1 className="!text-green-700">
                Welcome Back
              </h1>
              <p className="!text-gray-500 tracking-[2.00px] uppercase">
                login to continue
              </p>
            </div>
            <img
              src="/images/img_group_3653.png"
              alt="image"
              className="h-[327px] w-full md:h-auto mb-8 object-cover"
            />
          </div>
          <RegisterForm className="flex flex-col items-center w-full gap-[11px]" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
