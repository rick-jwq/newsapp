import React, { useState } from "react";
interface NewsType {
  type: string;
  setType: Function;
}

let nType: string;
if (typeof window !== undefined) {
  nType = localStorage.getItem("newsType") || "Guardian";
} else {
  nType = "Guardian";
}

export const NewsTypeContext = React.createContext<NewsType>({
  type: nType,
  setType: () => {}
});

const useNewsTypeContext = () => {
  const [type, setType] = useState(nType);
  return {
    type,
    setType: () => {
      setType(() => {
        const newType = type === "Guardian" ? "NYTimes" : "Guardian";
        localStorage.setItem("newsType", newType);
        return newType;
      });
    }
  };
};

interface ChildrenProps {
  children: JSX.Element[] | JSX.Element;
}

export const NewsTypeContextProvider = ({ children }: ChildrenProps) => {
  const contextValue = useNewsTypeContext();
  return (
    <NewsTypeContext.Provider value={contextValue}>
      {children}
    </NewsTypeContext.Provider>
  );
};
