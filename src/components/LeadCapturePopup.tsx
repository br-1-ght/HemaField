import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import flowersHero from "@/assets/flowers-hero.jpeg";

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "kxy-rMZAOtD0I7wCU";
const EMAILJS_SERVICE_ID = "service_djysu8n";
const EMAILJS_TEMPLATE_ID = "template_zf0n98b";
interface LeadCapturePopupProps {
  onClose: () => void;
}

export function LeadCapturePopup({ onClose }: LeadCapturePopupProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}`;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          phone: phone,
          email: email,
          campaign: "TikTok Discount",
          whatsapp_link: whatsappLink,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Success! 🌹",
        description: "We'll reach out soon with your discount!",
      });

      onClose();
    } catch (error) {
      console.error("EmailJS error:", error instanceof Error ? error.message : error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    window.parent?.postMessage("hema-popup-closed", "*");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
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
          style={{ backgroundImage: `url(${flowersHero})` }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/95 to-background/98" />

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
              <p className="font-display text-xl italic text-primary mb-2">
                Welcome to Hemafield
              </p>

              <h2
                id="popup-title"
                className="font-display text-3xl font-semibold text-primary leading-tight"
              >
                Your Partner
                <br />
                for Special Moments
              </h2>

              <div className="mt-4 mb-6">
                <p className="font-display text-2xl font-bold text-rose-red">
                  Get ₦2,000 OFF
                </p>
                <p className="font-display text-xl text-foreground">
                  your first bouquet 💐
                </p>
              </div>

              <Button
                onClick={handleGetDiscount}
                size="lg"
                className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold text-lg"
              >
                Get My Discount
              </Button>
            </>
          ) : (
            <>
              {/* Form state */}
              <h2
                id="popup-title"
                className="font-display text-2xl font-semibold text-primary leading-tight mb-2"
              >
                Claim Your ₦2,000 OFF 💐
              </h2>

              <p className="font-body text-sm text-muted-foreground mb-6">
                Fill in your details and we'll send your discount + follow up with you!
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
                  {isLoading ? "Sending..." : "Get My Discount"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
