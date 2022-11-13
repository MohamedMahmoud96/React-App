import {ReactElement, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

type Props = {
    children: ReactElement;
  };
  

export const Modal = ({children}: Props) => {

    const elRef = useRef<HTMLDivElement | null>(null);

    if(!elRef.current)
    {
        elRef.current = document.createElement('div');
    }
    useEffect(()=> {
        const parentModal = document.getElementById("modal");
        if (parentModal && elRef.current) {
        parentModal.appendChild(elRef.current);
        }
        // cleanup function
        return () => {
          if (parentModal && elRef.current) {
            parentModal.removeChild(elRef.current);
          }
        }
    }, [])


   
  return createPortal(children,elRef.current);
  
}
