import { ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
};

const Form = ({ children, onSubmit, className = '' }: FormProps) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className={className}
  >
    {children}
  </form>
);

export default Form;
