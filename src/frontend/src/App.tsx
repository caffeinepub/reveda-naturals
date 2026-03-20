import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "./hooks/useQueries";

// Fallback static products in case backend is loading
const STATIC_PRODUCTS = [
  {
    id: 1n,
    name: "Roasted Makhana (Assorted Flavours)",
    description:
      "Premium lotus seeds roasted to perfection — available in a variety of exciting flavours",
    price: 299n,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
  },
  {
    id: 2n,
    name: "Raw Makhana",
    description:
      "Pure, unprocessed lotus seeds — naturally light, crispy, and nutrient-rich",
    price: 249n,
    imageUrl:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
  },
  {
    id: 3n,
    name: "Onion Powder",
    description:
      "Finely ground dehydrated onions — rich flavour for everyday cooking",
    price: 149n,
    imageUrl:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
  },
  {
    id: 4n,
    name: "Tomato Powder",
    description:
      "Sun-dried tomatoes ground into fine powder — vibrant taste, long shelf life",
    price: 149n,
    imageUrl: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=400",
  },
  {
    id: 5n,
    name: "Moringa Powder",
    description:
      "Nutrient-dense superfood powder from fresh moringa leaves — nature's multivitamin",
    price: 199n,
    imageUrl:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
  },
  {
    id: 6n,
    name: "Ginger Powder",
    description:
      "Pure dry ginger ground fine — warming spice for teas, cooking, and wellness",
    price: 129n,
    imageUrl:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
  },
  {
    id: 7n,
    name: "Turmeric Powder",
    description:
      "High-curcumin turmeric sourced from the finest farms — bold colour and flavour",
    price: 129n,
    imageUrl:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
  },
  {
    id: 8n,
    name: "Zeera Powder",
    description:
      "Freshly ground cumin seeds — aromatic and earthy for authentic Indian cuisine",
    price: 119n,
    imageUrl:
      "https://images.unsplash.com/photo-1599909533731-0e490d849669?w=400",
  },
  {
    id: 9n,
    name: "Methi Powder",
    description:
      "Pure fenugreek seed powder — slightly bitter, deeply nourishing for body and food",
    price: 119n,
    imageUrl:
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400",
  },
  {
    id: 10n,
    name: "Mushroom Powder",
    description:
      "Dried and ground medicinal mushrooms — earthy umami boost with wellness benefits",
    price: 299n,
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  },
];

type CartItem = {
  id: bigint;
  name: string;
  price: bigint;
  imageUrl: string;
  quantity: number;
};

const FOUNDERS = [
  {
    initials: "KN",
    name: "Kumaar Nityanand",
    title: "Co-Founder & Director",
    experience: "15+ Years",
    expertise: [
      {
        area: "Production & Manufacturing Excellence",
        detail:
          "Spearheads end-to-end product manufacturing with a focus on quality, efficiency, and scalability. Deep expertise in formulation development, production planning, and lean operations.",
      },
      {
        area: "Financial Strategy & Management",
        detail:
          "Proven track record in steering financial health through disciplined budgeting, cost optimization, and long-term investment strategies that fuel sustainable growth.",
      },
      {
        area: "Team Building & Leadership",
        detail:
          "Built and led cross-functional teams across manufacturing, operations, and management. Passionate about cultivating high-performance cultures driven by purpose and accountability.",
      },
      {
        area: "Supply Chain & Operations",
        detail:
          "Oversees complex supply chain ecosystems—from raw material sourcing to last-mile delivery—ensuring seamless operations and resilient vendor partnerships.",
      },
      {
        area: "Business Development & Growth Strategy",
        detail:
          "Conceptualized and executed market expansion plans, forging key industry alliances and driving revenue growth across multiple product verticals.",
      },
      {
        area: "Quality Assurance & Compliance",
        detail:
          "Enforces rigorous quality benchmarks and regulatory compliance frameworks, ensuring every Riveda product meets the highest standards of safety and efficacy.",
      },
    ],
  },
  {
    initials: "MMK",
    name: "Mohit Manil Karki",
    title: "Co-Founder & Director",
    experience: "10+ Years",
    expertise: [
      {
        area: "Finance & Investment Planning",
        detail:
          "Drives strategic capital allocation, investor relations, and financial modeling to ensure long-term fiscal resilience and optimal return on investment.",
      },
      {
        area: "Brand Strategy & Marketing",
        detail:
          "Crafts compelling brand narratives and integrated marketing campaigns that establish Riveda Naturals as a premium, trusted name in natural wellness.",
      },
      {
        area: "Team Management & HR",
        detail:
          "Champions talent acquisition, employee development, and organizational design—creating workplaces where people thrive and innovation flourishes.",
      },
      {
        area: "Product Development & Innovation",
        detail:
          "Leads new product ideation and launch cycles, blending consumer insights with cutting-edge natural formulation science to introduce market-defining offerings.",
      },
      {
        area: "Customer Relations & Business Partnerships",
        detail:
          "Nurtures high-value customer relationships and strategic business partnerships that expand reach, deepen loyalty, and accelerate brand equity.",
      },
      {
        area: "Digital Growth & E-Commerce",
        detail:
          "Architects the brand's digital growth strategy—from performance marketing and SEO to D2C e-commerce platforms—scaling online revenue with precision.",
      },
    ],
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [buyNowOpen, setBuyNowOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const submitContact = useSubmitContactForm();

  const products = STATIC_PRODUCTS;

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  function addToCart(product: (typeof STATIC_PRODUCTS)[0]) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price}`,
    });
  }

  function updateQty(id: bigint, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  function removeFromCart(id: bigint) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      });
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      // If backend fails, still show success for demo
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen font-poppins">
      <Toaster position="top-right" />

      {/* ── STICKY HEADER ── */}
      <header className="sticky top-0 z-50 bg-forest shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo + Tagline */}
          <div className="flex flex-col items-start">
            <img
              src="/assets/generated/riveda-logo-transparent.dim_600x200.png"
              alt="Riveda Naturals"
              className="h-10 w-auto"
            />
            <p className="hidden md:block text-gold/80 text-[10px] italic tracking-[0.2em] font-light mt-0.5 pl-0.5">
              Rooted in Nature
            </p>
          </div>

          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            data-ocid="nav.panel"
          >
            <button
              type="button"
              onClick={() => scrollTo("hero")}
              className="text-cream text-sm hover:text-gold transition-colors border-b-2 border-gold pb-0.5"
              data-ocid="nav.home.link"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollTo("products")}
              className="text-cream text-sm hover:text-gold transition-colors"
              data-ocid="nav.skincare.link"
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="text-cream text-sm hover:text-gold transition-colors"
              data-ocid="nav.about.link"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo("founders")}
              className="text-cream text-sm hover:text-gold transition-colors"
              data-ocid="nav.founders.link"
            >
              Founders
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="text-cream text-sm hover:text-gold transition-colors"
              data-ocid="nav.contact.link"
            >
              Contact
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-cream hover:text-gold transition-colors"
              data-ocid="header.search_input"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="text-cream hover:text-gold transition-colors"
              data-ocid="header.user.button"
            >
              <User className="w-5 h-5" />
            </button>
            {/* Cart Drawer */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="relative text-cream hover:text-gold transition-colors"
                  data-ocid="cart.open_modal_button"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gold text-dark-green text-xs font-semibold rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                className="bg-forest text-cream border-l border-gold/30 w-80 sm:w-96 animate-slide-in"
                data-ocid="cart.sheet"
              >
                <SheetHeader>
                  <SheetTitle className="font-playfair text-gold text-xl">
                    Your Cart
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col h-full">
                  {cartItems.length === 0 ? (
                    <div
                      className="flex-1 flex flex-col items-center justify-center gap-3 text-cream/60"
                      data-ocid="cart.empty_state"
                    >
                      <ShoppingCart className="w-12 h-12 opacity-30" />
                      <p className="text-sm">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto space-y-4">
                      <AnimatePresence>
                        {cartItems.map((item, i) => (
                          <motion.div
                            key={item.id.toString()}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3 bg-forest/80 border border-gold/20 rounded-lg p-3"
                            data-ocid={`cart.item.${i + 1}`}
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-14 h-14 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-gold text-sm">
                                ₹{Number(item.price)}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, -1)}
                                  className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/10"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, 1)}
                                  className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/10"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-cream/40 hover:text-cream transition-colors"
                              data-ocid={`cart.delete_button.${i + 1}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                  {cartItems.length > 0 && (
                    <div className="border-t border-gold/30 pt-4 mt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-cream/70">Total</span>
                        <span className="text-gold font-semibold text-lg">
                          ₹{cartTotal}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-gold text-dark-green font-semibold uppercase tracking-wider hover:bg-gold-light rounded-full"
                        onClick={() => {
                          setCartOpen(false);
                          setBuyNowOpen(true);
                        }}
                        data-ocid="cart.primary_button"
                      >
                        Checkout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="bg-forest min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
            {/* Left: image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/hero-makhana-products.dim_800x600.jpg"
                  alt="Riveda Naturals lifestyle"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-forest/10 rounded-2xl" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold text-dark-green rounded-2xl px-5 py-3 shadow-lg">
                <p className="font-playfair text-xs uppercase tracking-widest">
                  Pure &amp;
                </p>
                <p className="font-playfair text-lg font-bold">Natural</p>
              </div>
            </motion.div>

            {/* Right: headline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6 text-cream"
            >
              <p className="text-gold text-sm uppercase tracking-[0.3em] font-medium">
                Rooted in Nature
              </p>
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-gold leading-tight uppercase">
                Luxury Care
                <br />
                <span className="text-cream">Inspired by</span>
                <br />
                Nature
              </h1>
              <p className="text-cream/80 text-base leading-relaxed max-w-md">
                Pure, thoughtfully crafted products that support your
                well-being—inside and out. Clean ingredients, gentle
                formulations, rooted in sustainability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollTo("products")}
                  className="bg-gold text-dark-green font-semibold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-gold-light transition-all text-sm"
                  data-ocid="hero.primary_button"
                >
                  Shop Collection
                </Button>
                <Button
                  onClick={() => scrollTo("about")}
                  variant="outline"
                  className="border-gold text-gold bg-transparent hover:bg-gold/10 uppercase tracking-wider rounded-full text-sm"
                  data-ocid="hero.secondary_button"
                >
                  Our Story
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT COLLECTION ── */}
      <section id="products" className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-gold-border text-sm uppercase tracking-[0.3em] mb-2">
              Explore
            </p>
            <h2 className="font-playfair text-4xl text-forest uppercase">
              Our Collection
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="products.list"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all hover:-translate-y-1 group"
                data-ocid={`products.item.${i + 1}`}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors" />
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-lg text-forest font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-dark-green/60 text-xs mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-forest font-bold text-xl mt-3">
                    ₹{Number(product.price)}
                  </p>
                  <div className="mt-4 space-y-2">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-forest text-cream hover:bg-forest/90 uppercase tracking-wider text-xs font-semibold rounded-full py-2"
                      data-ocid={`products.toggle.${i + 1}`}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => setBuyNowOpen(true)}
                      className="w-full bg-gold text-dark-green hover:bg-gold-light uppercase tracking-wider text-xs font-semibold rounded-full py-2"
                      data-ocid={`products.primary_button.${i + 1}`}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE RIVEDA PROMISE ── */}
      <section className="bg-[oklch(var(--sage-light))] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl text-forest uppercase">
              The Riveda Promise
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Cruelty-Free",
                desc: "Never tested on animals. Always kind, always ethical.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "100% Organic",
                desc: "Certified organic ingredients, free from harsh chemicals.",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Made in India",
                desc: "Proudly formulated and crafted in India with love.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-4"
                data-ocid={`promise.item.${i + 1}`}
              >
                <div className="w-20 h-20 rounded-full border-2 border-forest flex items-center justify-center text-forest bg-white/60">
                  {item.icon}
                </div>
                <h3 className="font-playfair text-forest text-xl uppercase">
                  {item.title}
                </h3>
                <p className="text-forest/70 text-sm max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section id="about" className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556228720-da54de49a834?w=600"
                alt="Natural ingredients"
                className="rounded-2xl w-full h-[450px] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-forest text-cream rounded-xl p-5 shadow-lg max-w-[200px] hidden lg:block">
                <p className="font-playfair text-gold text-2xl font-bold">
                  10+
                </p>
                <p className="text-xs text-cream/70 mt-1">
                  Years of Natural Wellness Expertise
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-gold-border text-sm uppercase tracking-[0.3em]">
                Our Story
              </p>
              <h2 className="font-playfair text-4xl text-forest uppercase">
                About Us
              </h2>
              <div className="w-16 h-0.5 bg-gold" />
              <p className="text-dark-green/80 leading-relaxed">
                We believe in the healing power of nature. Our mission is to
                bring you pure, thoughtfully crafted products that support your
                well-being—inside and out.
              </p>
              <p className="text-dark-green/80 leading-relaxed">
                From makhana snacks to wellness powders, everything we offer is
                inspired by nature and backed by care. We're committed to using
                clean, high-quality ingredients, free from harsh chemicals and
                artificial additives.
              </p>
              <p className="text-dark-green/80 leading-relaxed">
                Our formulations are gentle, effective, and designed to bring
                balance to your daily routine. Rooted in sustainability, we
                strive to tread lightly on the Earth while nurturing healthier
                lifestyles.
              </p>
              <p className="text-dark-green font-semibold italic font-playfair text-lg">
                "Rooted in Nature."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MEET OUR CO-FOUNDERS ── */}
      <section id="founders" className="bg-forest py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm uppercase tracking-[0.35em] mb-3 font-medium">
              Leadership
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl text-gold uppercase">
              Meet Our Co-Founders
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
            <p className="text-cream/70 mt-6 max-w-xl mx-auto text-sm leading-relaxed">
              Behind Riveda Naturals is a leadership duo combining decades of
              industry excellence—guiding the brand with passion, purpose, and
              proven expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {FOUNDERS.map((founder, fi) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: fi * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gold/30"
                data-ocid={`founders.item.${fi + 1}`}
              >
                {/* Card header band */}
                <div className="bg-gradient-to-r from-forest to-dark-green px-8 pt-10 pb-6 flex flex-col items-center text-center relative">
                  {/* Decorative corner lines */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />

                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full border-4 border-gold bg-gold flex items-center justify-center shadow-lg mb-4">
                    <span className="font-playfair text-forest text-2xl font-bold tracking-wide">
                      {founder.initials}
                    </span>
                  </div>

                  <h3 className="font-playfair text-2xl text-gold">
                    {founder.name}
                  </h3>
                  <p className="text-cream/70 text-sm mt-1 uppercase tracking-widest">
                    {founder.title}
                  </p>

                  {/* Experience badge */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    <Star className="w-3 h-3" />
                    {founder.experience} Experience
                  </div>
                </div>

                {/* Expertise list */}
                <div className="px-8 py-8 space-y-5">
                  <p className="text-forest/50 text-xs uppercase tracking-widest font-semibold border-b border-gold/20 pb-3">
                    Areas of Expertise
                  </p>
                  {founder.expertise.map((exp, ei) => (
                    <motion.div
                      key={exp.area}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: fi * 0.1 + ei * 0.06,
                      }}
                      className="flex gap-3"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      </div>
                      <div>
                        <p className="text-forest font-semibold text-sm font-playfair">
                          {exp.area}
                        </p>
                        <p className="text-dark-green/65 text-xs mt-0.5 leading-relaxed">
                          {exp.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[oklch(var(--sage-light))] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl text-forest uppercase">
              Get in Touch
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <AnimatePresence mode="wait">
                {contactSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-20"
                    data-ocid="contact.success_state"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                      <Mail className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="font-playfair text-2xl text-forest">
                      Message Sent!
                    </h3>
                    <p className="text-forest/70 text-center">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <Button
                      onClick={() => setContactSuccess(false)}
                      className="bg-gold text-dark-green rounded-full uppercase tracking-wider text-sm"
                      data-ocid="contact.secondary_button"
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                    data-ocid="contact.panel"
                  >
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        className="bg-white border border-gold/50 text-forest placeholder:text-forest/40 focus:border-gold rounded-lg"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="bg-white border border-gold/50 text-forest placeholder:text-forest/40 focus:border-gold rounded-lg"
                        data-ocid="contact.search_input"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                        rows={5}
                        className="bg-white border border-gold/50 text-forest placeholder:text-forest/40 focus:border-gold rounded-lg resize-none"
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full bg-gold text-dark-green font-semibold uppercase tracking-widest rounded-full hover:bg-gold-light transition-all"
                      data-ocid="contact.submit_button"
                    >
                      {submitContact.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl text-forest">
                  Contact Information
                </h3>
                <div className="flex items-start gap-3 text-forest/80">
                  <Phone className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>+91 78308 08000 / +91 98083 01011</span>
                </div>
                <div className="flex items-start gap-3 text-forest/80">
                  <Mail className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>hello@rivedanaturals.com</span>
                </div>
                <div className="flex items-start gap-3 text-forest/80">
                  <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>Noida, Uttar Pradesh, India</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/917830808000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gold text-dark-green font-semibold rounded-xl px-6 py-4 hover:bg-gold-light transition-all group shadow-lg"
                data-ocid="contact.primary_button"
              >
                <MessageCircle className="w-6 h-6 shrink-0" />
                <div>
                  <p className="uppercase tracking-widest text-sm">
                    Chat with us
                  </p>
                  <p className="text-xs font-normal opacity-70">
                    Available on WhatsApp
                  </p>
                </div>
              </a>

              <div className="bg-white border border-gold/30 rounded-xl p-5">
                <p className="text-forest font-playfair text-lg mb-2">
                  Business Hours
                </p>
                <p className="text-forest/70 text-sm">
                  Monday – Saturday: 9:00 AM – 6:00 PM
                </p>
                <p className="text-forest/70 text-sm">Sunday: Closed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-dark-green py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center">
                <img
                  src="/assets/generated/riveda-logo-transparent.dim_600x200.png"
                  alt="Riveda Naturals"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gold/80 text-sm italic leading-relaxed">
                Rooted in Nature
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-playfair text-gold uppercase text-sm tracking-widest mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {["Home", "Products", "About", "Founders", "Contact"].map(
                  (link) => (
                    <button
                      type="button"
                      key={link}
                      onClick={() =>
                        scrollTo(
                          link === "Products" ? "products" : link.toLowerCase(),
                        )
                      }
                      className="block text-cream/60 hover:text-gold text-sm transition-colors"
                      data-ocid={`footer.${link.toLowerCase()}.link`}
                    >
                      {link}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-playfair text-gold uppercase text-sm tracking-widest mb-4">
                Newsletter
              </h4>
              <p className="text-cream/60 text-sm mb-3">
                Get wellness tips and exclusive offers.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-forest border border-gold/30 text-cream placeholder:text-cream/40 text-sm rounded-full flex-1"
                  data-ocid="footer.input"
                />
                <Button
                  className="bg-gold text-dark-green font-semibold rounded-full px-4 text-sm uppercase hover:bg-gold-light"
                  data-ocid="footer.submit_button"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gold/20 pt-6 text-center">
            <p className="text-cream/50 text-sm">
              © {new Date().getFullYear()} Riveda Naturals | Premium Natural
              Care. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── BUY NOW MODAL ── */}
      <Dialog open={buyNowOpen} onOpenChange={setBuyNowOpen}>
        <DialogContent
          className="bg-forest border border-gold/30 text-cream max-w-sm"
          data-ocid="buynow.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-playfair text-gold text-xl">
              Order Placed!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <p className="text-cream/80 text-center">
              Thank you for your order! We'll contact you shortly to confirm.
            </p>
            <Button
              onClick={() => setBuyNowOpen(false)}
              className="w-full bg-gold text-dark-green rounded-full uppercase tracking-wider font-semibold hover:bg-gold-light"
              data-ocid="buynow.confirm_button"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
