import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, getUser } from "../redux/reducer/app.reducer";
import { parseJwt } from "../utils";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseMessage = (response) => {
    console.log(response);
    const { credential } = response;
    const { family_name, given_name, picture, email, ...k } =
      parseJwt(credential);

    dispatch(getUser({ email, family_name, given_name, picture }));
    dispatch(
      setUser({
        fname: family_name,
        lname: given_name,
        picture,
        email,
        credential,
      })
    );

    navigate("/dashboard");
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div class="container my-24 mx-auto md:px-6 bg-gray-900 rounded-lg ">
      <section class="mb-32 text-center md:text-left">
        <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex flex-wrap items-center bg-gray-900">
            <div class="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
              <img
                src={require("../assets/images/hero-banner.png")}
                alt="hero banner"
                class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
              />
            </div>
            <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
              <div class="px-6 py-12 md:px-12">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Welcome to <b className="text-blue-500">let's Introduce</b>,
                  <br />
                  where we bring your online presence to life!
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Are you looking to create a stunning personal website that
                  reflects your unique identity and sets you apart from the
                  rest? Look no further! Our professional web design experience
                  is here to help you make a lasting impression online.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Ready to shine online? Take the first step towards creating an
                  impressive personal website that truly represents you. Let our
                  team at PersonalWeb handle the design process while you focus
                  on what you do best. Get in touch with us today to discuss
                  your project and let us bring your vision to life!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    // auto_select
                    useOneTap
                    itp_support
                    flow="auth-code"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // return (
  //   <div className="bg-white">
  //     <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8"></div>
  //     <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
  //       <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
  //         <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
  //           Boost your productivity.
  //           <br />
  //           Start using our app today.
  //         </h2>
  //         <p className="mt-6 text-lg leading-8 text-gray-300">
  //           Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
  //           Malesuada adipiscing sagittis vel nulla.
  //         </p>
  //         <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
  //           <GoogleLogin
  //             onSuccess={responseMessage}
  //             onError={errorMessage}
  //             auto_select
  //             useOneTap
  //           />
  //         </div>
  //       </div>
  //       <div className="relative mt-16 h-80 lg:mt-8">
  //         <img
  //           className="absolute left-0 top-0 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
  //           src={require("../assets/images/hero-banner.png")}
  //           alt="banner image"
  //           width={1824}
  //           height={1080}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
}
