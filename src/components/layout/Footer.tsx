
import BlurContainer from "../ui/BlurContainer";
import { useIsMobile, useIsTablet, useIsLaptop, useIsDesktop } from "@/hooks/use-mobile";

const Footer = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  const isDesktop = useIsDesktop();

  return (
    <footer className="w-full fixed bottom-0 z-50 px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
      <BlurContainer className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 flex items-center justify-center">
        <div className="text-xs sm:text-sm md:text-base lg:text-base text-muted-foreground">
          © {new Date().getFullYear()} Glimpse Wallet
        </div>
      </BlurContainer>
    </footer>
  );
};

export default Footer;
