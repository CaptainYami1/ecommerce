import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/index";
import { loginUser } from "../../../store/thunk";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    let loginData = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await dispatch(loginUser(loginData)).unwrap();
      const rememberme = {
        email: values.email,
        token: response.token,
      };
      if (values.rememberMe) {
        localStorage.setItem("rememberme", JSON.stringify(rememberme));
      } else {
        sessionStorage.setItem("rememberme", JSON.stringify(rememberme));
      }
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response));
        console.log(response);
        toast.success("Login successful!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
        resetForm();
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error("Incorrect username or password", {
          position: "bottom-right",
          autoClose: 3000,
        });
        resetForm();
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow">
            <h2 className="text-teal-600 text-center text-3xl font-semibold">
              Sign in
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {( ) => (
                <Form className="mt-12 space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-teal-600 text-sm font-medium mb-2 block"
                    >
                      Email
                    </label>
                    <div className=" items-center">
                      <Field
                        name="email"
                        type="text"
                        required
                        className="w-full text-teal-600 text-sm border border-teal-300 px-4 py-3 rounded-md outline-teal-600"
                        placeholder="Enter email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-teal-600 text-sm font-medium mb-2 block"
                    >
                      Password
                    </label>
                    <div className=" items-center">
                      <Field
                        name="password"
                        type="password"
                        required
                        className="w-full text-teal-600 text-sm border border-teal-300 px-4 py-3 rounded-md outline-teal-600"
                        placeholder="Enter password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-teal-600 focus:ring-teal-500 border-teal-300 rounded accent-teal-600"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-3 block text-sm text-teal-600 "
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        to=""
                        className="text-teal-600 hover:underline font-semibold"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div className="!mt-12">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none cursor-pointer"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="text-teal-600 text-sm !mt-6 text-center">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-teal-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Register here
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
