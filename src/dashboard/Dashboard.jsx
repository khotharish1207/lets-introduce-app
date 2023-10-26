import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getGreetMsg } from "../utils/index";

export default function Dashboard() {
  const navigate = useNavigate();
  const { site, app } = useSelector((state) => state);
  const siteAvailable = site?.endpoint || site?.id;

  return (
    <div className="relative isolate h-screen overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className=" lg:mx-auto lg:grid lg:w-full lg:max-w-7xl  lg:gap-x-8 lg:px-8">
        <div className="lg:pr-4">
          <div className="lg:max-w-lg">
            <h2 className="font-extrabold text-2xl">
              Hello, {`${app?.user?.fname} ${app?.user?.lname}`}{" "}
            </h2>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {getGreetMsg()}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400">
              Welcome back, valued customer! We're thrilled to have you here
              with us. Whether you're looking to explore new products, catch up
              on the latest trends, or simply revisit your favorite items,
              you're in the right place. At{" "}
              <b className="text-white">Introduce</b>, we strive to provide an
              exceptional online site hosting experience tailored just for you.
            </p>

            {site?.endpoint || site?.id ? (
              <p className="mt-6 text-xl leading-8 text-gray-400">
                Your site is published at{" "}
                <a
                  className="text-blue-500"
                  href={`${window.location.origin}/${siteAvailable}`}
                  target="_blank"
                >{`${window.location.origin}/${siteAvailable}`}</a>
              </p>
            ) : (
              <p className="mt-6 text-xl leading-8 text-gray-400">
                You don't have any published site yet
              </p>
            )}

            <div className="mt-6">
              <button
                onClick={() => navigate("/editor")}
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {siteAvailable ? "Edit Site" : "Create site"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
