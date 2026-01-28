export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    frameCount: number;
    startFrame?: number;
    themeColor: string;
    gradient: string;
    heroHeadline?: string; // Large engaging text
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    category: 'candy' | 'mouth-freshener';
    exportAppeal: {
        title: string;
        description: string;
        healthBenefits: string[];
    };
    detailsSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const products: Product[] = [
    {
        id: "kaccha-mango",
        name: "Kaccha Mango",
        subName: "The Tangy Legend",
        category: "candy",
        price: "₹199",
        description: "Experience the nostalgic kick of raw mango with a modern candy twist.",
        folderPath: "/images/kaccha-mango",
        frameCount: 200,
        startFrame: 0, // Skip intro splash frames
        themeColor: "#84cc16", // Lime-500
        gradient: "from-lime-400 to-green-600",
        heroHeadline: "INSTANT NOSTALGIA HIT",
        features: ["Raw Mango Juice", "Sour Coating", "Vitamin C", "Zero Artificial Colors"],
        stats: [
            { label: "Sour Level", val: "9/10" },
            { label: "Tang", val: "100%" },
            { label: "Sweetness", val: "4/10" },
        ],
        section1: { title: "Raw & Real", subtitle: "Made from real raw mangoes, sun-dried for authentic tang." },
        section2: { title: "Sour Explosion", subtitle: "First hit is sour, the melt is sweet. A perfect balance." },
        section3: { title: "Nostalgia Reloaded", subtitle: "Takes you back to school days with every chew." },
        section4: { title: "Flavor Sealed", subtitle: "Individual packs to lock in the freshness." },
        exportAppeal: {
            title: "Authentic Indian Tang",
            description: "Capture the essence of Indian summers with our Kaccha Mango. Perfect for global palates seeking bold, authentic fruit flavors. A top choice for ethnic markets and gourmet candy sections.",
            healthBenefits: ["Rich in Vitamin C", "Digestive Aid (Raw Mango)", "Mood Booster", "Natural Fruit Extracts"]
        },
        detailsSection: {
            title: "Why Kaccha Mango?",
            description: "We source the finest Totapuri mangoes to create a candy that feels like chewing on a real fruit slice. No shortcuts, just pure tang.",
            imageAlt: "Kaccha Mango candy pack close up",
        },
        freshnessSection: {
            title: "Farm to Candy",
            description: "Batch-crafted within 48 hours of harvest to ensure peak flavor retention.",
        },
        buyNowSection: {
            price: "₹199",
            unit: "Pack of 50",
            processingParams: ["Slow Cooked", "Hand Wrapped", "Quality Checked"],
            deliveryPromise: "Delivered in 3-5 Business Days",
            returnPolicy: "Easy Returns if melted or damaged",
        },
    },
    {
        id: "orange-blast",
        name: "Orange Blast",
        subName: "Juicy Citrus Chew",
        category: "candy",
        price: "₹199",
        description: "A burst of Nagpur oranges in every bite. Juicy, zesty, and refreshing.",
        folderPath: "/images/orange-blast",
        startFrame: 0,
        frameCount: 240,
        themeColor: "#f97316", // Orange-500
        gradient: "from-orange-400 to-red-500",
        heroHeadline: "REAL ORANGE EXPLOSION",
        features: ["Real Orange Pulp", "Zesty Peel Oil", "Natural Sugar", "No Preservatives"],
        stats: [
            { label: "Juiciness", val: "10/10" },
            { label: "Zest", val: "8/10" },
            { label: "Sweetness", val: "7/10" },
        ],
        section1: { title: "Sun-Kissed", subtitle: "Captured the essence of sun-ripened oranges." },
        section2: { title: "Citrus Kick", subtitle: "A zesty awakening for your taste buds." },
        section3: { title: "Juice Bomb", subtitle: "Liquid-filled center that explodes with flavor." },
        section4: { title: "Vitamin Boost", subtitle: "Packed with natural Vitamin C." },
        exportAppeal: {
            title: "Global Citrus Favorite",
            description: "Orange is the world's favorite flavor, and we've perfected it. Sourced from the famous orchards of Nagpur, this candy delivers a premium citrus experience that domestic and international buyers love.",
            healthBenefits: ["Immunity Support (Vit C)", "Natural Antioxidants", "Refreshing Zest", "No Artificial Sweeteners"]
        },
        detailsSection: {
            title: "The Orange Standard",
            description: "We don't use artificial flavoring. We use real concentrated orange juice for an authentic fruity experience.",
            imageAlt: "Orange Blast candy spray",
        },
        freshnessSection: {
            title: "Zest Locked",
            description: "Cold-pressed orange oil coating for immediate aroma.",
        },
        buyNowSection: {
            price: "₹199",
            unit: "Pack of 50",
            processingParams: ["Cold Pressed", "Double Sealed", "Zest Infused"],
            deliveryPromise: "Delivered in 3-5 Business Days",
            returnPolicy: "Easy Returns if melted or damaged",
        },
    },
    {
        id: "mix-fruit",
        name: "Mix Fruit",
        subName: "Tropical Fiesta",
        category: "candy",
        price: "₹199",
        description: "A wild party of flavors in your mouth. Strawberry, Pineapple, and Green Apple in every chew.",
        folderPath: "/images/mix-fruit",
        frameCount: 240,
        themeColor: "#ec4899", // Pink/Magenta for fruity vibe
        gradient: "from-pink-500 to-purple-500",
        heroHeadline: "TROPICAL FLAVOR STORM",
        features: ["Real Fruit Medley", "Natural Extracts", "Berry Blast", "Zero Trans Fat"],
        stats: [
            { label: "Variety", val: "10/10" },
            { label: "Sweetness", val: "8/10" },
            { label: "Tang", val: "6/10" },
        ],
        section1: { title: "Fruit Salad", subtitle: "Why pick one when you can have them all?" },
        section2: { title: "Berry Burst", subtitle: "Notes of wild berries and tropical punch." },
        section3: { title: "Juice Party", subtitle: "A symphony of flavors that changes with every bite." },
        section4: { title: "Rainbow Fun", subtitle: "Colors that pop, flavors that rock." },
        exportAppeal: {
            title: "A Symphony of Flavors",
            description: "Why settle for one? Our Mix Fruit pack is a carnival of tropical tastes. Ideal for gifting and family packs, offering something for everyone. A universal crowd-pleaser.",
            healthBenefits: ["Diverse Fruit Extracts", "Balanced Sweetness", "Kid-Friendly", "Natural Energetic Boost"]
        },
        detailsSection: {
            title: "The Ultimate Mix",
            description: "Can't decide? Our Mix Fruit candy brings together the best of the orchard. Sun-ripened strawberries, tangy pineapple, and crisp apple notes.",
            imageAlt: "Mix Fruit candy assortment",
        },
        freshnessSection: {
            title: "Orchard Fresh",
            description: "Directly from the grove to the wrapper. Nature's candy, perfected.",
        },
        buyNowSection: {
            price: "₹199",
            unit: "Pack of 50",
            processingParams: ["Assorted", "Flavor Sealed", "All Natural"],
            deliveryPromise: "Delivered in 3-5 Business Days",
            returnPolicy: "Easy Returns if melted or damaged",
        },
    },
    {
        id: "chandan-mukhavas",
        name: "Chandan Mukhavas",
        subName: "Royal Reflection",
        category: "mouth-freshener",
        price: "₹249",
        description: "A royal blend of refreshing ingredients with the soothing aroma of sandalwood.",
        folderPath: "/images/chandanmukhavas",
        frameCount: 240,
        startFrame: 0,
        themeColor: "#b45309", // Amber-700
        gradient: "from-amber-500 to-yellow-700",
        heroHeadline: "ROYAL FRESHNESS",
        features: ["Premium Ingredients", "Cooling Effect", "Digestive Aid", "Zero Tobacco"],
        stats: [
            { label: "Freshness", val: "10/10" },
            { label: "Aroma", val: "10/10" },
            { label: "Cooling", val: "8/10" },
        ],
        section1: { title: "Royal Legacy", subtitle: "Inspired by ancient royal recipes for breath purification." },
        section2: { title: "Cooling Wave", subtitle: "A gentle cooling sensation that refreshes your palate." },
        section3: { title: "Pure Aroma", subtitle: "Infused with the essence of pure sandalwood." },
        section4: { title: "Perfect Finish", subtitle: "The ideal way to end every meal." },
        exportAppeal: {
            title: "The Royal Post-Meal Tradition",
            description: "Introduce your customers to the ancient Indian tradition of Mukhwas. Infused with Sandalwood and premium spices, this is a luxurious digestive aid that stands out in the wellness and gourmet food market.",
            healthBenefits: ["Natural Digestive Aid", "Bad Breath Neutralizer", "Cooling Sandalwood", "Zero Nicotine/Tobacco"]
        },
        detailsSection: {
            title: "Why Chandan?",
            description: "Chandan Mukhavas is not just a mouth freshener; it's a tradition. Crafted with care to provide a lingering freshness and digestive comfort.",
            imageAlt: "Chandan Mukhavas premium pack",
        },
        freshnessSection: {
            title: "Sealed Freshness",
            description: "Premium packaging ensures the aroma stays intact for months.",
        },
        buyNowSection: {
            price: "₹249",
            unit: "Pack of 10",
            processingParams: ["Hand Blended", "Aroma Sealed", "Premium Quality"],
            deliveryPromise: "Delivered in 3-5 Business Days",
            returnPolicy: "No Returns on Food Items",
        },
    },
];
