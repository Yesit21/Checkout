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
      image: "/denim-shirt.jpg",
    },
    {
      id: 2,
      name: "Denim Pants",
      ref: "001701231",
      color: "Blue",
      quantity: 3,
      price: 9000.0,
      image: "/denim-pants.jpg",
    },
    {
      id: 3,
      name: "Sony Smartwat...",
      ref: "00482091",
      color: "Black",
      quantity: 1,
      price: 24500.0,
      image: "/smartwatch.jpg",
    },
    {
      id: 4,
      name: "Cognac Oxford",
      ref: "00171265",
      color: "Brown",
      quantity: 1,
      price: 4500.0,
      image: "/oxford-shoes.jpg",
    },
  ]);

  const [cardType, setCardType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

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
    alert("Procesando pago...");
  };

  return (
    <div className="relative h-screen bg-[#F5F5F5] flex overflow-hidden">
      {/* Left Section - Shopping Cart */}
      <div className="w-full lg:w-[60%] bg-[#F5F5F5] p-4 lg:p-6 flex flex-col h-screen">
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
              <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 text-[10px]">
                  IMG
                </div>
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

      {/* Right Section - Card Details (Overlapping) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[40%]">
        {/* Step Indicators - Outside on the left edge */}
        <div className="absolute -left-5 top-[80px] xl:top-[100px] flex flex-col gap-3 xl:gap-4 z-20">
          <div className="w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full bg-[#F4C430] shadow-md"></div>
          <div className="w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full bg-[#6B6B6B] shadow-md"></div>
          <div className="w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full bg-[#6B6B6B] shadow-md"></div>
        </div>

        {/* Card Details Container - NO rounded corners */}
        <div className="bg-[#4A4A4A] h-full shadow-2xl">
          <div className="p-8 lg:p-10 xl:p-14 flex flex-col h-full">
            {/* Title */}
            <h2 className="text-2xl lg:text-3xl xl:text-[32px] font-semibold text-[#DAA520] mb-8 lg:mb-10 xl:mb-12 mt-4 lg:mt-6 xl:mt-8 flex-shrink-0">
              Card Details
            </h2>

            {/* Form */}
            <div className="flex flex-col gap-6 lg:gap-8 xl:gap-10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {/* Select Card Type */}
              <div className="flex flex-col gap-3 lg:gap-4 xl:gap-5 flex-shrink-0">
                <label className="text-[#B0B0B0] text-sm lg:text-[15px]">
                  Select Card Type
                </label>
                <div className="flex items-center justify-center gap-6 lg:gap-7 xl:gap-8">
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
              <div className="flex flex-col gap-2 lg:gap-3 flex-shrink-0">
                <label className="text-[#B0B0B0] text-sm lg:text-[15px]">
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
              <div className="grid grid-cols-[60%_35%] gap-6 lg:gap-8 flex-shrink-0">
                {/* Expiry Date */}
                <div className="flex flex-col gap-2 lg:gap-3">
                  <label className="text-[#B0B0B0] text-sm lg:text-[15px]">
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
                  <label className="text-[#B0B0B0] text-sm lg:text-[15px]">CVV</label>
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
              className="mt-auto bg-[#FFC107] text-[#212121] font-bold text-base lg:text-lg xl:text-[19px] py-4 lg:py-5 rounded-lg lg:rounded-xl relative flex items-center justify-center hover:bg-[#FFD54F] transition-colors shadow-lg flex-shrink-0"
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
  );
}
