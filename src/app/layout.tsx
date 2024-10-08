import { Poppins } from "next/font/google";
import "../app/globals.css";
import StoreProvider from "../lib/StoreProvider";
import { Themeprovider } from "./Themeprovider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Themeprovider>
          <StoreProvider>{children}</StoreProvider>
        </Themeprovider>
      </body>
    </html>
  );
}

export default RootLayout;
