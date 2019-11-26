import React from 'react';


const useValueRef = value => {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export default useValueRef;