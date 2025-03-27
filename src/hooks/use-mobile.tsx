
import * as React from "react"

const MOBILE_BREAKPOINT = 640  // Changed from 768 to match sm: breakpoint
const TABLET_BREAKPOINT = 1024 // md/lg breakpoint
const LAPTOP_BREAKPOINT = 1280 // xl breakpoint
const DESKTOP_BREAKPOINT = 1536 // 2xl breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initial check
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isTablet
}

export function useIsLaptop() {
  const [isLaptop, setIsLaptop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsLaptop(width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initial check
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isLaptop
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= LAPTOP_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initial check
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isDesktop
}

// Detects laptop or larger screens
export function useIsLaptopOrLarger() {
  const [isLaptopOrLarger, setIsLaptopOrLarger] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setIsLaptopOrLarger(window.innerWidth >= TABLET_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initial check
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isLaptopOrLarger
}
