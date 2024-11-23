/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppBar, Toolbar, Typography, Button, IconButton, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import "../styles/globals.css";
import { lightTheme, darkTheme } from '../styles/theme';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const themeMode = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <html lang="en">
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="flex-grow">
                CryptoMinds
              </Typography>
              <IconButton color="inherit" onClick={handleThemeChange}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button color="inherit">Connect Wallet</Button>
            </Toolbar>
          </AppBar>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
