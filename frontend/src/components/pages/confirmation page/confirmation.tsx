import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <>
    <div className="-mt-28.5 w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 gap-3">
    <IoCheckmarkCircleOutline size={100} className="text-teal-600"/>    
    <h2 className="text-2xl dark:text-white font-bold">Order Confirmed!</h2>
    <p className="text-gray-500">Thank you for your purchase. Your order is being processed.</p>
    <p className="text-gray-500">You will receive an email confirmation shortly.</p>
    <p className="text-gray-500">If you have any questions, please contact our support team.</p>
    <p className="text-gray-500">We appreciate your business!</p>
    <Link to="/" className="mt-2.5 rounded-xl px-5 py-2 cursor-pointer bg-teal-600 hover:bg-teal-400 text-white">Continue Shopping</Link>
    </div>   
    </>
  )
}

export default Confirmation