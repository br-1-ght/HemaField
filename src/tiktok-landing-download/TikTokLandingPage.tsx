/**
 * =============================================================
 * TIKTOK LANDING PAGE - CONSOLIDATED CODE
 * =============================================================
 * 
 * This file contains all the code for the TikTok landing page.
 * 
 * REQUIRED ASSETS (copy these to your project):
 * - src/assets/hemafield-logo.png
 * - src/assets/flowers-hero.jpg
 * - src/assets/flowers/roses-chocolates-heart.jpg
 * - src/assets/flowers/teddy-roses.jpg
 * - src/assets/flowers/red-bouquet-kraft.jpg
 * - src/assets/flowers/heart-roses-chocolates.jpg
 * - src/assets/flowers/pink-basket.jpg
 * - src/assets/flowers/white-roses-red-center.jpg
 * - src/assets/flowers/pink-mixed-bouquet.jpg
 * - src/assets/flowers/luxury-box-set.jpg
 * - src/assets/flowers/chocolate-heart-box.jpg
 * - src/assets/flowers/red-roses-white-box.jpg
 * 
 * REQUIRED DEPENDENCIES:
 * - @emailjs/browser
 * - lucide-react
 * - tailwindcss
 * - class-variance-authority
 * - @radix-ui/react-slot
 * 
 * REQUIRED CSS VARIABLES (add to your index.css):
 * See the CSS section at the bottom of this file.
 * =============================================================
 */

import { useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { 
  Clock, 
  Star, 
  MessageCircle, 
  Gift, 
  Truck, 
  Shield,
  X 
} from "lucide-react";
import emailjs from "@emailjs/browser";

// ============================================================
// ASSETS IMPORTS - Update these paths for your project
// ============================================================
import flowersHero from "@/assets/flowers-hero.jpg";
import hemafieldLogo from "@/assets/hemafield-logo.png";
import rosesChocolatesHeart from "@/assets/flowers/roses-chocolates-heart.jpg";
import teddyRoses from "@/assets/flowers/teddy-roses.jpg";
import redBouquetKraft from "@/assets/flowers/red-bouquet-kraft.jpg";
import heartRosesChocolates from "@/assets/flowers/heart-roses-chocolates.jpg";
import pinkBasket from "@/assets/flowers/pink-basket.jpg";
import whiteRosesRedCenter from "@/assets/flowers/white-roses-red-center.jpg";
import pinkMixedBouquet from "@/assets/flowers/pink-mixed-bouquet.jpg";
import luxuryBoxSet from "@/assets/flowers/luxury-box-set.jpg";
import chocolateHeartBox from "@/assets/flowers/chocolate-heart-box.jpg";
import redRosesWhiteBox from "@/assets/flowers/red-roses-white-box.jpg";

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================
// CONFIGURATION - Update these values
// ============================================================
const WHATSAPP_NUMBER = "2348000000000"; // Update with your WhatsApp number
const EMAILJS_PUBLIC_KEY = "kxy-rMZAOtD0I7wCU";
const EMAILJS_SERVICE_ID = "service_djysu8n";
const EMAILJS_TEMPLATE_ID = "template_zf0n98b";

// ============================================================
// UI COMPONENTS
// ============================================================

// Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

// Input Component
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

// Card Component
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  );
}

// Toast Hook (simplified version)
function useToast() {
  const toast = ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    // Replace with your toast implementation
    console.log(`[${variant || 'info'}] ${title}: ${description}`);
    alert(`${title}\n${description}`);
  };
  return { toast };
}

// ============================================================
// LEAD CAPTURE POPUP COMPONENT
// ============================================================
interface LeadCapturePopupProps {
  onClose: () => void;
}

function LeadCapturePopup({ onClose }: LeadCapturePopupProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetDiscount = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({ title: "Name required", description: "Please enter your name", variant: "destructive" });
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      toast({ title: "Phone required", description: "Please enter a valid phone number", variant: "destructive" });
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address", variant: "destructive" });
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

      toast({ title: "Success! 🌹", description: "We'll reach out soon with your discount!" });
      onClose();
    } catch (error: any) {
      console.error("EmailJS error:", error);
      toast({ title: "Something went wrong", description: "Please try again later", variant: "destructive" });
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${flowersHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />

        <div className="relative px-8 py-10 text-center">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          {!showForm ? (
            <>
              <p className="font-display text-xl italic text-primary mb-2">
                Welcome to Hemafield
              </p>
              <h2 id="popup-title" className="font-display text-3xl font-semibold text-primary leading-tight">
                Your Partner<br />for Special Moments
              </h2>
              <div className="mt-4 mb-6">
                <p className="font-display text-2xl font-bold text-rose-red">Get ₦2,000 OFF</p>
                <p className="font-display text-xl text-foreground">your first bouquet 💐</p>
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
              <h2 id="popup-title" className="font-display text-2xl font-semibold text-primary leading-tight mb-2">
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
                />
                <Input
                  type="tel"
                  placeholder="Phone number (e.g. 08012345678)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 bg-card/90 border-border font-body text-sm placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-card/90 border-border font-body text-sm placeholder:text-muted-foreground"
                  disabled={isLoading}
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

// ============================================================
// ORDER FLOWERS SECTION COMPONENT
// ============================================================
interface CategoryCardProps {
  categoryTitle: string;
  topText: string;
  subtext: string;
  mainHeading: string;
  mainSubtext: string;
  image: string;
  overlayItems: string[];
  onOrderClick: () => void;
}

function CategoryCard({
  categoryTitle,
  topText,
  subtext,
  mainHeading,
  mainSubtext,
  image,
  overlayItems,
  onOrderClick,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleViewAllClick = () => {
    const gallerySection = document.getElementById("flower-gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      <img
        src={image}
        alt={categoryTitle}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Default Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="font-body text-xs uppercase tracking-wider text-gold opacity-90 mb-1">
            {topText}
          </p>
          <p className="font-body text-xs text-white/70 mb-3">{subtext}</p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-1">
            {mainHeading}
          </h3>
          <p className="font-body text-sm text-white/80">{mainSubtext}</p>
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-primary/90 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
          <p className="font-display text-lg mb-4 opacity-90">For?</p>
          <ul className="space-y-2 mb-6">
            {overlayItems.map((item, i) => (
              <li
                key={i}
                className="font-body text-center text-sm md:text-base transition-transform duration-200 hover:scale-105"
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={handleViewAllClick}
            className="font-body text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity mb-4"
          >
            View all
          </button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOrderClick();
            }}
            className="bg-white text-primary hover:bg-white/90 font-body font-semibold gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function OrderFlowersSection() {
  const handleOrderClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "button_click", {
        button_name: "category_order",
        page: "tiktok_landing",
      });
    }
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20order%20flowers%20🌹`,
      "_blank"
    );
  };

  const categories = [
    {
      categoryTitle: "Love & Connection",
      topText: "Joy & Happiness",
      subtext: "Make them smile today",
      mainHeading: "Romance",
      mainSubtext: 'Say "I love you" without words',
      image: heartRosesChocolates,
      overlayItems: ["Valentine", "Proposal", "Birthdays", "Anniversary"],
    },
    {
      categoryTitle: "Celebrations",
      topText: "Special Moments",
      subtext: "Mark the occasion",
      mainHeading: "Celebrate",
      mainSubtext: "Joy for every milestone",
      image: pinkBasket,
      overlayItems: ["Graduations", "Promotions", "Weddings", "Baby Showers"],
    },
    {
      categoryTitle: "Sympathy & Support",
      topText: "Comfort & Care",
      subtext: "When words aren't enough",
      mainHeading: "Condolence",
      mainSubtext: "Express your heartfelt support",
      image: whiteRosesRedCenter,
      overlayItems: ["Funerals", "Hospital Visits", "Get Well", "Thinking of You"],
    },
    {
      categoryTitle: "Just Because",
      topText: "Everyday Joy",
      subtext: "No reason needed",
      mainHeading: "Surprise",
      mainSubtext: "Brighten their day unexpectedly",
      image: pinkMixedBouquet,
      overlayItems: ["Thank You", "Apology", "Miss You", "Self Care"],
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-3">
            Order Flowers 💐
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Choose the perfect arrangement for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} onOrderClick={handleOrderClick} />
          ))}
        </div>

        <div id="flower-gallery" className="mt-16">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary text-center mb-8">
            Our Collection 🌸
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {[
              rosesChocolatesHeart,
              teddyRoses,
              redBouquetKraft,
              luxuryBoxSet,
              chocolateHeartBox,
              redRosesWhiteBox,
              heartRosesChocolates,
              pinkBasket,
            ].map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer"
                onClick={handleOrderClick}
              >
                <img
                  src={img}
                  alt={`Flower arrangement ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary hover:bg-white/90 font-body font-semibold gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN TIKTOK PAGE COMPONENT
// ============================================================
export default function TikTokLandingPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          return { hours: 2, minutes: 0, seconds: 0 };
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
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "button_click", {
        button_name: "whatsapp_order",
        page: "tiktok_landing",
      });
    }
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20saw%20your%20TikTok%20and%20want%20to%20order%20flowers%20🌹`,
      "_blank"
    );
  };

  const handleGetDiscountClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "button_click", {
        button_name: "get_discount",
        page: "tiktok_landing",
      });
    }
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 py-4 px-4">
        <div className="container flex justify-center">
          <img src={hemafieldLogo} alt="Hemafield Flowers" className="h-12 md:h-16 w-auto" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${flowersHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="relative z-10 container px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-red/90 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
            <Clock className="h-4 w-4" />
            <span className="font-body text-sm font-semibold">
              TikTok Exclusive: Ends in {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary leading-tight mb-4">
            Fresh Flowers<br />
            <span className="text-rose-red">Delivered Today</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-6">
            Lagos's favorite flower delivery. Same-day delivery guaranteed. 🚚💐
          </p>

          <div className="mb-8">
            <p className="font-body text-sm text-muted-foreground line-through">From ₦25,000</p>
            <p className="font-display text-3xl md:text-4xl font-bold text-rose-red">From ₦23,000</p>
            <p className="font-body text-sm text-forest-green font-semibold">
              + FREE ₦2,000 discount for TikTok followers
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="h-16 px-8 bg-forest-green hover:bg-forest-green/90 text-white font-body font-bold text-lg gap-3 shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span>Order on WhatsApp</span>
                <span className="text-xs font-normal opacity-90">Chat with us now</span>
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
                <span className="text-xs font-normal opacity-70">Claim your discount</span>
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
              { name: "Chioma A.", text: "The flowers were so fresh! My girlfriend loved them 🌹", rating: 5 },
              { name: "Tunde O.", text: "Same-day delivery saved my anniversary. Thank you!", rating: 5 },
              { name: "Ada N.", text: "Best flower shop in Lagos. Always on time!", rating: 5 },
            ].map((review, i) => (
              <Card key={i} className="p-4 bg-card border-border">
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground mb-2">"{review.text}"</p>
                <p className="font-body text-xs text-muted-foreground">— {review.name}</p>
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
            Limited slots available for same-day delivery. Order now before we're fully booked!
          </p>

          <Button
            size="lg"
            onClick={handleWhatsAppClick}
            className="h-16 px-10 bg-forest-green hover:bg-forest-green/90 text-white font-body font-bold text-lg gap-3 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span>Order Now on WhatsApp</span>
              <span className="text-xs font-normal opacity-90">Fast response guaranteed</span>
            </div>
          </Button>
        </div>
      </section>

      {/* Lead Capture Popup */}
      {showPopup && <LeadCapturePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

/**
 * =============================================================
 * REQUIRED CSS (add to your index.css or global styles)
 * =============================================================

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 142 40% 15%;
    --card: 0 0% 100%;
    --card-foreground: 142 40% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 142 40% 15%;
    --primary: 142 64% 24%;
    --primary-foreground: 0 0% 100%;
    --secondary: 340 45% 96%;
    --secondary-foreground: 142 64% 24%;
    --muted: 340 20% 95%;
    --muted-foreground: 142 20% 40%;
    --accent: 350 60% 88%;
    --accent-foreground: 142 64% 24%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 142 20% 85%;
    --input: 142 20% 90%;
    --ring: 142 64% 24%;
    --radius: 0.625rem;
    --rose-pink: 350 80% 65%;
    --rose-red: 0 72% 48%;
    --blush: 340 45% 94%;
    --gold-bokeh: 40 80% 60%;
    --forest-green: 142 64% 24%;
    --sage: 142 25% 45%;
    --shadow-popup: 0 25px 50px -12px hsla(0 0% 0% / 0.25);
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Lato', -apple-system, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cormorant Garamond', Georgia, serif;
  }
}

@layer components {
  .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-body { font-family: 'Lato', -apple-system, sans-serif; }
  .shadow-popup { box-shadow: var(--shadow-popup); }
  .text-rose-red { color: hsl(var(--rose-red)); }
}

@layer utilities {
  .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
}

// TAILWIND CONFIG - Add these colors to your tailwind.config.ts:
colors: {
  "forest-green": "hsl(142 64% 24%)",
  "rose-red": "hsl(0 72% 48%)",
  gold: { DEFAULT: "hsl(40 80% 60%)" },
}

 */
