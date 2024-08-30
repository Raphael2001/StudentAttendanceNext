import "styles/globals.scss";

const fonts = ["Regular", "Medium", "SemiBold", "Bold", "Light"];
const fontName = "Heebo";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {fonts.map((font) => {
        return (
          <link
            rel="preload"
            href={`/assets/fonts/${fontName}-${font}.ttf`}
            as="font"
            crossOrigin=""
            key={font}
          />
        );
      })}

      <head />

      {children}
    </html>
  );
}
