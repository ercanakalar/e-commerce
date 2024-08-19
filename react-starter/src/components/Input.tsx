import './input.css';

import { InputProps } from '../type/components/input-type';

const Input = ({ id, type, value, onChange, className }: InputProps) => {
  return <input id={id} type={type} value={value} onChange={onChange} className={`generalStyle ${className}`} />;
};

export default Input;
