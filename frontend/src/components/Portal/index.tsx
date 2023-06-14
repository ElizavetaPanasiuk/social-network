import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  elementId: string;
  className: string;
};

const Portal = ({ children, elementId, className }: PortalProps) => {
  const portal = document.getElementById(elementId);
  const el = document.createElement('div');

  useEffect(() => {
    portal?.appendChild(el);
    el.classList.add(className);
    return () => {
      portal?.removeChild(el);
    };
  }, [el, portal]);

  return createPortal(children, el);
};

export default Portal;
