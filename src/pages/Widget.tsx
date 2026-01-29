import { useEffect } from "react";
import { EmailPopup } from "@/components/EmailPopup";

// This page is specifically for the WordPress embed
// It shows the popup automatically with transparent background
const Widget = () => {
  useEffect(() => {
    console.log("Widget page loaded");
    // Clear localStorage on widget load so popup always shows for testing
    // Remove this line after testing is complete
    localStorage.removeItem("hema-popup-discount");
    
    // Force transparent background on html and body for iframe embed
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    document.body.classList.add("widget-mode");
    
    return () => {
      document.body.classList.remove("widget-mode");
    };
  }, []);

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <EmailPopup variant="discount" delayMs={2000} />
    </div>
  );
};

export default Widget;
