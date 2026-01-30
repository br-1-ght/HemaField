import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

// Import flower images
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
      {/* Background Image */}
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
          <p className="font-body text-sm md:text-base uppercase tracking-wider text-gold font-semibold mb-1">
            {topText}
          </p>
          <p className="font-body text-sm md:text-base text-white/80 font-medium mb-3">{subtext}</p>
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-1">
            {mainHeading}
          </h3>
          <p className="font-body text-base md:text-lg text-white/90 font-medium">{mainSubtext}</p>
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

export function OrderFlowersSection() {
  const handleOrderClick = () => {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Window & { gtag: (...args: unknown[]) => void }).gtag("event", "button_click", {
        button_name: "category_order",
        page: "tiktok_landing",
      });
    }
    window.open(
      "https://wa.me/2348033030982?text=Hi!%20I%20want%20to%20order%20flowers%20🌹",
      "_blank"
    );
  };

  const categories = [
    {
      categoryTitle: "Love & Connection",
      topText: "Be Romantic",
      subtext: "Make them smile today",
      mainHeading: "Love & Connection",
      mainSubtext: 'Say "I love you" without words',
      image: heartRosesChocolates,
      overlayItems: ["Valentine", "Proposal", "Birthdays", "Anniversary"],
    },
    {
      categoryTitle: "Celebrations",
      topText: "Flowers that speak gently when words are hard",
      subtext: "A step towards healing",
      mainHeading: "Apology",
      mainSubtext: "Say more than words",
      image: pinkBasket,
      overlayItems: ["Thank You", "Apology", "Miss You", "Heart Breaks"],
    },
    {
      categoryTitle: "Sympathy & Support",
      topText: "Comfort & Care",
      subtext: "Showing up in meaningful ways",
      mainHeading: "Care & Support",
      mainSubtext: "Express your heartfelt support",
      image: whiteRosesRedCenter,
      overlayItems: ["Funerals", "Hospital Visits", "Get Well", "Thinking of You"],
    },
    {
      categoryTitle: "Just Because",
      topText: "Everyday Joy",
      subtext: "Flowers for your own soul",
      mainHeading: "Self-Love",
      mainSubtext: "Brighten your day unexpectedly",
      image: pinkMixedBouquet,
      overlayItems: ["Graduations", "Promotions", "Weddings", "Baby Showers"],
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-3">
            Order Flowers 💐
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Choose the perfect arrangement for every occasion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              {...category}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>

        {/* Flower Gallery Section */}
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
