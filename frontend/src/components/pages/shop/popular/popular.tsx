import data_product from "./dataproduct/data";
import Items from "../../../reuseables/items";

function Popular() {


  return (
    <>
    <div >
      <div className="flex flex-col items-center gap-[10px] mt-[100px]">
        <h1 className="text-teal-600 text-[50px] font-semibold ">Popular For Women</h1>
        <hr className="w-[200px] h-[6px] rounded-[10px] bg-teal-800 mb-3.5"/>
        <div className="mt-50px flex gap-[30px]">
          {data_product.map((product, i) => (
            <Items
              key={i}
              id={product.id}
              category={product.category}
              title={product.name}
              image={product.image}
              newPrice={product.new_price}
              oldPrice={product.old_price}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default Popular;
