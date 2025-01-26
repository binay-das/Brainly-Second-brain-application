export const InputComponent = (props: {
  placeholder: string;
  reference?: any;
  
}) => {
  return (
    <div>
      <input
        ref={props.reference}
        type="text"
        placeholder={props.placeholder}
        className="px-4 py-2 border rounded-md"
      />
    </div>
  );
};
