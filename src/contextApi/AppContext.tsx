import { FC, PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

type ContextType = {
  switchingStatusUIFramework: boolean;
  setSwitchingStatusUIFramework: (switchStatus: boolean) => void;
  disableSwitch: boolean;
  setDisableSwitch: (disableStatus: boolean) => void;
};
export const Context = createContext<ContextType>({} as ContextType);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [switchingStatusUIFramework, setSwitchingStatusUIFramework] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const context = useMemo(
    () => ({ switchingStatusUIFramework, setSwitchingStatusUIFramework, disableSwitch, setDisableSwitch }),
    [switchingStatusUIFramework, setSwitchingStatusUIFramework, disableSwitch, setDisableSwitch]
  );

  return <Context.Provider value={context}>{children} </Context.Provider>;
};

export const useAppContext = () => useContext(Context);
