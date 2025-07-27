import "styles/globals.scss";

const fontFamilies = [
  { name: "Heebo", styles: ["Regular", "Medium", "SemiBold", "Bold", "Light"] },
];

const preloadFont = (fontFamily: string, fontStyle: string) => (
  <link
    rel="preload"
    href={`/assets/fonts/${fontFamily}-${fontStyle}.ttf`}
    as="font"
    crossOrigin=""
    key={`${fontFamily}-${fontStyle}`}
  />
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {fontFamilies.map(({ name, styles }) =>
          styles.map((style) => preloadFont(name, style)),
        )}
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
