import Items from "../../../reuseables/items";
import new_collections from "./new_collections";

const NewCollections = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] mt-[100px]">
      <h1 className="text-teal-600 text-[50px] font-semibold">
        New Collections
      </h1>
      <hr className="w-[200px] h-[6px] rounded-[10px] bg-teal-800 mb-3.5" />
      <div className="px-2 mt-50px grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
        {new_collections.map((product, i) => (
          <Items
            key={i}
            id={product.id}
            title={product.name}
            image={product.image}
            category={product.category}
            newPrice={product.new_price}
            oldPrice={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
