import data_product from "./dataproduct/data";
import Items from "../../../reuseables/items";

function Popular() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center gap-[10px] mt-[100px] w-full mx-auto">
          <h1 className="text-teal-600 text-[50px] font-semibold ">
            Popular For Women
          </h1>
          <hr className="w-[200px] h-[6px] rounded-[10px] bg-teal-800 mb-3.5" />
          <div className="pb-5 xl:overflow-hidden overflow-x-auto overflow-y-hidden max-w-full">
            <div className="mt-50px flex gap-[30px] w-full   px-4 ">
              {data_product.map((product, i) => (
                <div key={i} className="flex-none inline-block w-[300px]">
                  <Items
                    key={i}
                    id={product.id}
                    category={product.category}
                    title={product.name}
                    image={product.image}
                    newPrice={product.new_price}
                    oldPrice={product.old_price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popular;
