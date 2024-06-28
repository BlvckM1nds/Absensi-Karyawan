const Button = ({ children, className, ...props }) => {
  return <button
    className={`px-5 py-2 font-medium rounded-md duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
};

export default Button;