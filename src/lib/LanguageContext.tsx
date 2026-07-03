"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "mr";

interface LanguageContextValue {
  language: Language;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  toggle: () => {},
});

const STORAGE_KEY = "bhagwati-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // localStorage doesn't exist during SSR, so this can't be a lazy useState
    // initializer — it must run post-mount, which is exactly what this effect is for.
    const stored = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "mr" || stored === "en") setLanguage(stored);
  }, []);

  const toggle = () => {
    setLanguage((prev) => {
      const next: Language = prev === "en" ? "mr" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Picks the Marathi value when active and present, otherwise falls back to English. */
export function pick(language: Language, en: string, mr?: string): string {
  return language === "mr" && mr ? mr : en;
}

/** Site-wide UI label dictionary, used with labels[language].key */
export const labels: Record<Language, Record<string, string>> = {
  en: {
    // Product / price (original scope)
    startingFrom: "Starting from",
    onwards: "onwards",
    orderNow: "Order Now",
    quickView: "Quick View",
    sizes: "sizes",
    availableSizes: "Available Sizes",
    ingredients: "Ingredients",
    useFor: "Use for",
    shelfLife: "Shelf life",
    recipe: "Recipe",
    popular: "Popular",
    newLaunch: "New Launch",

    // Navbar
    navHome: "Home",
    navProducts: "Products",
    navAbout: "About Us",
    navFaq: "FAQ",
    navContact: "Contact",
    downloadCatalogue: "Download Catalogue",
    giveFeedback: "Feedback",

    // Hero
    heroSubtitle: "Authentic Maharashtrian Food Products · Since 2008",
    fssaiCertified: "FSSAI Certified",
    hundredPercentNatural: "100% Natural",
    since2008: "Since 2008",
    exploreProducts: "Explore 50+ Products",

    // Stats
    yearsOfExcellence: "Years of Excellence",
    productsAvailable: "Products Available",
    happyCustomers: "Happy Customers",
    naturalIngredients: "Natural Ingredients",

    // Categories
    whatWeMake: "What We Make",
    ourProductCategories: "Our Product Categories",
    categoriesSubtitle: "Six categories of authentic Maharashtrian food crafted with natural ingredients and zero artificial additives.",
    viewAllProducts: "View All 50+ Products",

    // Featured Products
    customerFavourites: "Customer Favourites",
    featuredProducts: "Featured Products",
    viewAll: "View All",
    seeAllProducts: "See All 50+ Products",

    // About Preview
    ourStory: "Our Story",
    aboutTitle: "A Home Business That Grew Into a Household Name",
    aboutDescription: "Bhagwati Industry & Marketing began in 2008 as a home kitchen, born from a passion for authentic Maharashtrian flavours. What started with Kala Masala and Bhadang has grown into a trusted brand with 30+ products, serving thousands of happy families across Aurangabad and Maharashtra.",
    yearsOfTrust: "Years of Trust",
    readFullStory: "Read Our Full Story",

    // Testimonials
    whatCustomersSay: "What Customers Say",
    lovedAcrossMaharashtra: "Loved Across Maharashtra",
    testimonialsSubtitle: "Thousands of happy families trust Bhagwati for authentic homemade taste.",
    bought: "Bought",
    shareYourExperience: "Share Your Experience",

    // CTA Banner
    ctaTitle: "Ready to Order Authentic Bhagwati Products?",
    ctaSubtitle: "Call us or fill out our contact form — we deliver within Aurangabad and ship across Maharashtra.",
    sendEnquiry: "Send Enquiry",

    // Footer
    quickLinks: "Quick Links",
    productCategories: "Product Categories",
    contactUs: "Contact Us",
    allProducts: "All Products",
    businessHours: "Mon – Sat: 9:00 AM – 6:00 PM",

    // FAQ page
    faqHeroTitle: "Frequently Asked Questions",
    faqHeroSubtitle: "Quick answers to everything about our products, ordering and delivery",
    faqSearchPlaceholder: "Search questions…",
    faqCatAll: "All Questions",
    faqCatProducts: "🌾 Products",
    faqCatOrdering: "🛒 Ordering",
    faqCatBusiness: "🏢 About Us",
    faqNoneFound: "No questions found",
    faqTryDifferent: "Try a different keyword",
    faqStillHaveQuestion: "Still have a question?",
    faqStillHaveQuestionSubtitle: "Chat with us using the chatbot below, call us, or send us your question directly.",
    faqAskYourQuestion: "Ask Your Question",
    faqNamePlaceholder: "Your name (optional)",
    faqContactPlaceholder: "Phone / email (optional)",
    faqQuestionPlaceholder: "Type your question…",
    faqSendQuestion: "Send Question",
    faqSending: "Sending…",
    faqCancel: "Cancel",
    faqQuestionSent: "Question Sent!",
    faqQuestionSentSubtitle: "We'll get back to you soon.",
    faqAskAnother: "Ask another question",
  },
  mr: {
    startingFrom: "किंमत सुरू",
    onwards: "पासून",
    orderNow: "ऑर्डर करा",
    quickView: "पहा",
    sizes: "आकार",
    availableSizes: "उपलब्ध आकार",
    ingredients: "साहित्य",
    useFor: "वापर",
    shelfLife: "टिकाऊपणा",
    recipe: "कृती",
    popular: "लोकप्रिय",
    newLaunch: "नवीन लॉंच",

    navHome: "मुख्यपृष्ठ",
    navProducts: "उत्पादने",
    navAbout: "आमच्याबद्दल",
    navFaq: "प्रश्न",
    navContact: "संपर्क",
    downloadCatalogue: "कॅटलॉग डाउनलोड करा",
    giveFeedback: "अभिप्राय",

    heroSubtitle: "अस्सल महाराष्ट्रीयन खाद्यपदार्थ · २००८ पासून",
    fssaiCertified: "FSSAI प्रमाणित",
    hundredPercentNatural: "१००% नैसर्गिक",
    since2008: "२००८ पासून",
    exploreProducts: "५०+ उत्पादने पहा",

    yearsOfExcellence: "वर्षांचा अनुभव",
    productsAvailable: "उपलब्ध उत्पादने",
    happyCustomers: "समाधानी ग्राहक",
    naturalIngredients: "नैसर्गिक घटक",

    whatWeMake: "आम्ही काय बनवतो",
    ourProductCategories: "आमच्या उत्पादन श्रेणी",
    categoriesSubtitle: "नैसर्गिक घटकांपासून आणि कोणत्याही कृत्रिम पदार्थांशिवाय बनवलेल्या सहा प्रकारच्या अस्सल महाराष्ट्रीयन खाद्यपदार्थांच्या श्रेणी.",
    viewAllProducts: "सर्व ५०+ उत्पादने पहा",

    customerFavourites: "ग्राहकांचे आवडते",
    featuredProducts: "वैशिष्ट्यपूर्ण उत्पादने",
    viewAll: "सर्व पहा",
    seeAllProducts: "सर्व ५०+ उत्पादने पहा",

    ourStory: "आमची कथा",
    aboutTitle: "घरगुती व्यवसायातून घराघरातील विश्वासार्ह नाव",
    aboutDescription: "भगवती इंडस्ट्री अँड मार्केटिंगची सुरुवात २००८ मध्ये एका घरगुती स्वयंपाकघरातून झाली, अस्सल महाराष्ट्रीयन चवींच्या आवडीतून. काळा मसाला आणि भडंगपासून सुरू झालेला हा प्रवास आता ३०+ उत्पादनांसह औरंगाबाद आणि महाराष्ट्रभरातील हजारो कुटुंबांचा विश्वासार्ह ब्रँड बनला आहे.",
    yearsOfTrust: "विश्वासाची वर्षे",
    readFullStory: "आमची संपूर्ण कथा वाचा",

    whatCustomersSay: "ग्राहक काय म्हणतात",
    lovedAcrossMaharashtra: "महाराष्ट्रभर आवडलेले",
    testimonialsSubtitle: "हजारो आनंदी कुटुंबे अस्सल घरगुती चवीसाठी भगवतीवर विश्वास ठेवतात.",
    bought: "खरेदी केले",
    shareYourExperience: "तुमचा अनुभव शेअर करा",

    ctaTitle: "अस्सल भगवती उत्पादने ऑर्डर करण्यास तयार आहात?",
    ctaSubtitle: "आम्हाला कॉल करा किंवा संपर्क फॉर्म भरा — आम्ही औरंगाबादमध्ये डिलिव्हरी करतो आणि महाराष्ट्रभर पाठवतो.",
    sendEnquiry: "चौकशी पाठवा",

    quickLinks: "द्रुत दुवे",
    productCategories: "उत्पादन श्रेणी",
    contactUs: "आमच्याशी संपर्क करा",
    allProducts: "सर्व उत्पादने",
    businessHours: "सोम – शनि: सकाळी ९:०० – सायं ६:००",

    faqHeroTitle: "नेहमी विचारले जाणारे प्रश्न",
    faqHeroSubtitle: "आमच्या उत्पादने, ऑर्डर आणि डिलिव्हरीबद्दल झटपट उत्तरे",
    faqSearchPlaceholder: "प्रश्न शोधा…",
    faqCatAll: "सर्व प्रश्न",
    faqCatProducts: "🌾 उत्पादने",
    faqCatOrdering: "🛒 ऑर्डर",
    faqCatBusiness: "🏢 आमच्याबद्दल",
    faqNoneFound: "कोणतेही प्रश्न सापडले नाहीत",
    faqTryDifferent: "वेगळा शब्द वापरून पहा",
    faqStillHaveQuestion: "अजून प्रश्न आहे?",
    faqStillHaveQuestionSubtitle: "खाली असलेल्या चॅटबॉटशी बोला, आम्हाला कॉल करा, किंवा थेट तुमचा प्रश्न पाठवा.",
    faqAskYourQuestion: "तुमचा प्रश्न विचारा",
    faqNamePlaceholder: "तुमचे नाव (पर्यायी)",
    faqContactPlaceholder: "फोन / ईमेल (पर्यायी)",
    faqQuestionPlaceholder: "तुमचा प्रश्न टाईप करा…",
    faqSendQuestion: "प्रश्न पाठवा",
    faqSending: "पाठवत आहे…",
    faqCancel: "रद्द करा",
    faqQuestionSent: "प्रश्न पाठवला!",
    faqQuestionSentSubtitle: "आम्ही लवकरच तुमच्याशी संपर्क करू.",
    faqAskAnother: "आणखी प्रश्न विचारा",
  },
};
