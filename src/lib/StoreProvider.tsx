"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistor, makeStore, AppStore } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "next-themes";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const { theme } = useTheme();

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex justify-center items-center">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color={`${theme === "light" ? "#A9AAEC" : "#6161D6"}`}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </div>
        }
        persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
