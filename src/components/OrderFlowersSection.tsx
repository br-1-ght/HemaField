import { useState } from "react";
import { Button } from "@/components/ui/button";

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

// WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface CategoryCardProps {
  categoryTitle: string;
  topText: string;
  subtext: string;
  mainHeading: string;
  mainSubtext: string;
  image: string;
  overlayItems: string[];
  onOrderClick: (category: string) => void;
}

interface PopularCardProps {
  title: string;
  subtitle: string;
  image: string;
  onOrderClick: (category: string) => void;
}

function PopularCard({ title, subtitle, image, onOrderClick }: PopularCardProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[2/3] group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Background Image with lighter overlay */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-white/30 group-hover:from-black/80 group-hover:via-black/30 transition-all duration-300" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-1 drop-shadow-lg">
          {title}
        </h3>
        <p className="font-body text-sm md:text-base text-white/90 font-medium drop-shadow-md mb-3">
          {subtitle}
        </p>
        {/* Always visible WhatsApp button */}
        <Button
          size="sm"
          onClick={() => onOrderClick(title)}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold gap-2 shadow-lg"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Order
        </Button>
      </div>
    </div>
  );
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

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          <p className="font-body text-base md:text-lg text-white/90 font-medium mb-3">{mainSubtext}</p>
          {/* Always visible WhatsApp button */}
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOrderClick(mainHeading);
            }}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold gap-2 shadow-lg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order
          </Button>
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
          <ul className="space-y-2 mb-4">
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
              onOrderClick(mainHeading);
            }}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold gap-2 shadow-lg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export function OrderFlowersSection() {
  const handleOrderClick = (category: string) => {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Window & { gtag: (...args: unknown[]) => void }).gtag("event", "button_click", {
        button_name: "category_order",
        category: category,
        page: "tiktok_landing",
      });
    }
    const message = category === "gallery" 
      ? encodeURIComponent(`Hi! I want to order beautiful flowers 🌹`)
      : encodeURIComponent(`Hi! I want to order flowers for ${category} 🌹`);
    window.open(
      `https://wa.me/2348033030982?text=${message}`,
      "_blank"
    );
  };

  const categories = [
    {
      categoryTitle: "Love & Connection",
      topText: "Joy and Happiness",
      subtext: "Make them smile today",
      mainHeading: "Love & Connection",
      mainSubtext: 'Say "I love you" without words',
      image: heartRosesChocolates,
      overlayItems: ["Valentine", "Proposal", "Birthdays", "Anniversary", "Romance"],
    },
    {
      categoryTitle: "Celebrations",
      topText: "Show Sympathy",
      subtext: "A step towards healing",
      mainHeading: "Apology",
      mainSubtext: "Say more than words",
      image: pinkBasket,
      overlayItems: ["Forgiveness", "Apology", "Funeral", "Heart Breaks"],
    },
    {
      categoryTitle: "Just Because",
      topText: "Gratitude",
      subtext: "You too deserve Flowers",
      mainHeading: "Self-Love",
      mainSubtext: "Brighten your day unexpectedly",
      image: pinkMixedBouquet,
      overlayItems: ["Graduations", "Promotions", "I did it", "Achieved Goals", "Nobody Celebrated Me"],
    },
    {
      categoryTitle: "Sympathy & Support",
      topText: "Celebration & Encouragement",
      subtext: "Showing up in meaningful ways",
      mainHeading: "Care & Support",
      mainSubtext: "Express your heartfelt support",
      image: whiteRosesRedCenter,
      overlayItems: ["Appreciation", "God Did", "For Your Boss", "Get Well Soon"],
    },
  ];

  const popularItems = [
    {
      title: "Red Roses",
      subtitle: "Classic elegance",
      image: redRosesWhiteBox,
    },
    {
      title: "Mixed Bouquet",
      subtitle: "Colorful joy",
      image: pinkMixedBouquet,
    },
    {
      title: "Roses & Chocolates",
      subtitle: "Sweet romance",
      image: rosesChocolatesHeart,
    },
    {
      title: "Premium Box",
      subtitle: "Luxury gift set",
      image: luxuryBoxSet,
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

        {/* Most Popular Section */}
        <div className="mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary text-center mb-8">
            Most Popular ⭐
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {popularItems.map((item, index) => (
              <PopularCard
                key={index}
                {...item}
                onOrderClick={(category) => handleOrderClick(category)}
              />
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary text-center mb-8">
            Shop by Occasion 🎁
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                {...category}
                onOrderClick={(cat) => handleOrderClick(cat)}
              />
            ))}
          </div>
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
              >
                <img
                  src={img}
                  alt={`Flower arrangement ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <Button
                    size="sm"
                    onClick={() => handleOrderClick("gallery")}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold gap-2"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
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
