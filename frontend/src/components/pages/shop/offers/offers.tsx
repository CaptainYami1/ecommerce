import exclusive_img from '../../../../assets/exclusive_image.png';

const Offers = () => {
  return (
    <section className=" lg:grid lg:place-content-center mt-[100px]">
  <div
    className="mx-auto w-screen max-w-screen-2xl px-16 sm:px-24  md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-32 bg-linear-to-b from-[#fde1ff] to-[#e1ffea22]"
  >
    <div className="py-6.5 max-w-prose text-left items-center justify-center" >
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        Exclusive
      </h1>
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Offers For You</h1>

      <p className="mt-4 text-[22px] text-pretty font-semibold text-gray-700 sm:text-lg/relaxed">
        Discover our exclusive offers tailored just for you. Don't miss out on these limited-time deals designed to enhance your shopping experience.
      </p>

      <button className="mt-4 p-3.5 bg-[#ff4141] rounded-[35px] font-bold text=[22px] text-white sm:mt-6 cursor-pointer hover:bg-[#ff0000] transition duration-300 ease-in-out">
        Shop Now
      </button>
    </div>
  
    <div className=" justify-end hidden md:grid">
    <img src={exclusive_img} alt="" className='' />
    </div>
  </div>
</section>
  );
};

export default Offers;


//animate__zoomOutLeft