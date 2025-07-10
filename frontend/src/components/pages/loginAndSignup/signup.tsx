import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/index";
import { getEmail, sendInfo } from "../../../store/thunk";

YupPassword(Yup);
const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    firstname: Yup.string().required("Please enter your first name"),
    lastname: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .min(13, "Enter a valid phone number")
      .max(14, "Enter a valid phone number"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .minLowercase(1, "Must contain at least one lowercase letter")
      .minUppercase(1, "Must contain at least one uppercase letter")
      .minNumbers(1, "Must contain at least one number")
      .minSymbols(1, "Must contain at least one special character"),
    cpassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
  };

  const onSubmit = async (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
  }, {resetForm}:any) => {
    const email = values.email;

    try {
      const result = await dispatch(getEmail({ email })).unwrap();

      // Email exists
      if (result?.user) {
        toast.error("Email already exists!", {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        // Email not found → proceed to register
        try {
          await dispatch(
            sendInfo({
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              password: values.password,
              phoneNumber: values.phoneNumber,
            })
          ).unwrap();
          toast.success("🎉 Account created successfully!", {
            position: "bottom-right",
            autoClose: 4000,
            theme: "colored",
            transition: Bounce,
          });
          resetForm();
         await new Promise((res) => setTimeout(res, 2000));
          navigate("/login");
        } catch (sendError) {
          toast.error("Failed to create account. Please try again.");
          
        }
      }
    } catch (error) {
      toast.error("Something went wrong while checking email!");
      
    }
  };

  return (
    <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-semibold text-2xl mt-6 text-teal-600">
          Signup your account
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="grid sm:grid-cols-2 gap-8 text-teal-600">
              {/* First Name */}
              <div>
                <label htmlFor="firstname">First Name</label>
                <Field
                  name="firstname"
                  type="text"
                  className="input"
                  placeholder="Enter first name"
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastname">Last Name</label>
                <Field
                  name="lastname"
                  type="text"
                  className="input"
                  placeholder="Enter last name"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <PhoneInput
                  country={"ng"}
                  value={values.phoneNumber}
                  onChange={(value) => setFieldValue("phoneNumber", value)}
                  inputProps={{ name: "phoneNumber" }}
                  inputStyle={{
                    width: "100%",
                    height: "44px",
                    backgroundColor: "#F1F5F9",
                    color: "#00897B",
                    border: "none",
                    borderRadius: "0.375rem",
                    paddingLeft: "50px",
                  }}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="cpassword">Confirm Password</label>
                <Field
                  name="cpassword"
                  type="password"
                  className="input"
                  placeholder="Confirm password"
                />
                <ErrorMessage
                  name="cpassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <p className="text-teal-500 mt-4">
              By submitting, you agree to our{" "}
              <span className="cursor-pointer text-teal-800 font-extrabold hover:underline">
                Terms and Conditions
              </span>
            </p>

            <div className="mt-12">
              <button
                type="submit"
                className="mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-teal-600 hover:bg-teal-400"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center text-sm text-teal-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-teal-600 hover:underline font-semibold"
        >
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
