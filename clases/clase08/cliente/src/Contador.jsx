import { useContador } from './useContador';

function Contador() {
  const [count, incrementar, decrementar] = useContador();
  
  return (
    <>
      contar(6)
      <div className='contador'>
        <button onClick={decrementar}>-</button>
        <span>{count}</span>
        <button onClick={incrementar}>+</button>
      </div>
    </>
  );
}

export { Contador };