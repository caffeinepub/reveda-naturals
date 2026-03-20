import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export interface backendInterface {
    addProduct(name: string, price: bigint, description: string, imageUrl: string): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    getBrandMission(): Promise<string>;
    getCartContents(): Promise<Array<[bigint, CartItem]>>;
    getCartTotal(): Promise<bigint>;
    getContactForms(): Promise<Array<[bigint, ContactForm]>>;
    getProduct(productId: bigint): Promise<Product>;
    getProducts(): Promise<Array<[bigint, Product]>>;
    removeFromCart(productId: bigint): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<bigint>;
    updateBrandMission(text: string): Promise<void>;
}
