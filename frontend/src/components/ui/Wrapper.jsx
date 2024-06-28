const Wrapper = ({ children, className, ...props }) => {
  return <section className={`min-h-screen ${className}`} {...props}>{children}</section>;
};

export default Wrapper;