import React from "react";

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={className} />
));
