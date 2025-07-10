
const Input = (props:any) => {


  return (
    <div  className="flex items-center px-2 py-1.5 rounded-md border border-[#ccc] w-full">
      <input
      maxLength={props.maxLength}
        ref={props.ref}
        type="text"
        value={props.value}
        readOnly={props.readOnly}
        onChange={props.onChange}
        placeholder={props.placeholder || "Enter delivery address"}
        title={props.title || "Input field"}
        onBlur={props.onBlur}
        className="border-none bg-transparent flex-1 outline-none"
      />
      <button onClick={props.onClick}  className={props.btnClass}>
        {props.icon}
      </button>
    </div>
  );
}

export default Input

