const InputField = ({placeholder, className, name}) => {
    return(
        <div>
        <input name={name} placeholder={placeholder} className={`h-10 w-full bg-zinc-600 outline-none px-2 rounded-md ${className}`} type="text" />
        </div>
    );
}

export default InputField