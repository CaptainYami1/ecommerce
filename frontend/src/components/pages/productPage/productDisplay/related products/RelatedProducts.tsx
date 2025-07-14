import data_product from "../../../shop/popular/dataproduct/data"
import Items from "../../../../reuseables/items"

const RelatedProducts = () => {
  return (
    <div className=" mt-12 items-center flex flex-col ">
        <h1 className="text-[24px] font-semibold dark:text-white ">Related Products</h1>
        <hr className="w-[200px] h-[3px] rounded-xl bg-teal-500 mt-5"/>
        <div className="pb-5 xl:overflow-hidden overflow-x-auto overflow-y-hidden max-w-full">
        <div className="mt-12 flex gap-[20px] ">
{          data_product.map((item, i) => (
           <Items
            key={i}
            id={item.id}
            title={item.name}
            image={item.image}
            newPrice={item.new_price}
            oldPrice={item.old_price}
          />
          ))}
        </div>
        </div>
    </div>
  )
}

export default RelatedProducts