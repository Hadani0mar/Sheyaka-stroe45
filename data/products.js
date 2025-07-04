export const products = [
  {
    id: 1,
    name: "ساعة ذكية عصرية",
    nameEn: "Smart Watch",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "watches",
    categoryAr: "ساعات",
    description: "ساعة ذكية عصرية مع مميزات متقدمة لتتبع الصحة واللياقة البدنية. تصميم أنيق وعملي مناسب لجميع المناسبات.",
    features: [
      "مقاومة للماء",
      "تتبع معدل ضربات القلب",
      "إشعارات ذكية",
      "بطارية تدوم 7 أيام"
    ],
    colors: ["أسود", "فضي", "ذهبي"],
    sizes: ["صغير", "متوسط", "كبير"],
    rating: 4.5,
    reviews: 128,
    isNew: true,
    isBestSeller: false,
    isOnSale: true
  },
  {
    id: 2,
    name: "حقيبة جلدية فاخرة",
    nameEn: "Luxury Leather Bag",
    price: 450,
    originalPrice: 600,
    discount: 25,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "bags",
    categoryAr: "حقائب",
    description: "حقيبة جلدية فاخرة صنعت من أجود أنواع الجلد الطبيعي. تصميم كلاسيكي أنيق يناسب المناسبات الرسمية والكاجوال.",
    features: [
      "جلد طبيعي 100%",
      "تصميم كلاسيكي",
      "حجم مثالي",
      "جودة عالية"
    ],
    colors: ["بني", "أسود", "بيج"],
    sizes: ["صغير", "متوسط", "كبير"],
    rating: 4.8,
    reviews: 89,
    isNew: false,
    isBestSeller: true,
    isOnSale: true
  },
  {
    id: 3,
    name: "نظارة شمسية عصرية",
    nameEn: "Modern Sunglasses",
    price: 180,
    originalPrice: 250,
    discount: 28,
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "accessories",
    categoryAr: "إكسسوارات",
    description: "نظارة شمسية عصرية بتصميم أنيق وعدسات عالية الجودة توفر حماية كاملة من الأشعة فوق البنفسجية.",
    features: [
      "حماية UV400",
      "عدسات مضادة للخدش",
      "إطار مقاوم",
      "تصميم عصري"
    ],
    colors: ["أسود", "بني", "أزرق"],
    sizes: ["متوسط", "كبير"],
    rating: 4.3,
    reviews: 67,
    isNew: true,
    isBestSeller: false,
    isOnSale: true
  },
  {
    id: 4,
    name: "قميص قطني مريح",
    nameEn: "Comfort Cotton Shirt",
    price: 120,
    originalPrice: 120,
    discount: 0,
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "clothing",
    categoryAr: "ملابس",
    description: "قميص قطني مريح بتصميم كلاسيكي وخامة عالية الجودة. مناسب للاستخدام اليومي والمناسبات الكاجوال.",
    features: [
      "قطن 100%",
      "مريح وناعم",
      "سهل العناية",
      "تصميم كلاسيكي"
    ],
    colors: ["أبيض", "أزرق", "رمادي"],
    sizes: ["صغير", "متوسط", "كبير", "كبير جداً"],
    rating: 4.2,
    reviews: 45,
    isNew: false,
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: 5,
    name: "حذاء رياضي عملي",
    nameEn: "Practical Sports Shoes",
    price: 350,
    originalPrice: 420,
    discount: 17,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "shoes",
    categoryAr: "أحذية",
    description: "حذاء رياضي عملي مصمم للراحة والأداء العالي. مناسب للرياضة والاستخدام اليومي.",
    features: [
      "تصميم مريح",
      "خامة متينة",
      "مناسب للرياضة",
      "نعل مضاد للانزلاق"
    ],
    colors: ["أسود", "أبيض", "أزرق"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    rating: 4.6,
    reviews: 92,
    isNew: true,
    isBestSeller: true,
    isOnSale: true
  }
];

export const categories = [
  {
    id: "all",
    name: "جميع المنتجات",
    nameEn: "All Products",
    icon: "grid"
  },
  {
    id: "clothing",
    name: "ملابس",
    nameEn: "Clothing",
    icon: "shirt"
  },
  {
    id: "shoes",
    name: "أحذية",
    nameEn: "Shoes",
    icon: "footprints"
  },
  {
    id: "bags",
    name: "حقائب",
    nameEn: "Bags",
    icon: "shopping-bag"
  },
  {
    id: "accessories",
    name: "إكسسوارات",
    nameEn: "Accessories",
    icon: "watch"
  },
  {
    id: "watches",
    name: "ساعات",
    nameEn: "Watches",
    icon: "clock"
  }
];