import { createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";

interface ScrollContextType {
  scrollRef: React.RefObject<HTMLDivElement>;
  scrollDown: () => void;
  scrollUp: () => void;
}

const scrollContext = createContext<ScrollContextType | null>(null);

function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -75, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 75, behavior: "smooth" });
    }
  };

  return (
    <scrollContext.Provider value={{ scrollRef, scrollDown, scrollUp }}>
      {children}
    </scrollContext.Provider>
  );
}

export const useScroll = () => {
  return useContext(scrollContext);
};

export default ScrollProvider;
