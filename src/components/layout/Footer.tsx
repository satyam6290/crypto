
import BlurContainer from "../ui/BlurContainer";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 z-50 px-4 py-3">
      <BlurContainer className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-center">
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Glimpse Wallet
        </div>
      </BlurContainer>
    </footer>
  );
};

export default Footer;
