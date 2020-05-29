import React from "react";

interface ViewPort {
  width: number;
  height: number;
}

interface ContextProps {
  children: JSX.Element | JSX.Element[];
}

const ViewPortContext = React.createContext<ViewPort>({ width: 0, height: 0 });

export const ViewPortProvider = ({ children }: ContextProps) => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);

  // const handleWindowResize = () => {
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowResize);
  //   return () => window.removeEventListener("resize", handleWindowResize);
  // }, []);
  const width = 1000;
  const height = 2000;
  return (
    <ViewPortContext.Provider value={{ width, height }}>
      {children}
    </ViewPortContext.Provider>
  );
};

export const useViewPort = () => {
  const { width, height } = React.useContext(ViewPortContext);
  return { width, height };
};
