import { useContext } from "react";
import { ShopContext } from "../../../context/shopContext";
import Items from "../../reuseables/items";
import { FaChevronDown } from "react-icons/fa";
import men_banner from "../../../assets/banner_mens.png";

const Men = () => {
  const { all_product } = useContext(ShopContext)!;

  return (
    <div>
      <div className="dark:bg-gray-900 mb-[75px]">
        <img
          src={men_banner}
          alt=""
          className="block mb-[30px] pt-[30px]  mx-auto lg:h-full w-full h-[300px]"
        />
        <div className="flex px-6 lg:mx-[170px] lg:px-0 justify-between items-center ">
          <p className="text-teal-600 ">
            <span className="font-semibold">showing 1-12</span> out of 36
          </p>

          <div className="text-teal-600 py-[10px] px-[20px] rounded-[40px] border border-teal-600 border-solid flex items-center">
            Sort by <FaChevronDown className="ml-[10px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] py-2.5 px-6 lg:mx-[170px] my-[20px]">
          {all_product.map((product: any) => {
            if (product.category === "men") {
              return (
                <Items
                  category={product.category}
                  id={product.id}
                  key={product.id}
                  title={product.name}
                  image={product.image}
                  newPrice={product.new_price}
                  oldPrice={product.old_price}
                />
              );
            }
            return null;
          })}
        </div>
        <div className="flex justify-center items-center my-[30px] mx-auto w-[200px] px-10 py-3 text-teal-600 border border-teal-600 border-solid rounded-[40px] cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300 font-bold text-[18px]">
          Explore more
        </div>
      </div>
    </div>
  );
};

export default Men;
