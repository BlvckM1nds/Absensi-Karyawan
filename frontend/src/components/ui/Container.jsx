const Container = ({ children, className, ...props }) => {
  return <div className={`max-w-7xl mx-auto ${className}`} {...props}>{children}</div>;
};

export default Container;