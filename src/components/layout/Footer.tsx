
import BlurContainer from "../ui/BlurContainer";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 z-50 px-2 sm:px-4 py-2 sm:py-3">
      <BlurContainer className="w-full max-w-xs sm:max-w-md mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center">
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Glimpse Wallet
        </div>
      </BlurContainer>
    </footer>
  );
};

export default Footer;
