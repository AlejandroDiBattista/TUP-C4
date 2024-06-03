import { useState } from 'react';

export function useContador() {
  const [count, setCount] = useState(0);

  const incrementar = () => {
    if (count >= 10) return;
    return setCount(count + 1);
  };
  
  const decrementar = () => {
    if (count <= 0) return;
    return setCount(count - 1);
  };

  return [count, incrementar, decrementar];
}
