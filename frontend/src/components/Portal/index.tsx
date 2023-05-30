import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const portal = document.getElementById('portal');
  const el = document.createElement('div');

  useEffect(() => {
    portal?.appendChild(el);
    return () => portal?.removeChild(el);
  }, [el, portal]);

  return createPortal(children, el);
};

export default Portal;
