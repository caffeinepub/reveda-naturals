import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    name : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  let productList = Map.empty<Nat, Product>();
  let cart = Map.empty<Nat, CartItem>();
  let contactForms = Map.empty<Nat, ContactForm>();
  var brandMissionText : Text = "Welcome to Reveda Naturals. Discover the power of nature for your skin and well-being.";
  var nextProductId = 0;
  var nextContactFormId = 0;

  // Products Management
  public shared ({ caller }) func addProduct(name : Text, price : Nat, description : Text, imageUrl : Text) : async Nat {
    let productId = nextProductId;
    let product : Product = { name; price; description; imageUrl };
    productList.add(productId, product);
    nextProductId += 1;
    productId;
  };

  public query ({ caller }) func getProducts() : async [(Nat, Product)] {
    productList.toArray();
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    switch (productList.get(productId)) {
      case (null) { Runtime.trap("Product Not Found") };
      case (?product) { product };
    };
  };

  // Cart Management
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    switch (cart.get(productId)) {
      case (null) {
        let cartItem : CartItem = { productId; quantity };
        cart.add(productId, cartItem);
      };
      case (?existing) {
        let updatedItem : CartItem = {
          productId;
          quantity = existing.quantity + quantity;
        };
        cart.add(productId, updatedItem);
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (cart.containsKey(productId)) {
      cart.remove(productId);
    } else {
      Runtime.trap("Item Not in Cart");
    };
  };

  public query ({ caller }) func getCartContents() : async [(Nat, CartItem)] {
    cart.toArray();
  };

  public query ({ caller }) func getCartTotal() : async Nat {
    var total = 0;
    let cartArray = cart.values().toArray();
    let cartIter = cartArray.values();
    cartIter.forEach(
      func(item) {
        switch (productList.get(item.productId)) {
          case (?product) {
            total += product.price * item.quantity;
          };
          case (null) {};
        };
      }
    );
    total;
  };

  // About/Brand Info
  public shared ({ caller }) func updateBrandMission(text : Text) : async () {
    brandMissionText := text;
  };

  public query ({ caller }) func getBrandMission() : async Text {
    brandMissionText;
  };

  // Contact Form
  public query ({ caller }) func getContactForms() : async [(Nat, ContactForm)] {
    contactForms.toArray();
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Nat {
    let formId = nextContactFormId;
    let form : ContactForm = { name; email; message };
    contactForms.add(formId, form);
    nextContactFormId += 1;
    formId;
  };
};
