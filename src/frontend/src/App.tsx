import { useState } from "react";

/* ---------- Types ---------- */
type PackSize = "100g" | "250g" | "500g";

interface Product {
  id: number;
  name: string;
  prices: Record<PackSize, number>;
  image: string;
  badge?: string;
}

interface CartItem {
  product: Product;
  pack: PackSize;
  qty: number;
}

/* ---------- Data ---------- */
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Roasted Makhana",
    prices: { "100g": 149, "250g": 349, "500g": 649 },
    image: "/assets/generated/roasted-makhana.dim_400x400.jpg",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Raw Makhana",
    prices: { "100g": 129, "250g": 299, "500g": 579 },
    image: "/assets/generated/raw-makhana.dim_400x400.jpg",
  },
  {
    id: 3,
    name: "Onion Powder",
    prices: { "100g": 89, "250g": 199, "500g": 379 },
    image: "/assets/generated/onion-powder.dim_400x400.jpg",
  },
  {
    id: 4,
    name: "Tomato Powder",
    prices: { "100g": 99, "250g": 219, "500g": 409 },
    image: "/assets/generated/tomato-powder.dim_400x400.jpg",
  },
  {
    id: 5,
    name: "Moringa Powder",
    prices: { "100g": 119, "250g": 269, "500g": 499 },
    image: "/assets/generated/moringa-powder.dim_400x400.jpg",
    badge: "New",
  },
  {
    id: 6,
    name: "Ginger Powder",
    prices: { "100g": 79, "250g": 179, "500g": 339 },
    image: "/assets/generated/ginger-powder.dim_400x400.jpg",
  },
  {
    id: 7,
    name: "Turmeric Powder",
    prices: { "100g": 69, "250g": 159, "500g": 299 },
    image: "/assets/generated/turmeric-powder.dim_400x400.jpg",
    badge: "Pure",
  },
  {
    id: 8,
    name: "Zeera Powder",
    prices: { "100g": 89, "250g": 199, "500g": 379 },
    image: "/assets/generated/zeera-powder.dim_400x400.jpg",
  },
  {
    id: 9,
    name: "Methi Powder",
    prices: { "100g": 79, "250g": 179, "500g": 339 },
    image: "/assets/generated/methi-powder.dim_400x400.jpg",
  },
  {
    id: 10,
    name: "Mushroom",
    prices: { "100g": 149, "250g": 349, "500g": 649 },
    image: "/assets/generated/mushroom-powder.dim_400x400.jpg",
    badge: "Premium",
  },
];

const PACK_SIZES: PackSize[] = ["100g", "250g", "500g"];

const REVIEWS = [
  {
    name: "Priya S.",
    location: "Delhi",
    quote:
      "The roasted makhana is absolutely delicious! Finally a healthy snack that actually tastes amazing. Will order again!",
  },
  {
    name: "Rahul M.",
    location: "Mumbai",
    quote:
      "Best quality moringa powder I've ever tried. You can tell it's pure and fresh. Highly recommend Riveda!",
  },
  {
    name: "Anita K.",
    location: "Bangalore",
    quote:
      "Ordered the turmeric and ginger powders. The aroma is incredible — nothing like store-bought. Truly natural!",
  },
  {
    name: "Vikram T.",
    location: "Lucknow",
    quote:
      "Fast delivery and premium packaging. The makhana varieties are top-notch. Great brand!",
  },
  {
    name: "Sunita R.",
    location: "Dehradun",
    quote:
      "The zeera powder has changed my cooking! So aromatic and pure. My whole family loves Riveda products.",
  },
];

/* ---------- Logo ---------- */
function LogoMark() {
  return (
    <div className="flex items-center gap-2.5" style={{ cursor: "pointer" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "oklch(0.28 0.09 152)",
          border: "1.5px solid oklch(0.64 0.10 75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "oklch(0.64 0.10 75)",
            lineHeight: 1,
          }}
        >
          R
        </span>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "oklch(0.28 0.09 152)",
            lineHeight: 1.1,
          }}
        >
          Riveda
        </div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.52rem",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase" as const,
            color: "oklch(0.64 0.10 75)",
            lineHeight: 1,
          }}
        >
          Naturals
        </div>
      </div>
    </div>
  );
}

/* ---------- Product Card ---------- */
function ProductCard({
  product,
  onAddToCart,
}: { product: Product; onAddToCart: (p: Product, s: PackSize) => void }) {
  const [selected, setSelected] = useState<PackSize>("100g");
  return (
    <div className="product-card">
      <div style={{ overflow: "hidden", position: "relative" }}>
        {product.badge && (
          <span
            className="badge-new"
            style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}
          >
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <p className="product-card-name">{product.name}</p>
        <div className="pack-selector">
          {PACK_SIZES.map((size) => (
            <button
              type="button"
              key={size}
              className={`pack-btn${selected === size ? " active" : ""}`}
              onClick={() => setSelected(size)}
              data-ocid="product.toggle"
            >
              {size}
            </button>
          ))}
        </div>
        <p className="product-card-price">₹{product.prices[selected]}</p>
        <button
          type="button"
          className="btn-gold"
          style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
          onClick={() => onAddToCart(product, selected)}
          data-ocid="product.primary_button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ---------- Cart Drawer ---------- */
function CartDrawer({
  items,
  onClose,
  onUpdateQty,
  onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: number, pack: PackSize, delta: number) => void;
  onRemove: (id: number, pack: PackSize) => void;
}) {
  const subtotal = items.reduce(
    (s, i) => s + i.product.prices[i.pack] * i.qty,
    0,
  );

  return (
    <div
      className="cart-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (
          (e.key === "Escape" || e.key === "Enter") &&
          e.target === e.currentTarget
        )
          onClose();
      }}
      data-ocid="cart.modal"
    >
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            data-ocid="cart.close_button"
          >
            ✕
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty" data-ocid="cart.empty_state">
              <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🌿</p>
              <p>Your cart is empty.</p>
              <p
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.4rem",
                  opacity: 0.7,
                }}
              >
                Start adding naturally good products!
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.pack}`}
                className="cart-item"
                data-ocid={`cart.item.${idx + 1}`}
              >
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-pack">{item.pack}</p>
                  <p className="cart-item-price">
                    ₹{item.product.prices[item.pack] * item.qty}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <div className="qty-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() =>
                        onUpdateQty(item.product.id, item.pack, -1)
                      }
                      data-ocid={`cart.secondary_button.${idx + 1}`}
                    >
                      −
                    </button>
                    <span className="qty-count">{item.qty}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.product.id, item.pack, 1)}
                      data-ocid={`cart.secondary_button.${idx + 1}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => onRemove(item.product.id, item.pack)}
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <button
              type="button"
              className="btn-gold"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.75rem",
              }}
              data-ocid="cart.submit_button"
            >
              Proceed to Checkout
            </button>
            <p
              style={{
                textAlign: "center",
                fontSize: "0.7rem",
                color: "oklch(0.65 0.03 85)",
                marginTop: "0.6rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Free shipping on orders above ₹499
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Main App ---------- */
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);

  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  function addToCart(product: Product, pack: PackSize) {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.pack === pack,
      );
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id && i.pack === pack
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      return [...prev, { product, pack, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id: number, pack: PackSize, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id && i.pack === pack
            ? { ...i, qty: i.qty + delta }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  }

  function removeItem(id: number, pack: PackSize) {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === id && i.pack === pack)),
    );
  }

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const navLinks = ["Shop", "Makhana", "About", "Contact"];

  return (
    <>
      {/* ---- Announcement Bar ---- */}
      <div className="announcement-bar" data-ocid="header.panel">
        🌿 Free shipping on orders above ₹499 &nbsp;|&nbsp; Rooted in Nature
        &nbsp;|&nbsp; 100% Natural Products
      </div>

      {/* ---- Header ---- */}
      <header className="site-header" data-ocid="header.section">
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0.7rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <LogoMark />

          {/* Desktop Nav */}
          <nav
            className="desktop-nav"
            style={{ display: "flex", gap: "2rem", alignItems: "center" }}
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link}
                className="nav-link"
                onClick={() => scrollTo(link.toLowerCase())}
                data-ocid="nav.link"
              >
                {link.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.28 0.09 152)",
                padding: "0.25rem",
              }}
              aria-label="Search"
              data-ocid="header.button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                role="img"
                aria-label="Search icon"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.28 0.09 152)",
                padding: "0.25rem",
                position: "relative",
              }}
              aria-label="Cart"
              data-ocid="cart.open_modal_button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                role="img"
                aria-label="Cart icon"
              >
                <path d="M6 2 L3 6 L3 20 Q3 22 5 22 L19 22 Q21 22 21 20 L21 6 L18 2 Z" />
                <path d="M16 10 Q16 14 12 14 Q8 14 8 10" />
              </svg>
              {totalQty > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    background: "oklch(0.64 0.10 75)",
                    color: "oklch(0.95 0.03 92)",
                    fontSize: "0.6rem",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalQty}
                </span>
              )}
            </button>

            <button
              type="button"
              className="btn-gold"
              style={{ fontSize: "0.65rem", padding: "0.45rem 1rem" }}
              onClick={() => scrollTo("shop")}
              data-ocid="nav.primary_button"
            >
              Shop Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.28 0.09 152)",
                padding: "0.25rem",
              }}
              className="md:hidden"
              aria-label="Menu"
              data-ocid="nav.toggle"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                role="img"
                aria-label="Menu icon"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile Menu ---- */}
      {mobileMenuOpen && (
        <div className="mobile-menu-content" data-ocid="nav.modal">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "oklch(0.28 0.09 152)",
            }}
            data-ocid="nav.close_button"
          >
            ✕
          </button>
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              className="nav-link"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollTo(link.toLowerCase());
              }}
              data-ocid="nav.link"
            >
              {link.toUpperCase()}
            </button>
          ))}
          <button
            type="button"
            className="btn-gold"
            onClick={() => {
              setMobileMenuOpen(false);
              scrollTo("shop");
            }}
            data-ocid="nav.primary_button"
          >
            Shop Now
          </button>
        </div>
      )}

      <main>
        {/* ---- Hero ---- */}
        <section className="hero-section" id="hero">
          <img
            src="/assets/generated/hero-flatlay.dim_1400x700.jpg"
            alt="Riveda Naturals premium products flat lay"
          />
          <div className="hero-overlay" />
          <div className="hero-content animate-fade-up">
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.35em",
                color: "oklch(0.78 0.07 80)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Luxury Natural Care
            </p>
            <h1>Rooted in Nature</h1>
            <p>Premium Makhana &amp; Natural Spice Powders</p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="btn-gold animate-fade-up delay-200"
                style={{ padding: "0.8rem 2rem", fontSize: "0.78rem" }}
                onClick={() => scrollTo("shop")}
                data-ocid="hero.primary_button"
              >
                Shop Now
              </button>
              <button
                type="button"
                className="btn-outline-forest animate-fade-up delay-300"
                style={{
                  padding: "0.8rem 2rem",
                  fontSize: "0.78rem",
                  borderColor: "oklch(0.90 0.03 90)",
                  color: "oklch(0.90 0.03 90)",
                }}
                onClick={() => scrollTo("about")}
                data-ocid="hero.secondary_button"
              >
                Our Story
              </button>
            </div>
          </div>
        </section>

        {/* ---- Trust Strip ---- */}
        <section
          style={{ background: "oklch(0.28 0.09 152)", padding: "1rem 1.5rem" }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {[
              ["🌿", "100% Natural"],
              ["🚚", "Free Shipping ₹499+"],
              ["✅", "No Preservatives"],
              ["📦", "Fresh Packed"],
            ].map(([icon, text]) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "oklch(0.95 0.03 92)",
                  letterSpacing: "0.05em",
                }}
              >
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Curated Collections ---- */}
        <section
          id="shop"
          style={{ padding: "4rem 1.5rem", maxWidth: 1280, margin: "0 auto" }}
        >
          <p className="section-subheading">Premium Selection</p>
          <h2 className="section-heading">Curated Collections</h2>
          <div className="section-divider" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
            data-ocid="shop.list"
          >
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} data-ocid={`shop.item.${idx + 1}`}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </section>

        {/* ---- The Riveda Promise ---- */}
        <section
          id="about"
          className="promise-section"
          style={{ padding: "0" }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              minHeight: 420,
            }}
          >
            <div style={{ overflow: "hidden", minHeight: 360 }}>
              <img
                src="/assets/generated/hero-flatlay.dim_1400x700.jpg"
                alt="Riveda Naturals promise"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
            <div
              className="promise-text"
              style={{
                padding: "3.5rem 3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase" as const,
                  color: "oklch(0.64 0.10 75)",
                  marginBottom: "0.5rem",
                }}
              >
                Our Philosophy
              </p>
              <h2>The Riveda Promise</h2>
              <p>
                We believe that what goes into your body should come straight
                from nature — unprocessed, unadulterated, and full of life.
                Every product is sourced with intentionality from trusted farms
                and artisan producers across India.
              </p>
              <p>
                From the crisp lotus seeds of Bihar's wetlands to the sun-dried
                spice powders of Kerala and Rajasthan, Riveda Naturals brings
                you flavours and nutrition in their purest form.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {[
                  "Farm Fresh",
                  "No Additives",
                  "Lab Tested",
                  "Eco Packaged",
                ].map((b) => (
                  <span key={b} className="promise-badge">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- Bestsellers + Founders ---- */}
        <section
          style={{
            padding: "4rem 1.5rem",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
          }}
        >
          {/* Bestsellers */}
          <div id="makhana">
            <p className="section-subheading" style={{ textAlign: "left" }}>
              Customer Favourites
            </p>
            <h2
              className="section-heading"
              style={{ textAlign: "left", fontSize: "1.4rem" }}
            >
              Bestsellers
            </h2>
            <div
              className="section-divider"
              style={{ margin: "0.75rem 0 1.5rem" }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              {PRODUCTS.slice(0, 3).map((product, idx) => (
                <div
                  key={product.id}
                  className="product-card"
                  data-ocid={`bestseller.item.${idx + 1}`}
                >
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div
                    className="product-card-body"
                    style={{ padding: "0.65rem" }}
                  >
                    <p
                      className="product-card-name"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {product.name}
                    </p>
                    <p
                      className="product-card-price"
                      style={{ fontSize: "0.78rem" }}
                    >
                      from ₹{product.prices["100g"]}
                    </p>
                    <button
                      type="button"
                      className="btn-gold"
                      style={{
                        fontSize: "0.6rem",
                        padding: "0.35rem",
                        width: "100%",
                        justifyContent: "center",
                      }}
                      onClick={() => addToCart(product, "100g")}
                      data-ocid={`bestseller.primary_button.${idx + 1}`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Founders */}
          <div id="founders">
            <p className="section-subheading" style={{ textAlign: "left" }}>
              The People Behind
            </p>
            <h2
              className="section-heading"
              style={{ textAlign: "left", fontSize: "1.4rem" }}
            >
              Our Founders
            </h2>
            <div
              className="section-divider"
              style={{ margin: "0.75rem 0 1.5rem" }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                {
                  name: "Kumaar Nityanand",
                  initial: "K",
                  role: "Co-Founder & Director",
                  desc: "15+ years of expertise in production, operations, supply chain, and team management. Drives Riveda's sourcing quality and operational excellence.",
                },
                {
                  name: "Mohit Manil Karki",
                  initial: "M",
                  role: "Co-Founder & Director",
                  desc: "10+ years in finance, business development, and strategic planning. Architect of Riveda's growth strategy and investor relations.",
                },
              ].map((f, idx) => (
                <div
                  key={f.name}
                  className="founder-card"
                  data-ocid={`founders.card.${idx + 1}`}
                >
                  <div className="founder-avatar">{f.initial}</div>
                  <p className="founder-name">{f.name}</p>
                  <p className="founder-role">{f.role}</p>
                  <p className="founder-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Opening Soon ---- */}
        <section
          style={{
            background: "oklch(0.28 0.09 152)",
            padding: "3rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "oklch(0.64 0.10 75)",
              marginBottom: "0.5rem",
            }}
          >
            Coming Soon
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "oklch(0.95 0.03 92)",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              marginBottom: "1rem",
            }}
          >
            Riveda Cafe
          </h2>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.9rem",
              color: "oklch(0.80 0.03 90)",
              maxWidth: 480,
              margin: "0 auto 1.5rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            A curated dining experience rooted in pure, natural ingredients.
            Coming to Dehradun, Uttarakhand.
          </p>
          <button
            type="button"
            className="btn-gold"
            style={{ padding: "0.7rem 2rem", fontSize: "0.75rem" }}
            data-ocid="cafe.primary_button"
          >
            Notify Me
          </button>
        </section>

        {/* ---- Customer Reviews ---- */}
        <section
          id="reviews"
          style={{
            padding: "4rem 1.5rem",
            background: "oklch(0.98 0.01 90)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p className="section-subheading">Verified Buyers</p>
            <h2 className="section-heading">Customer Love</h2>
            <div className="section-divider" />
            {/* Overall rating summary */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "oklch(0.28 0.09 152)",
                  lineHeight: 1,
                }}
              >
                4.9
              </span>
              <div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    color: "oklch(0.64 0.10 75)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.75rem",
                    color: "oklch(0.45 0.03 90)",
                    marginTop: "0.2rem",
                  }}
                >
                  Based on 200+ reviews
                </p>
              </div>
            </div>
            {/* Review cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.5rem",
              }}
              data-ocid="reviews.list"
            >
              {REVIEWS.map((review, idx) => (
                <div
                  key={review.name}
                  data-ocid={`reviews.item.${idx + 1}`}
                  style={{
                    background: "#fff",
                    border: "1px solid oklch(0.88 0.03 90)",
                    padding: "1.5rem",
                    boxShadow: "0 2px 16px oklch(0.85 0.03 90 / 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {/* Stars */}
                  <div
                    style={{
                      fontSize: "1.1rem",
                      color: "oklch(0.64 0.10 75)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ★★★★★
                  </div>
                  {/* Quote */}
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.85rem",
                      color: "oklch(0.32 0.04 152)",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      fontStyle: "italic",
                      flex: 1,
                    }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  {/* Reviewer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      borderTop: "1px solid oklch(0.92 0.02 90)",
                      paddingTop: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "oklch(0.28 0.09 152)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: "oklch(0.64 0.10 75)",
                        }}
                      >
                        {review.name[0]}
                      </span>
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "oklch(0.28 0.09 152)",
                          lineHeight: 1.2,
                        }}
                      >
                        {review.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.7rem",
                          color: "oklch(0.55 0.03 90)",
                        }}
                      >
                        📍 {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section
          id="contact"
          className="contact-section"
          style={{ padding: "4rem 1.5rem" }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p className="section-subheading">Get in Touch</p>
            <h2 className="section-heading">Contact Us</h2>
            <div className="section-divider" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
              }}
            >
              {/* Info */}
              <div>
                {[
                  { icon: "📞", label: "Phone", value: "+91 9808301011" },
                  { icon: "📞", label: "Alt Phone", value: "+91 7830808000" },
                  {
                    icon: "✉️",
                    label: "Email",
                    value: "hello@rivedanaturals.com",
                  },
                  {
                    icon: "📍",
                    label: "Location",
                    value: "Dehradun, Uttarakhand, India",
                  },
                ].map((item) => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div>
                      <p className="contact-label">{item.label}</p>
                      <p className="contact-value">{item.value}</p>
                    </div>
                  </div>
                ))}
                <a
                  href="https://wa.me/919808301011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    marginTop: "0.5rem",
                    textDecoration: "none",
                    padding: "0.65rem 1.5rem",
                    fontSize: "0.75rem",
                  }}
                  data-ocid="contact.primary_button"
                >
                  💬 WhatsApp Us
                </a>
              </div>

              {/* Form */}
              <form onSubmit={submitContact} data-ocid="contact.panel">
                {formSent ? (
                  <div
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      background: "oklch(0.95 0.03 92)",
                      border: "1px solid oklch(0.64 0.10 75)",
                    }}
                    data-ocid="contact.success_state"
                  >
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.1rem",
                        color: "oklch(0.28 0.09 152)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Thank You!
                    </p>
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.82rem",
                        color: "oklch(0.47 0 0)",
                      }}
                    >
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="contact.input"
                      style={{
                        padding: "0.75rem",
                        border: "1px solid oklch(0.85 0.03 85)",
                        background: "#fff",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.85rem",
                        outline: "none",
                        color: "oklch(0.14 0 0)",
                        borderRadius: 0,
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      data-ocid="contact.input"
                      style={{
                        padding: "0.75rem",
                        border: "1px solid oklch(0.85 0.03 85)",
                        background: "#fff",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.85rem",
                        outline: "none",
                        color: "oklch(0.14 0 0)",
                        borderRadius: 0,
                      }}
                    />
                    <textarea
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      required
                      rows={4}
                      data-ocid="contact.textarea"
                      style={{
                        padding: "0.75rem",
                        border: "1px solid oklch(0.85 0.03 85)",
                        background: "#fff",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.85rem",
                        outline: "none",
                        color: "oklch(0.14 0 0)",
                        resize: "vertical",
                        borderRadius: 0,
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{
                        padding: "0.75rem",
                        fontSize: "0.75rem",
                        justifyContent: "center",
                      }}
                      data-ocid="contact.submit_button"
                    >
                      Send Message
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer className="site-footer">
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "3rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
            gap: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "oklch(0.64 0.10 75)",
                  marginBottom: "0.3rem",
                }}
              >
                RIVEDA NATURALS
              </div>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: "oklch(0.75 0.03 90)",
                }}
              >
                Rooted in Nature
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.78rem",
                color: "oklch(0.72 0.03 90)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Premium natural makhana and spice powders sourced directly from
              trusted Indian farms. Pure, unadulterated, and full of flavour.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading">Quick Links</p>
            {["Shop All", "Makhana", "Spices", "About Us", "Blog"].map((l) => (
              <button
                type="button"
                key={l}
                className="footer-link"
                onClick={() => scrollTo(l.toLowerCase().replace(" ", ""))}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Info */}
          <div>
            <p className="footer-heading">Info</p>
            {[
              "Shipping Policy",
              "Returns",
              "Privacy Policy",
              "Terms of Service",
              "Contact",
            ].map((l) => (
              <button
                type="button"
                key={l}
                className="footer-link"
                onClick={() => scrollTo("contact")}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Subscribe */}
          <div>
            <p className="footer-heading">Stay Connected</p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.78rem",
                color: "oklch(0.72 0.03 90)",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: "1rem",
              }}
            >
              Get exclusive offers and nature-inspired wellness tips.
            </p>
            {/* Instagram link */}
            <a
              href="https://www.instagram.com/rivedanaturals"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "oklch(0.64 0.10 75)",
                textDecoration: "none",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
                marginBottom: "1rem",
                transition: "opacity 0.2s",
              }}
              data-ocid="footer.link"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="oklch(0.64 0.10 75)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Instagram"
                role="img"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="oklch(0.64 0.10 75)"
                  stroke="none"
                />
              </svg>
              Follow us on Instagram
            </a>
            <div style={{ display: "flex" }}>
              <input
                type="email"
                placeholder="Enter email"
                style={{
                  flex: 1,
                  padding: "0.6rem 0.75rem",
                  background: "oklch(0.30 0.07 152)",
                  border: "1px solid oklch(0.40 0.06 152)",
                  borderRight: "none",
                  color: "oklch(0.92 0.03 90)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.78rem",
                  outline: "none",
                  borderRadius: 0,
                }}
                data-ocid="footer.input"
              />
              <button
                type="button"
                className="btn-gold"
                style={{
                  fontSize: "0.65rem",
                  padding: "0.6rem 0.9rem",
                  borderRadius: 0,
                }}
                data-ocid="footer.submit_button"
              >
                Subscribe
              </button>
            </div>
            <div
              style={{
                marginTop: "1.25rem",
                padding: "0.75rem",
                border: "1px solid oklch(0.40 0.07 152)",
                background: "oklch(0.22 0.08 152)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "oklch(0.64 0.10 75)",
                  marginBottom: "0.25rem",
                }}
              >
                Opening Soon
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.95rem",
                  color: "oklch(0.92 0.03 90)",
                  fontWeight: 600,
                }}
              >
                Riveda Cafe
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.7rem",
                  color: "oklch(0.68 0.03 88)",
                  marginTop: "0.2rem",
                }}
              >
                Dehradun, Uttarakhand
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Riveda Naturals. All rights
          reserved.&nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            href="https://www.instagram.com/rivedanaturals"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.64 0.10 75)", marginRight: "0.75rem" }}
            data-ocid="footer.link"
          >
            Instagram
          </a>
          |&nbsp;&nbsp; Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </footer>

      {/* ---- Cart Drawer ---- */}
      {cartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
    </>
  );
}
