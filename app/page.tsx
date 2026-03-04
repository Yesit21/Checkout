"use client";

import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  ref: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Denim T-Shirt",
      ref: "001701265",
      color: "Blue",
      quantity: 2,
      price: 7500.0,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Denim Pants",
      ref: "001701231",
      color: "Blue",
      quantity: 3,
      price: 9000.0,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Sony Smartwatch",
      ref: "00482091",
      color: "Black",
      quantity: 1,
      price: 24500.0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Cognac Oxford",
      ref: "00171265",
      color: "Brown",
      quantity: 1,
      price: 4500.0,
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=200&h=200&fit=crop",
    },
  ]);

  const [cardType, setCardType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [isCardOpen, setIsCardOpen] = useState<boolean>(true);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Processing payment...");
  };

  return (
    <div className="relative h-screen bg-[#F5F5F5] flex overflow-hidden">
      {/* Left Section - Shopping Cart - Adapts to available space */}
      <div 
        className={`bg-[#F5F5F5] p-4 lg:p-6 flex flex-col h-screen transition-all duration-300 ${
          isCardOpen ? 'w-full lg:w-[60%]' : 'w-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-xl font-bold text-black">Q</span>
          </div>
          <h1 className="text-lg lg:text-xl text-[#6B6B6B] font-light">
            Your Shopping Cart
          </h1>
        </div>

        {/* Product List - Scrollable only if more than 7 items */}
        <div className="flex flex-col gap-2.5 lg:gap-3 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-3 grid grid-cols-[60px_1fr_auto] lg:grid-cols-[70px_1fr_auto] gap-3 items-center flex-shrink-0"
            >
              {/* Product Image */}
              <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23e5e7eb" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">IMG</text></svg>';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm text-black leading-tight">
                  {item.name}
                </h3>
                <p className="text-[10px] text-[#BDBDBD] mt-0.5">Ref: {item.ref}</p>
                <p className="text-xs text-[#757575] mt-0.5">{item.color}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 lg:gap-4">
                {/* Quantity Controls */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-5 h-5 rounded-full bg-[#E0E0E0] flex items-center justify-center text-[#616161] hover:bg-[#D0D0D0] transition-colors text-xs"
                  >
                    +
                  </button>
                  <span className="text-xs font-medium text-black my-0.5">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-5 h-5 rounded-full bg-[#E0E0E0] flex items-center justify-center text-[#616161] hover:bg-[#D0D0D0] transition-colors text-xs"
                  >
                    −
                  </button>
                </div>

                {/* Price */}
                <span className="font-semibold text-xs lg:text-sm whitespace-nowrap text-black">
                  {item.price.toFixed(2)} NGN
                </span>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[#9E9E9E] hover:text-[#616161] text-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 flex-shrink-0">
          <button className="flex items-center gap-2 text-[#424242] hover:text-black transition-colors text-sm">
            <span>←</span>
            <span>Back to Shop</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#424242] text-sm">Subtotal:</span>
            <span className="text-lg font-bold text-black">
              {subtotal.toFixed(2)} NGN
            </span>
          </div>
        </div>
      </div>

      {/* Right Section - Card Details (Collapsible with toggle button) */}
      <div 
        className={`hidden lg:flex fixed right-0 top-0 bottom-0 transition-all duration-300 ${
          isCardOpen ? 'w-[40%]' : 'w-auto'
        }`}
      >
        {/* Card Details Container with Toggle Button attached */}
        <div className="relative h-full flex">
          {/* Toggle Button with 3 dots - Always visible, attached to card */}
          <button
            onClick={() => setIsCardOpen(!isCardOpen)}
            className="bg-[#4A4A4A] p-3 rounded-l-lg shadow-md hover:bg-[#5A5A5A] transition-colors flex-shrink-0 self-start mt-[100px]"
          >
            <div className="flex flex-col gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F4C430]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6B6B6B]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6B6B6B]"></div>
            </div>
          </button>

          {/* Card Details Panel - Slides in/out */}
          <div 
            className={`bg-[#4A4A4A] h-full shadow-2xl transition-all duration-300 overflow-hidden ${
              isCardOpen ? 'w-[calc(100vw*0.4-48px)]' : 'w-0'
            }`}
          >
            <div className={`p-8 lg:p-10 xl:p-12 flex flex-col h-full ${isCardOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#DAA520] mb-8 lg:mb-10 mt-4 lg:mt-6 flex-shrink-0 whitespace-nowrap">
                Card Details
              </h2>

              {/* Form - NO SCROLL */}
              <div className="flex flex-col gap-6 lg:gap-7 flex-1">
                {/* Select Card Type */}
                <div className="flex flex-col gap-3 lg:gap-4">
                  <label className="text-[#B0B0B0] text-sm whitespace-nowrap">
                    Select Card Type
                  </label>
                  <div className="flex items-center justify-center gap-6 lg:gap-7">
                    {/* Mastercard */}
                    <button
                      onClick={() => setCardType("mastercard")}
                      className={`flex items-center justify-center transition-opacity ${
                        cardType === "mastercard" ? "opacity-100" : "opacity-50"
                      } hover:opacity-100`}
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#D0D0D0]"></div>
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#B0B0B0] -ml-2.5 lg:-ml-3"></div>
                      </div>
                    </button>

                    {/* VISA */}
                    <button
                      onClick={() => setCardType("visa")}
                      className={`text-[#909090] font-bold text-lg lg:text-xl transition-opacity ${
                        cardType === "visa" ? "opacity-100" : "opacity-50"
                      } hover:opacity-100`}
                    >
                      VISA
                    </button>

                    {/* Verve */}
                    <button
                      onClick={() => setCardType("verve")}
                      className={`text-[#909090] font-semibold text-sm lg:text-base transition-opacity ${
                        cardType === "verve" ? "opacity-100" : "opacity-50"
                      } hover:opacity-100`}
                    >
                      Verve
                    </button>
                  </div>
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-2 lg:gap-3">
                  <label className="text-[#B0B0B0] text-sm whitespace-nowrap">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    placeholder=""
                    className="bg-transparent border-b-[1.5px] border-white pb-2 lg:pb-3 text-white text-sm lg:text-base outline-none placeholder-[#707070] focus:border-[#F4C430] transition-colors"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-[60%_35%] gap-6 lg:gap-8">
                  {/* Expiry Date */}
                  <div className="flex flex-col gap-2 lg:gap-3">
                    <label className="text-[#B0B0B0] text-sm whitespace-nowrap">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="___/___/___"
                      maxLength={10}
                      className="bg-transparent border-b-[1.5px] border-white pb-2 lg:pb-3 text-white text-sm lg:text-base outline-none placeholder-[#707070] focus:border-[#F4C430] transition-colors"
                    />
                  </div>

                  {/* CVV */}
                  <div className="flex flex-col gap-2 lg:gap-3">
                    <label className="text-[#B0B0B0] text-sm">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="___"
                      maxLength={3}
                      className="bg-transparent border-b-[1.5px] border-white pb-2 lg:pb-3 text-white text-sm lg:text-base outline-none placeholder-[#707070] focus:border-[#F4C430] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="mt-auto bg-[#FFC107] text-[#212121] font-bold text-base lg:text-lg py-4 lg:py-5 rounded-lg lg:rounded-xl relative flex items-center justify-center hover:bg-[#FFD54F] transition-colors shadow-lg flex-shrink-0"
              >
                Checkout
                <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 w-8 h-8 lg:w-9 lg:h-9 bg-[#3A3A3A] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#FFC107]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
