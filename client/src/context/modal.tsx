import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Modal {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalContext = createContext<Modal>({ modal: false, setModal: () => {} });

function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <modalContext.Provider value={{ modal, setModal }}>
      {children}
    </modalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(modalContext);
};

export default ModalProvider;
