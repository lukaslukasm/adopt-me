import { createPortal } from "react-dom";
import { useEffect, useRef, FunctionComponent, MutableRefObject } from "react";

const Modal: FunctionComponent = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.querySelector("#modal");
    if (modalRoot && elRef.current) modalRoot.appendChild(elRef.current);

    return () => {
      if (modalRoot && elRef.current) modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};
export default Modal;
