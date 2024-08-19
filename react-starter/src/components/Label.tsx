import './label.css';

const Label = ({ label, style, htmlFor }: { label: string; style?: string; htmlFor?: string }) => {
  return (
    <label htmlFor={htmlFor} className={`standardLabel + ${style}`}>
      {label}
    </label>
  );
};

export default Label;
