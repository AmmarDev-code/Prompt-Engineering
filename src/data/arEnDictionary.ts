export interface TermMapping {
  ar: string;
  en: string;
  category: 'hair' | 'clothing' | 'lighting' | 'camera' | 'style' | 'tech' | 'business' | 'emotion' | 'color' | 'general';
}

export const AR_EN_DICTIONARY: Record<string, string> = {
  // ==========================================
  // 1. تسريحات وقصات الشعر (HAIR & GROOMING)
  // ==========================================
  "شعر": "hair",
  "شعري": "my hair",
  "قص": "cut",
  "قصة": "haircut",
  "حلاقة": "haircut",
  "تسريحة": "hairstyle",
  "تدريج": "taper fade",
  "تدريج جانبي": "low taper fade",
  "تدريج عالي": "high fade",
  "تدريج منخفض": "low fade",
  "تدريج وسط": "mid fade",
  "بارز": "prominent textured",
  "عصري": "modern contemporary",
  "كلاسيكي": "classic timeless",
  "كيرلي": "textured curls",
  "مجعد": "curly waves",
  "ناعم": "smooth straight",
  "حريري": "silky smooth",
  "أملس": "sleek straight",
  "سبايكي": "textured spiky",
  "بزكت": "buzz cut",
  "صلعة": "clean shaven bald head",
  "أندركت": "undercut",
  "بومبادور": "pompadour",
  "ويفي": "wavy textured",
  "تموجات": "natural waves",
  "بوب": "bob cut",
  "قصير": "short",
  "طويل": "long",
  "متوسط": "medium length",
  "مدرج": "layered",
  "غرة": "fringe bangs",
  "فرق جانبي": "side part",
  "ذيل حصان": "ponytail",
  "كعكة": "high bun",
  "جدائل": "braids",
  "ضفائر": "cornrow braids",
  "لحية": "beard",
  "دقن": "beard",
  "لحيتي": "my beard",
  "شارب": "mustache",
  "شنب": "mustache",
  "عوارض": "short boxed beard",
  "ديرتي": "goatee",
  "لحية خفيفة": "designer stubble",
  "لحية كثيفة": "dense full beard",
  "تحديد اللحية": "sharp razor-defined beard edges",
  "تعبئة الفراغات": "even follicular density fill",
  "حواجب": "eyebrows",
  "حواجب مرتبة": "groomed natural eyebrows",

  // ==========================================
  // 2. ألوان الشعر والعيون والبشرة (COLORS & TONES)
  // ==========================================
  "أسود": "deep black",
  "أسود فاحم": "jet black",
  "بني": "brown",
  "بني فاتح": "light brown",
  "بني داكن": "dark espresso brown",
  "كستنائي": "warm chestnut brown",
  "أشقر": "golden blonde",
  "أشقر بلاتيني": "platinum blonde",
  "أشقر رمادي": "ash blonde",
  "فضي": "metallic silver",
  "رمادي": "salt and pepper grey",
  "أبيض": "pristine white",
  "أحمر": "vibrant auburn red",
  "نحاسي": "copper ginger",
  "عسلي": "warm amber honey",
  "زيتي": "olive green",
  "أزرق": "sapphire blue",
  "كحلي": "deep midnight navy blue",
  "وردي": "soft pastel rose",
  "بنفسجي": "royal purple",
  "ذهبي": "luxurious metallic gold",
  "خصلات": "dimensional balayage highlights",
  "خصلات عسلية": "caramel highlights",
  "صبغة": "rich hair color",
  "عيون خضراء": "emerald green eyes",
  "عيون زرقاء": "deep ocean blue eyes",
  "عيون عسلية": "warm hazel eyes",
  "عيون بنية": "deep dark brown eyes",
  "بشرة حنطية": "warm olive sun-kissed skin tone",
  "بشرة سمراء": "rich deep melanin skin tone",
  "بشرة بيضاء": "fair luminous skin tone",
  "مسام": "organic micro skin pores",
  "نقاء": "crystal clear clarity",

  // ==========================================
  // 3. الملابس والأزياء الرسمية (CLOTHING & ATTIRE)
  // ==========================================
  "بدلة": "bespoke tailored suit",
  "بدلة رسمية": "luxury corporate Italian business suit",
  "توكسيدو": "formal black-tie tuxedo",
  "قميص": "dress shirt",
  "قميص أبيض": "crisp pristine white cotton dress shirt",
  "كرافتة": "silk necktie",
  "ربطة عنق": "elegant silk tie",
  "بابيون": "black silk bow tie",
  "بليزر": "tailored slim-fit blazer",
  "جاكيت": "jacket",
  "جاكيت جلد": "vintage distressed leather jacket",
  "معطف": "classic wool trench coat",
  "ثوب": "traditional Saudi white thobe",
  "دشداشة": "crisp Arabian thobe",
  "شماغ": "royal red and white patterned shemagh",
  "غترة": "pure white ghutra",
  "عقال": "traditional black agal",
  "بشت": "ceremonial gold-trimmed black bisht",
  "عباية": "modern modest luxury black abaya",
  "فستان": "elegant haute couture gown",
  "فستان سهرة": "luxurious evening dress",
  "كاجوال": "smart casual chic",
  "جينز": "premium dark denim jeans",
  "تيشيرت": "minimalist crewneck t-shirt",
  "هودي": "heavyweight cotton streetwear hoodie",
  "حذاء": "handcrafted leather shoes",
  "ساعة": "luxury Swiss mechanical chronograph watch",
  "نظارة": "designer eyewear frames",
  "نظارة شمسية": "matte black polarized sunglasses",
  "نظارة طبية": "minimalist titanium optical glasses",

  // ==========================================
  // 4. التصوير والإضاءة والكاميرات (LIGHTING & PHOTOGRAPHY)
  // ==========================================
  "إضاءة": "lighting",
  "إضاءة استوديو": "high-end commercial studio lighting",
  "إضاءة سينمائية": "cinematic dramatic lighting",
  "سوفت بوكس": "softbox diffused lighting",
  "ريم لايت": "dramatic contour rim light",
  "إضاءة حافة": "sharp edge rim lighting",
  "غروب": "golden hour warm sunlight",
  "شروق": "soft sunrise pastel dawn light",
  "نيون": "cyberpunk neon glow",
  "إضاءة جانبية": "dramatic chiaroscuro side lighting",
  "ضوء طبيعي": "organic window natural daylight",
  "ضوء شمس": "bright direct sunlight with crisp shadows",
  "ظلال": "soft feathered natural shadows",
  "عكس الضوء": "specular reflections",
  "ضباب": "volumetric atmospheric fog and haze",
  "دخان": "subtle cinematic smoke wisps",
  "بوكيه": "creamy bokeh background blur",
  "عمق الميدان": "shallow depth of field f/1.4",
  "زاوية واسعة": "ultra-wide angle 24mm perspective",
  "بورتريه": "classic 85mm portrait focal length",
  "ماكرو": "extreme macro close-up details",
  "عين الطائر": "aerial bird's-eye view",
  "من زاوية منخفضة": "low-angle heroic composition",
  "من زاوية عالية": "high-angle dynamic perspective",
  "دقة عالية": "8k ultra-high resolution RAW",
  "فوتوريالستيك": "photorealistic hyper-detailed masterwork",
  "واقعي": "realistic true-to-life",
  "سينمائي": "cinematic anamorphic lens look",

  // ==========================================
  // 5. الأماكن والخلفيات (ENVIRONMENTS & PLACES)
  // ==========================================
  "خلفية": "background",
  "مكتب": "luxury executive corner office",
  "ناطحة سحاب": "high-rise skyscraper with panoramic windows",
  "برج": "modern architectural tower",
  "مدينة": "modern metropolitan city skyline",
  "طبيعة": "serene pristine landscape",
  "غابة": "misty dense pine forest",
  "بحر": "crystal turquoise ocean shore",
  "شاطئ": "golden sand beach at golden hour",
  "صحراء": "sculpted golden sand dunes under starry sky",
  "واحة": "lush tranquil desert oasis",
  "استوديو": "neutral minimalist studio gradient backdrop",
  "رخام": "polished Carrara marble surface",
  "مقهى": "warm Scandinavian minimalist coffee shop",
  "منزل": "architectural luxury modern living room",
  "شارع": "clean European cobblestone street",
  "فضاء": "deep cosmic nebula space expanse",

  // ==========================================
  // 6. المشاعر والتعابير والانطباعات (EMOTIONS & EXPRESSIONS)
  // ==========================================
  "ابتسامة": "warm charismatic confident smile",
  "ابتسامة عريضة": "radiant broad authentic smile",
  "واثق": "confident assertive poised stance",
  "جاد": "serious resolute focused demeanor",
  "هادئ": "serene calm relaxed expression",
  "فخم": "luxurious opulent prestigious",
  "أنيق": "sophisticated dapper elegant",
  "مبهج": "cheerful radiant lively",
  "غامض": "mysterious enigmatic moody aura",
  "حماسي": "energetic vibrant enthusiastic",
  "طبيعي": "effortless organic authentic",
  "احترافي": "executive professional polished",
  "شبابي": "youthful vibrant fresh",
  "وقور": "distinguished dignified mature",

  // ==========================================
  // 7. التقنية والبرمجة والأمن (TECH & CODING)
  // ==========================================
  "كود": "source code",
  "برمجة": "software engineering",
  "بايثون": "Python 3.12+",
  "جافاسكريبت": "modern JavaScript ES6+",
  "تايب سكريبت": "TypeScript strict type-safe",
  "رياكت": "React 19 functional components",
  "نيكست": "Next.js 15 App Router",
  "قاعدة بيانات": "database schema and storage engine",
  "جدول": "structured database table",
  "استعلام": "optimized query",
  "سيكول": "PostgreSQL relational SQL",
  "ثغرة": "vulnerability exploit vector",
  "أمن": "cybersecurity defense hardening",
  "تشفير": "AES-256 cryptographic encryption",
  "جدار حماية": "firewall network ACL rules",
  "شبكة": "enterprise IP network topology",
  "سيرفر": "production Linux server host",
  "إي بي آي": "RESTful API / GraphQL endpoints",
  "أتمتة": "automated CI/CD pipeline automation",
  "دوكر": "Docker containerization deployment",
  "سحابي": "scalable AWS cloud infrastructure",
  "خوارزمية": "high-efficiency algorithmic logic",
  "واجهة": "clean UI component view",
  "مصفوفة": "typed data array matrix",
  "دالة": "pure modular function",
  "خطأ": "runtime exception stack trace bug",
  "إصلاح": "verified bug fix and patch",
  "أداء": "low-latency high-throughput performance",
  "تسريع": "algorithmic optimization and caching",

  // ==========================================
  // 8. الأعمال والمحتوى والتسويق (BUSINESS & CONTENT)
  // ==========================================
  "سيرة ذاتية": "executive professional CV / resume",
  "وظيفة": "career opportunity position",
  "إيميل": "corporate executive email memo",
  "تقرير": "comprehensive analytical report",
  "تسويق": "high-ROI digital marketing campaign",
  "مبيعات": "sales conversion funnel",
  "إعلان": "persuasive direct-response advertisement",
  "عميل": "high-value enterprise client",
  "مشروع": "strategic enterprise project initiative",
  "خطة": "milestone execution roadmap",
  "فكرة": "novel disruptive strategic concept",
  "مقال": "authoritative thought-leadership article",
  "ملخص": "executive TL;DR summary brief",
  "عقد": "legally binding protective contract agreement",
  "شروط": "terms of service conditions",
  "اتفاقية": "master service agreement NDA",
  "مقارنة": "in-depth comparative evaluation matrix",
  "تحليل": "deep quantitative SWOT and risk analysis",
  "استراتيجية": "long-term competitive moat strategy",
  "ميزانية": "financial budget and resource allocation",
  "أرباح": "net profit margins and revenue growth"
};

/**
 * دالة مساعدة لاستخراج الكلمات المفتاحية وترجمتها تلقائياً
 */
export function translateArabicTerms(arabicText: string): { translatedWords: string[]; enrichedEnglishString: string } {
  if (!arabicText) return { translatedWords: [], enrichedEnglishString: '' };

  const normalized = arabicText
    .replace(/[،,.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const words = normalized.split(' ');
  const detectedTranslations: string[] = [];
  const matchedArabicTerms: string[] = [];

  // 1. فحص العبارات المركبة أولاً (ثنائية الكلمات)
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (AR_EN_DICTIONARY[bigram]) {
      detectedTranslations.push(AR_EN_DICTIONARY[bigram]);
      matchedArabicTerms.push(bigram);
      i++; // تخطي الكلمة التالية لأنها جزء من التعبير المركب
    }
  }

  // 2. فحص الكلمات المفردة
  for (const word of words) {
    // إزالة أل التعريف إذا لم توجد مطابقة مباشرة
    const directMatch = AR_EN_DICTIONARY[word];
    if (directMatch) {
      if (!detectedTranslations.includes(directMatch)) {
        detectedTranslations.push(directMatch);
      }
      continue;
    }

    if (word.startsWith('ال') && word.length > 3) {
      const withoutAl = word.substring(2);
      if (AR_EN_DICTIONARY[withoutAl]) {
        const trans = AR_EN_DICTIONARY[withoutAl];
        if (!detectedTranslations.includes(trans)) {
          detectedTranslations.push(trans);
        }
      }
    }
  }

  return {
    translatedWords: detectedTranslations,
    enrichedEnglishString: detectedTranslations.join(', ')
  };
}
