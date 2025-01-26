export const InputComponent = (props: {
  placeholder: string;
  ref?: any;
  
}) => {
  return (
    <div>
      <input
        ref={props.ref}
        type="text"
        placeholder={props.placeholder}
        className="px-4 py-2 border rounded-md"
      />
    </div>
  );
};
