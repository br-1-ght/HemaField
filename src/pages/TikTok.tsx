import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";
import { OrderFlowersSection } from "@/components/OrderFlowersSection";
import { Clock, Star, MessageCircle, Gift, Truck, Shield } from "lucide-react";
import flowersHero from "@/assets/flowers-hero.jpg";
import hemafieldLogo from "@/assets/hemafield-logo.png";
export default function TikTok() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });
  const [showPopup, setShowPopup] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          return { hours: 2, minutes: 0, seconds: 0 }; // Reset
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    // Track GA4 event
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Window & { gtag: (...args: unknown[]) => void }).gtag("event", "button_click", {
        button_name: "whatsapp_order",
        page: "tiktok_landing",
      });
    }
    window.open(
      "https://wa.me/2348033030982?text=Hi!%20I%20saw%20your%20TikTok%20and%20want%20to%20order%20flowers%20🌹",
      "_blank"
    );
  };

  const handleGetDiscountClick = () => {
    // Track GA4 event
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Window & { gtag: (...args: unknown[]) => void }).gtag("event", "button_click", {
        button_name: "get_discount",
        page: "tiktok_landing",
      });
    }
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-20 py-4 px-4">
        <div className="container flex justify-center">
          <img
            src={hemafieldLogo}
            alt="Hemafield Flowers"
            className="h-12 md:h-16 w-auto"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${flowersHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        {/* Content */}
        <div className="relative z-10 container px-4 py-12 text-center">
          {/* Urgency Banner */}
          <div className="inline-flex items-center gap-2 bg-rose-red/90 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
            <Clock className="h-4 w-4" />
            <span className="font-body text-sm font-semibold">
              TikTok Exclusive: Ends in{" "}
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary leading-tight mb-4">
            Fresh Flowers
            <br />
            <span className="text-rose-red">Delivered Today</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-6">
            Lagos's favorite flower delivery. Same-day delivery guaranteed. 🚚💐
          </p>

          {/* Price Offer */}
          <div className="mb-8">
            <p className="font-body text-sm text-muted-foreground line-through">
              From ₦25,000
            </p>
            <p className="font-display text-3xl md:text-4xl font-bold text-rose-red">
              From ₦23,000
            </p>
            <p className="font-body text-sm text-forest-green font-semibold">
              + FREE ₦2,000 discount for TikTok followers
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="h-16 px-8 bg-forest-green hover:bg-forest-green/90 text-white font-body font-bold text-lg gap-3 shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span>Order on WhatsApp</span>
                <span className="text-xs font-normal opacity-90">
                  Chat with us now
                </span>
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGetDiscountClick}
              className="h-16 px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body font-bold text-lg gap-3"
            >
              <Gift className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span>Get ₦2,000 OFF</span>
                <span className="text-xs font-normal opacity-70">
                  Claim your discount
                </span>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-secondary/50">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-5 w-5 text-forest-green" />
              <span className="font-body text-sm">Same-Day Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-forest-green" />
              <span className="font-body text-sm">Freshness Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-gold" />
              <span className="font-body text-sm">500+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Order Flowers Section */}
      <OrderFlowersSection />

      {/* Social Proof */}
      <section className="py-12 bg-background">
        <div className="container px-4">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary text-center mb-8">
            What Our Customers Say 💬
          </h2>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                name: "Chioma A.",
                text: "The flowers were so fresh! My girlfriend loved them 🌹",
                rating: 5,
              },
              {
                name: "Tunde O.",
                text: "Same-day delivery saved my anniversary. Thank you!",
                rating: 5,
              },
              {
                name: "Ada N.",
                text: "Best flower shop in Lagos. Always on time!",
                rating: 5,
              },
            ].map((review, i) => (
              <Card key={i} className="p-4 bg-card border-border">
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground mb-2">
                  "{review.text}"
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  — {review.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-4">
            Don't Miss Out! 🌸
          </h2>
          <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
            Limited slots available for same-day delivery. Order now before
            we're fully booked!
          </p>

          <Button
            size="lg"
            onClick={handleWhatsAppClick}
            className="h-16 px-10 bg-forest-green hover:bg-forest-green/90 text-white font-body font-bold text-lg gap-3 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span>Order Now on WhatsApp</span>
              <span className="text-xs font-normal opacity-90">
                Fast response guaranteed
              </span>
            </div>
          </Button>
        </div>
      </section>

      {/* Lead Capture Popup */}
      {showPopup && <LeadCapturePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
