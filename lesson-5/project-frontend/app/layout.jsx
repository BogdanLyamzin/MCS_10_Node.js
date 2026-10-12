import "./globals.css";

export const metadata = {
  title: "Contacts",
  description: "Contacts from the backend API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
