import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import flowersHero from "@/assets/flowers-hero.jpg";
import valentineFlowers from "@/assets/valentine-flowers.jpg";

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "kxy-rMZAOtD0I7wCU";
const EMAILJS_SERVICE_ID = "service_djysu8n";
const EMAILJS_TEMPLATE_ID = "template_zf0n98b";
type PopupVariant = "discount" | "valentine";

interface EmailPopupProps {
  variant?: PopupVariant;
  delayMs?: number;
  onClose?: () => void;
}

const popupContent = {
  discount: {
    welcomeText: "Welcome to Hemafield",
    title: "Your Partner",
    subtitle: "for Special Moments",
    offer: "Get ₦2,000 OFF",
    offerSubtext: "your first bouquet 💐",
    description: "Fill in your details to unlock your discount + receive same-day delivery offers.",
    buttonText: "Get My Discount",
    formButtonText: "Claim My Discount",
    image: flowersHero,
  },
  valentine: {
    welcomeText: "",
    title: "Valentine",
    subtitle: "deliveries",
    offer: "sell out fast 💐",
    offerSubtext: "",
    description: "Join the list to get early access + priority delivery slots.",
    buttonText: "Get Early Access",
    formButtonText: "Join the List",
    image: valentineFlowers,
  },
};

export function EmailPopup({ 
  variant = "discount", 
  delayMs = 3000,
  onClose 
}: EmailPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content = popupContent[variant];

  useEffect(() => {
    console.log("EmailPopup mounted, variant:", variant, "delay:", delayMs);
    
    const timer = setTimeout(() => {
      // Check if user has already seen the popup
      const hasSeenPopup = localStorage.getItem(`hema-popup-${variant}`);
      console.log("Timer fired, hasSeenPopup:", hasSeenPopup);
      
      if (!hasSeenPopup) {
        console.log("Showing popup now!");
        setIsOpen(true);
        // Notify parent iframe to enable pointer events
        window.parent?.postMessage('hema-popup-active', '*');
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, variant]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(`hema-popup-${variant}`, "true");
    // Notify parent iframe to disable pointer events
    window.parent?.postMessage('hema-popup-closed', '*');
    onClose?.();
  };

  const handleGetDiscount = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      toast({
        title: "Phone required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const campaignLabel = variant === "valentine" ? "Valentine Early Access" : "Website Discount";
      
      const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}`;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          phone: phone,
          email: email,
          campaign: campaignLabel,
          whatsapp_link: whatsappLink,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Success! 🌹",
        description: variant === "discount" 
          ? "We'll reach out soon with your discount!"
          : "You're on the list! We'll notify you when Valentine's slots open.",
      });
      
      handleClose();
    } catch (error: any) {
      console.error("EmailJS error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-popup animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.image})` }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        
        {/* Content */}
        <div className="relative px-8 py-10 text-center">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          {!showForm ? (
            <>
              {/* Initial state - just the button */}
              {content.welcomeText && (
                <p className="font-display text-xl italic text-primary mb-2">
                  {content.welcomeText}
                </p>
              )}

              <h2 
                id="popup-title"
                className="font-display text-3xl font-semibold text-primary leading-tight"
              >
                {content.title}
                <br />
                {content.subtitle}
              </h2>

              <div className="mt-4 mb-6">
                <p className="font-display text-2xl font-bold text-rose-red">
                  {content.offer}
                </p>
                {content.offerSubtext && (
                  <p className="font-display text-xl text-foreground">
                    {content.offerSubtext}
                  </p>
                )}
              </div>

              <Button 
                onClick={handleGetDiscount}
                size="lg"
                className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold text-lg"
              >
                {content.buttonText}
              </Button>
            </>
          ) : (
            <>
              {/* Form state */}
              <h2 
                id="popup-title"
                className="font-display text-2xl font-semibold text-primary leading-tight mb-2"
              >
                {variant === "discount" ? "Claim Your ₦2,000 OFF 💐" : "Get Early Access 💕"}
              </h2>

              <p className="font-body text-sm text-muted-foreground mb-6">
                {content.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-card/90 border-border font-body text-sm placeholder:text-muted-foreground"
                  disabled={isLoading}
                  aria-label="Your name"
                />
                <Input
                  type="tel"
                  placeholder="Phone number (e.g. 08012345678)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 bg-card/90 border-border font-body text-sm placeholder:text-muted-foreground"
                  disabled={isLoading}
                  aria-label="Phone number"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-card/90 border-border font-body text-sm placeholder:text-muted-foreground"
                  disabled={isLoading}
                  aria-label="Email address"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  size="lg"
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold text-lg"
                >
                  {isLoading ? "Sending..." : content.formButtonText}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
