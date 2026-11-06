export interface EyewearFrame {
  id: string;
  name: string;
  brand: 'Intense Focus' | 'Scott' | 'Ray-Ban' | 'Sandpiper' | 'Vogue';
  category: 'sunglasses' | 'prescription' | 'clip-on';
  shape: string;
  material: string;
  colorName: string;
  isBestseller?: boolean;
  lensSize: number;
  bridgeSize: number;
  templeSize: number;
  features: string[];
  storePrice: number;
  originalPrice: number;
  saveAmount: number;
  image: string;
  accentColor: string;
  frameType: 'cat-eye' | 'hexagonal' | 'navigator' | 'clip-on' | 'square' | 'aviator';
}

export interface DiagnosticService {
  id: string;
  name: string;
  equipment: string;
  description: string;
  checklist: string[];
  duration: string;
  fee: string;
  iconType: 'refraction' | 'screen' | 'progressive' | 'contact';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  purchased: string;
  verified: boolean;
}

export interface StoreGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: 'storefront' | 'optometry' | 'showroom' | 'delivery';
  image: string;
  aspectClass?: string;
  focusPosition?: string;
}

export const STORE_INFO = {
  name: 'Narayan Optical',
  fullName: 'Narayan Optical & Optometry Clinic',
  tagline: 'Optometry Clinic & Eyewear Stores',
  phone: '+91 7037005522',
  phoneRaw: '7037005522',
  whatsappUrl: 'https://wa.me/917037005522',
  address: '401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra',
  addressShort: '401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra',
  landmark: 'Directly on Jivan Jyoti Hospital Road, Sector 3, Avas Vikas Colony',
  timings: '10:00 AM – 8:45 PM (Monday – Sunday, All 7 Days)',
  timingNote: 'Open 10:00 AM to 8:45 PM · Walk-Ins Welcome',
  googleRating: 4.9,
  reviewsCount: '380+',
  totalPatients: '10,000+',
  mapUrl: 'https://maps.google.com/?q=Narayan+Optical+Jivan+Jyoti+Hospital+Road+Avas+Vikas+Colony+Agra'
};

export const FRAMES: EyewearFrame[] = [
  {
    id: 'intense-focus-cat-eye',
    name: 'Intense Focus Noir Glamour Cat-Eye',
    brand: 'Intense Focus',
    category: 'sunglasses',
    shape: 'Cat-Eye',
    material: 'Italian Acetate',
    colorName: 'Gloss Black with Gold Inlay',
    isBestseller: true,
    lensSize: 54,
    bridgeSize: 17,
    templeSize: 145,
    features: ['UV400 Gradient Lenses', 'Gold Rim Temple Inlay'],
    storePrice: 2490,
    originalPrice: 3800,
    saveAmount: 1310,
    image: '/assets/aistudio/Screenshot_20261102_172024_6ce32334_6ce32334.jpg',
    accentColor: '#1e293b',
    frameType: 'cat-eye'
  },
  {
    id: 'scott-luxe-geometric',
    name: 'Scott Luxe Geometric Hexagonal',
    brand: 'Scott',
    category: 'prescription',
    shape: 'Geometric',
    material: 'Lightweight Titanium',
    colorName: 'Rose Gold & Amethyst Purple Accent',
    isBestseller: true,
    lensSize: 52,
    bridgeSize: 18,
    templeSize: 140,
    features: ['Ultra-Lightweight 14g', 'Silicone Anti-Slip Nose Pads'],
    storePrice: 1999,
    originalPrice: 2999,
    saveAmount: 1000,
    image: '/assets/aistudio/scott_geometric_glasses_1793620958016_b635ff73.jpg',
    accentColor: '#9333ea',
    frameType: 'hexagonal'
  },
  {
    id: 'intense-focus-amber-navigator',
    name: 'Intense Focus Crystal Amber Navigator',
    brand: 'Intense Focus',
    category: 'sunglasses',
    shape: 'Navigator',
    material: 'Italian Acetate',
    colorName: 'Crystal Clear with Amber Brown Lenses',
    isBestseller: true,
    lensSize: 56,
    bridgeSize: 16,
    templeSize: 145,
    features: ['High-Clarity Polarized', 'Scratch Resistant Coat'],
    storePrice: 2299,
    originalPrice: 3499,
    saveAmount: 1200,
    image: '/assets/aistudio/intense_amber_sunglasses_1793620972813_3a02b1f0.jpg',
    accentColor: '#d97706',
    frameType: 'navigator'
  },
  {
    id: 'scott-2in1-magnetic-clip-on',
    name: '2-in-1 Magnetic Polarized Clip-On System',
    brand: 'Scott',
    category: 'clip-on',
    shape: 'Rectangle',
    material: 'TR90 Ultra-Flex',
    colorName: 'Matte Onyx Black',
    isBestseller: true,
    lensSize: 55,
    bridgeSize: 17,
    templeSize: 142,
    features: ['Instant Magnetic Snap-On', 'Polarized Glare-Blocker Clip'],
    storePrice: 1850,
    originalPrice: 2750,
    saveAmount: 900,
    image: '/assets/aistudio/magnetic_clipon_glasses_1793620974182_4f5a613b.jpg',
    accentColor: '#0f172a',
    frameType: 'clip-on'
  },
  {
    id: 'scott-heritage-square',
    name: 'Scott Heritage Square Acetate',
    brand: 'Scott',
    category: 'prescription',
    shape: 'Square',
    material: 'Italian Acetate',
    colorName: 'Deep Forest Green Olive',
    isBestseller: true,
    lensSize: 53,
    bridgeSize: 19,
    templeSize: 145,
    features: ['Riveted 5-Barrel Hinges', 'Rich Hand-Polished Finish'],
    storePrice: 1699,
    originalPrice: 2499,
    saveAmount: 800,
    image: '/assets/aistudio/scott_green_acetate_1793620971013_24c189bb.jpg',
    accentColor: '#15803d',
    frameType: 'square'
  }
];

export interface ContactLensBrand {
  id: string;
  name: string;
  company: string;
  tagline: string;
  badge: string;
  logo: string;
  description: string;
  offerings: string[];
}

export const CONTACT_LENS_BRANDS: ContactLensBrand[] = [
  {
    id: 'bausch-lomb',
    name: 'Bausch & Lomb',
    company: 'Bausch + Lomb Inc.',
    tagline: 'See better. Live better.',
    badge: 'Global Pioneer in Vision Care',
    logo: '/assets/aistudio/Screenshot_20261103_171125_3917bfbc_3917bfbc.jpg',
    description: 'Ultra-breathable moisture seal lenses, PureVision2 HD optics, SofLens daily disposables, and Biotrue multi-purpose sterile lens solutions.',
    offerings: ['SofLens 59 Daily & Monthly', 'PureVision 2 HD for Astigmatism', 'Biotrue MoistureSeal Silicone Hydrogel', 'Bausch + Lomb Renu Fresh Solution']
  },
  {
    id: 'acuvue-oasys',
    name: 'ACUVUE OASYS',
    company: 'Johnson & Johnson Vision Care',
    tagline: 'With HYDRACLEAR Plus Technology',
    badge: 'Unbeatable Comfort for Digital Screen Users',
    logo: '/assets/aistudio/Screenshot_20261103_171208_fae22afe_fae22afe.jpg',
    description: 'Designed specifically for demanding environments and long screen sessions. Embedded with tear-like moisture molecules for all-day comfort and Class 1 UV blocking.',
    offerings: ['Acuvue Oasys with HydraLuxe Daily', 'Acuvue Oasys 2-Weekly with HydraClear Plus', 'Acuvue Oasys for Astigmatism (Blink Stabilized)', '1-Day Acuvue Moist for Sensitive Eyes']
  },
  {
    id: 'alcon',
    name: 'Alcon',
    company: 'Alcon Vision LLC',
    tagline: 'Precision Optics & Water Gradient Comfort',
    badge: 'Water Gradient Technology',
    logo: '/assets/aistudio/Screenshot_20261103_171249_359600ee_359600ee.jpg',
    description: 'Revolutionary water gradient contact lenses featuring nearly 100% water at the outermost surface. Total comfort from morning to late night without dry eye fatigue.',
    offerings: ['Dailies Total 1 Water Gradient', 'Air Optix Plus HydraGlyde Monthly', 'Air Optix Colors (Subtle & Vibrant Blends)', 'Opti-Free PureMoist Disinfecting Solution']
  },
  {
    id: 'coopervision',
    name: 'CooperVision',
    company: 'CooperVision Inc.',
    tagline: 'Brighter, clearer possibilities every day.',
    badge: 'Natural Wettability & Advanced Toric',
    logo: '/assets/aistudio/Screenshot_20261103_171326_7fd2de5f_7fd2de5f.jpg',
    description: 'Third-generation silicone hydrogel with Aquaform Technology that locks in water naturally, offering high oxygen transmission for white, healthy eyes.',
    offerings: ['Biofinity Naturally Wettable Monthly', 'Clariti 1 Day Breathable Silicone Hydrogel', 'Biofinity Toric for High Cylindrical Powers', 'MyDay Daily Disposable Smart Silicone']
  }
];

export const OPTOMETRIST_PROFILE = {
  name: 'Mr. Dilip Narayan',
  qualifications: 'D.R.Opt., B.Optom (Chennai), C.C.L.P.',
  designation: 'Senior Optometrist & Clinic Director',
  experience: 'Over 26 Years of Professional Clinical Experience',
  photo: '/assets/aistudio/IMG-20261104-WA0001_ec86dcd3.jpg',
  hospitals: ['Prasad Eye Hospital', 'Gandhi Eye Hospital', '10 Years at Himalaya'],
  specialties: [
    'Expert Contact Lens Fitting (Rigid, Soft & Toric)',
    'Progressive Lens Digital Dispensing',
    'Computerized Auto-Refraction & Keratometry',
    'Pediatric & Geriatric Visual Care',
    'Complex Cylinder & High Power Optimization'
  ],
  bioParagraphs: [
    'Mr. Dilip Narayan is a highly experienced and accomplished Senior Optometrist with over 26 years of professional experience in the field of optometry and vision care. He holds qualifications in D.R.Opt., B.Optom (Chennai), and C.C.L.P.',
    'Throughout his distinguished career, he has been associated with reputed healthcare institutions, including Prasad Eye Hospital and Gandhi Eye Hospital, where he gained valuable clinical experience. He has also dedicated 10 years of his professional journey to Himalaya, further strengthening his knowledge and expertise.',
    'Renowned for his expertise in contact lens fitting and progressive lens dispensing, Mr. Narayan combines advanced clinical skills, extensive practical experience, and a patient-centred approach to deliver precise and personalized vision-care solutions. His understanding of complex visual requirements enables him to recommend suitable solutions that enhance visual comfort and quality of life.',
    'With a strong commitment to clinical excellence and ethical eye care, he believes that optometry goes beyond simply prescribing spectacles. It is about understanding individual visual needs, providing the right solutions, and building lasting relationships through trust and quality care.',
    'His dedication to optical health, accurate vision assessment, and patient satisfaction has made him a trusted professional in the field of optometry.'
  ],
  philosophy: 'Expert Care. Precision in Vision. A Commitment to Every Patient.'
};

export const VISION_CORRECTIONS = [
  {
    id: 'zero-power',
    name: 'Zero Power / Fashion & Screen',
    price: 499,
    description: 'Crisp optical clarity for non-prescription wear and digital screens'
  },
  {
    id: 'single-vision',
    name: 'Single Vision (Distance or Reading)',
    price: 799,
    description: 'Custom optical correction for myopia, hyperopia, or presbyopia'
  },
  {
    id: 'bifocal',
    name: 'Bifocal (D-Segment / Kryptok)',
    price: 1299,
    description: 'Dual focal zones for clear distance and reading vision'
  },
  {
    id: 'progressive',
    name: 'Digital Free-Form Progressive',
    price: 2499,
    description: 'Seamless multi-focal transition with zero visible dividing line'
  }
];

export const OPTICAL_COATINGS = [
  {
    id: 'anti-glare',
    name: 'Anti-Glare Clear Coating',
    price: 399,
    description: 'Reduces night reflections and headlight glare'
  },
  {
    id: 'blue-cut',
    name: 'Blue Cut + UV400 Protection',
    price: 699,
    description: 'Blocks 98% harmful HEV blue light from monitors & smartphones'
  },
  {
    id: 'photochromic',
    name: 'Photochromic Day & Night (Transitions)',
    price: 1399,
    description: 'Automatically turns into dark sunglasses under outdoor sunlight'
  },
  {
    id: 'high-index',
    name: '1.67 High Index Ultra-Thin Aspheric',
    price: 1899,
    description: 'Up to 45% thinner and lighter for high power prescriptions'
  }
];

export const DIAGNOSTIC_SERVICES: DiagnosticService[] = [
  {
    id: 'service-auto-refraction',
    name: 'Computerized Auto-Refraction & Vision Exam',
    equipment: 'Digital Auto-Refractometer & Keratometer (Topcon/Nidek Grade)',
    description: 'Accurate spherical, cylindrical, and precise axis angle determination for crystal clear distance and near focal sharpness.',
    checklist: [
      'Digital Keratometry for corneal curvature',
      'Dual pupil distance (PD) digital calibration',
      'Instant digital prescription printout',
      'Immediate trial frame comfort verification'
    ],
    duration: '15–20 mins',
    fee: 'Free with purchase / Nominal ₹100',
    iconType: 'refraction'
  },
  {
    id: 'service-blue-light',
    name: 'Digital Eye Strain & Blue-Light Consultation',
    equipment: 'Blue Spectrometer & Contrast Sensitivity Grid',
    description: 'Assessment of computer vision syndrome (CVS), dry eye tendencies, and customized recommendation of blue-block coating filters.',
    checklist: [
      'Screen distance working posture guidance',
      'HEV 420nm blue-ray blocking live filter test',
      'Anti-reflective glare suppression check',
      'Lubricating tear-film advice'
    ],
    duration: '15 mins',
    fee: 'Complimentary',
    iconType: 'screen'
  },
  {
    id: 'service-progressive',
    name: 'Progressive & Multi-Focal Digital Fitting',
    equipment: 'Digital Ocular Video Centration & Segment Gauge',
    description: 'Customized fitting of progressive lenses eliminates swim effect and distorted peripheral zones for comfortable everyday reading & driving.',
    checklist: [
      'Free-form digital surface progressive design',
      'Personalized corridor length selection',
      'Custom fitting height & pantoscopic tilt calibration',
      '100% Adaptation guarantee or free exchange'
    ],
    duration: '25 mins',
    fee: 'Complimentary with Lens Order',
    iconType: 'progressive'
  },
  {
    id: 'service-contact-lens',
    name: 'Contact Lens Fitting & Hygiene Clinic',
    equipment: 'Slit Lamp Biomicroscope & Corneal Topography',
    description: 'Safe, hygienic trial of leading contact lens brands (Bausch + Lomb, Acuvue, Alcon) with hands-on insertion and removal training.',
    checklist: [
      'Astigmatism (Toric) specialized fitting',
      'Moisture-rich silicone hydrogel choices',
      'Color cosmetic lenses selection',
      'Sterile disinfectant starter kit provided'
    ],
    duration: '20 mins',
    fee: 'Free Trial Session',
    iconType: 'contact'
  }
];

export const GALLERY_ITEMS: StoreGalleryItem[] = [
  {
    id: 'gal-storefront',
    title: 'Modern Exterior & Signage',
    subtitle: 'Storefront at 401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra with clear signage and wide glass display.',
    badge: 'Avas Vikas Colony, Agra',
    category: 'storefront',
    image: '/assets/store/store_exterior.jpg'
  },
  {
    id: 'gal-optometry',
    title: 'Clinical Optometry Suite',
    subtitle: 'State-of-the-art motorized exam chair, digital autorefractor, slit lamp, and automated lensometer.',
    badge: '100% Computerized Testing',
    category: 'optometry',
    image: '/assets/store/optometry_chair_full.jpg'
  },
  {
    id: 'gal-showroom',
    title: 'Designer Eyewear Showroom',
    subtitle: 'Spacious boutique showroom showcasing Ray-Ban, Vogue, Scott, Intense Focus, and Sandpiper collections.',
    badge: '1,200+ Frames Displayed',
    category: 'showroom',
    image: '/assets/store/eyewear_showroom.jpg'
  },
  {
    id: 'gal-reception',
    title: 'Consultation & Delivery Desk',
    subtitle: 'Welcoming reception desk with Narayan Optical signature branding, Paytm QR scanner, and prompt fitting desk.',
    badge: 'Warm Patient Care',
    category: 'delivery',
    image: '/assets/store/reception_desk.jpg'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-2',
    author: 'Pooja Agarwal',
    location: 'Sector 3, Avas Vikas Colony, Agra',
    date: 'February 2026',
    rating: 5,
    text: '“The frame variety is outstanding. I bought the Intense Focus cat-eye sunglasses and also updated my progressive lenses. Staff is extremely polite, honest pricing, and the clinic room is clean and modern.”',
    purchased: 'Intense Focus Sunglasses & Progressive Lenses',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Vipin Kushwah',
    location: 'Shahganj, Agra',
    date: 'January 2026',
    rating: 5,
    text: '“I work 10 hours daily on laptop and had severe eye strain. Narayan Optical prescribed blue-cut anti-glare lenses that made an immediate difference. Their WhatsApp support and location on Hospital Road is so convenient.”',
    purchased: 'Digital Blue-Cut Computer Glasses',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Neha Verma',
    location: 'Sikandra, Agra',
    date: 'October 2025',
    rating: 5,
    text: '“Genuine branded frames with authentic warranty. Bought Ray-Ban and a lightweight titanium frame for my mother. Quick lens fitting within 1 hour as promised!”',
    purchased: 'Ray-Ban Frames & Titanium Reading Glasses',
    verified: true
  }
];

export const FAQS = [
  {
    question: 'How long does a computerized eye test take, and do I need an appointment?',
    answer: 'A computerized eye exam takes about 15–20 minutes using our digital auto-refractometer and keratometer. While walk-ins are always welcomed at our clinic on Jivan Jyoti Hospital Road, Avas Vikas Colony, booking an appointment online guarantees zero waiting time.'
  },
  {
    question: 'How quickly can I get my new spectacles or sunglasses made?',
    answer: 'Single vision lenses (anti-glare, blue cut, zero-power) are edged in our in-house lab and ready within 1 to 2 hours or same day! Complex bifocals or custom digital progressives are crafted within 24 to 48 hours.'
  },
  {
    question: 'Where exactly is the shop located in Agra?',
    answer: 'We are located at 401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra. It is directly opposite Jivan Jyoti Hospital, Sector 3.'
  },
  {
    question: 'Do you offer Blue-Light protection for computer and mobile screen users?',
    answer: 'Yes, we provide certified Blue-Cut & UV400 lenses that block 98% of harmful high-energy visible (HEV) blue light, reducing digital eye strain, headache, and eye fatigue during laptop and phone usage.'
  },
  {
    question: 'Can I test my vision or try frames before buying?',
    answer: 'Absolutely! We offer free computerized eye power checkups with frame orders, trial frames to check focal comfort, and complimentary virtual try-on and vision screening tools directly on our website.'
  },
  {
    question: 'What is the owner contact number for direct queries?',
    answer: 'You can reach our owner directly at +91 7037005522 via phone call or WhatsApp anytime between 10:00 AM and 9:30 PM (all 7 days).'
  }
];
