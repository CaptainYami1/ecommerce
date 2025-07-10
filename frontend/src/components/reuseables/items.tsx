import { Link } from "react-router-dom";

function Items(props: any) {
  return (
    <>
      <div className=" block hover:scale-[1.05] hover:duration-600">
       <Link to={`/${props.category}/product/${props.id}`} key={props.id}> <img onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt=""
          className="h-[350px] w-full object-cover sm:h-[450px]"
        />
        </Link>
        <div className="flex flex-col mt-3  justify-between text-sm">
          <div className="">
            <h3 className="text-teal-600 group-hover:underline group-hover:underline-offset-4">
              {props.title}
            </h3>

            <p className="mt-1.5 text-xs text-pretty text-gray-500">
              {props.description}
            </p>
          </div>
          <div>
          <p className="text-teal-600 text-lg ">{props.newPrice.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</p>
          <p className="text-teal-400 line-through">{props.oldPrice.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Items;
