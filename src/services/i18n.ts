export interface Translations {
  appName: string;
  appSubtitle: string;
  badgeActiveCommands: string;
  toggleThemeDark: string;
  toggleThemeLight: string;
  languageSwitch: string;
  favorites: string;
  history: string;
  clearHistory: string;
  noHistory: string;
  noFavorites: string;
  
  // Hero Generator
  heroTitle: string;
  heroSubtitle: string;
  inputPlaceholder: string;
  tryExamplesLabel: string;
  generateBtn: string;
  generatingBtn: string;
  clearInput: string;
  shortcutHint: string;
  
  // Enhancers
  enhancersTitle: string;
  enhancerIdentity: string;
  enhancerPhoto8k: string;
  enhancerLighting: string;
  enhancerArabic: string;
  enhancerCoT: string;
  enhancerTable: string;
  enhancerCodeOnly: string;
  
  // Results
  resultBoxCommandTitle: string;
  resultBoxPromptTitle: string;
  copyCommand: string;
  copyPrompt: string;
  copiedToast: string;
  accuracyScore: string;
  fallbackActiveBadge: string;
  matchedBadge: string;
  openInChatGPT: string;
  openInClaude: string;
  openInMidjourney: string;
  wordsCount: string;
  charactersCount: string;
  extractedTermsLabel: string;

  // Encyclopedia
  encyclopediaTitle: string;
  encyclopediaSubtitle: string;
  searchPlaceholder: string;
  filterAll: string;
  useCommandBtn: string;
  detailsBtn: string;
  noCommandsFound: string;
  commandsCount: string;

  // Modal
  modalClose: string;
  modalKeywords: string;
  modalTemplate: string;
  modalSampleAr: string;
  modalSampleEn: string;
  modalRecommendedModels: string;
  modalTryCommand: string;

  // Footer
  footerRights: string;
  footerDesc: string;
}

export const TRANSLATIONS: Record<'ar' | 'en', Translations> = {
  ar: {
    appName: 'SlashMaster AI',
    appSubtitle: 'موسوعة ومُولّد أوامر الذكاء الاصطناعي الشامل',
    badgeActiveCommands: '65+ أمر سلاش نشط',
    toggleThemeDark: 'الوضع الليلي',
    toggleThemeLight: 'الوضع النهاري',
    languageSwitch: 'English',
    favorites: 'المفضلة',
    history: 'سجل التوليد',
    clearHistory: 'مسح السجل',
    noHistory: 'لا يوجد أي عمليات توليد سابقة حتى الآن.',
    noFavorites: 'لم تقم بإضافة أي أوامر للمفضلة بعد.',

    // Hero Generator
    heroTitle: 'حوّل فكرتك العربية إلى أمر سلاش وبرومبت خارق',
    heroSubtitle: 'اكتب ما تريده بأي لغة أو عامية (تعديل شعر، بدلة رسمية، برمجة، سيو، بحث) وسيتولى المحرك الذكي مطابقة الأمر وتوليد البرومبت الإنجليزي فائق الدقة.',
    inputPlaceholder: 'مثال: عندي صورة وأريد تغيير قصة الشعر إلى تدريج جانبي بارز وعصري مع حفظ ملامح وجهي...',
    tryExamplesLabel: 'جرّب أمثلة سريعة:',
    generateBtn: 'توليد السلاش والبرومبت الذكي',
    generatingBtn: 'جاري التحليل والمطابقة...',
    clearInput: 'مسح النص',
    shortcutHint: 'اضغط Ctrl + Enter للتوليد السريع',

    // Enhancers
    enhancersTitle: 'مُحسنات الدقة الفورية (Click to Activate):',
    enhancerIdentity: '🔒 حفظ الملامح 100%',
    enhancerPhoto8k: '📸 جودة 8K واقعية',
    enhancerLighting: '💡 إضاءة سينمائية',
    enhancerArabic: '🇸🇦 إجابة بالعربية الفصحى',
    enhancerCoT: '🧠 تفكير خطوة بخطوة',
    enhancerTable: '📊 إخراج في جدول',
    enhancerCodeOnly: '⚡ كود نقي فقط',

    // Results
    resultBoxCommandTitle: 'أمر السلاش المعتمد (Slash Command)',
    resultBoxPromptTitle: 'البرومبت الإنجليزي الخارق (Master Mega-Prompt)',
    copyCommand: 'نسخ السلاش',
    copyPrompt: 'نسخ البرومبت الكامل',
    copiedToast: 'تم النسخ للحافظة بنجاح! ✨',
    accuracyScore: 'دقة المطابقة والبرومبت',
    fallbackActiveBadge: 'محرك CO-STAR العالمي (توليد مخصص)',
    matchedBadge: 'تطابق معتمد من الموسوعة',
    openInChatGPT: 'فتح في ChatGPT',
    openInClaude: 'فتح في Claude',
    openInMidjourney: 'فتح في Midjourney',
    wordsCount: 'كلمة',
    charactersCount: 'حرف',
    extractedTermsLabel: 'المحددات المستخرجة تلقائياً:',

    // Encyclopedia
    encyclopediaTitle: 'موسوعة أوامر الذكاء الاصطناعي الشاملة (65+ أمر)',
    encyclopediaSubtitle: 'تصفح واستكشف جميع أوامر الـ Slash الكلاسيكية والحديثة مع إمكانية البحث الفوري والتجربة بنقرة واحدة.',
    searchPlaceholder: 'ابحث في الأوامر بالعربية أو الإنجليزية (مثال: شعر، كود، خلفية، /blend)...',
    filterAll: 'الكل (65+)',
    useCommandBtn: 'استخدم هذا الأمر',
    detailsBtn: 'التفاصيل',
    noCommandsFound: 'لم يتم العثور على أي أمر يطابق بحثك.',
    commandsCount: 'أمر متوفر',

    // Modal
    modalClose: 'إغلاق',
    modalKeywords: 'الكلمات المفتاحية والزناد:',
    modalTemplate: 'قالب البرومبت الأساسي:',
    modalSampleAr: 'مثال واقعي بالعربية:',
    modalSampleEn: 'المثال بالإنجليزية:',
    modalRecommendedModels: 'النماذج الذكية الموصى بها:',
    modalTryCommand: 'تحميل الأمر في المولد الآن',

    // Footer
    footerRights: 'جميع الحقوق محفوظة © 2026 SlashMaster AI',
    footerDesc: 'المنصة العربية الأولى المتخصصة في هندسة الأوامر الذكية والـ Slash Commands.'
  },
  en: {
    appName: 'SlashMaster AI',
    appSubtitle: 'Universal AI Slash Commands & Mega-Prompt Engine',
    badgeActiveCommands: '65+ Active Commands',
    toggleThemeDark: 'Dark Mode',
    toggleThemeLight: 'Light Mode',
    languageSwitch: 'العربية',
    favorites: 'Favorites',
    history: 'History',
    clearHistory: 'Clear History',
    noHistory: 'No recent generation history yet.',
    noFavorites: 'No favorite commands saved yet.',

    // Hero Generator
    heroTitle: 'Turn Any Idea into Exact Slash Command & Mega-Prompt',
    heroSubtitle: 'Type in plain Arabic or English (haircut, executive suit, coding, SEO, academic study). The engine instantly maps the exact slash command and crafts a master prompt.',
    inputPlaceholder: 'e.g., I have a photo and want to change my haircut to a clean low taper fade while keeping my exact facial identity...',
    tryExamplesLabel: 'Quick sample prompts:',
    generateBtn: 'Generate Slash & Master Prompt',
    generatingBtn: 'Analyzing & Synthesizing...',
    clearInput: 'Clear Input',
    shortcutHint: 'Press Ctrl + Enter to quickly generate',

    // Enhancers
    enhancersTitle: 'Precision Enhancer Chips (Toggle):',
    enhancerIdentity: '🔒 Keep Identity 100%',
    enhancerPhoto8k: '📸 8K RAW Photorealistic',
    enhancerLighting: '💡 Cinematic Lighting',
    enhancerArabic: '🇸🇦 Respond in Fluent Arabic',
    enhancerCoT: '🧠 Chain-of-Thought',
    enhancerTable: '📊 Tabular Output',
    enhancerCodeOnly: '⚡ Pure Code Only',

    // Results
    resultBoxCommandTitle: 'Target Slash Command',
    resultBoxPromptTitle: 'Engineered English Mega-Prompt',
    copyCommand: 'Copy Slash',
    copyPrompt: 'Copy Master Prompt',
    copiedToast: 'Copied to clipboard successfully! ✨',
    accuracyScore: 'Precision & Match Score',
    fallbackActiveBadge: 'Universal CO-STAR Fallback (Custom Built)',
    matchedBadge: 'Verified Master Database Match',
    openInChatGPT: 'Open in ChatGPT',
    openInClaude: 'Open in Claude',
    openInMidjourney: 'Open in Midjourney',
    wordsCount: 'words',
    charactersCount: 'chars',
    extractedTermsLabel: 'Auto-extracted modifiers:',

    // Encyclopedia
    encyclopediaTitle: 'Master Slash Command Encyclopedia (65+ Commands)',
    encyclopediaSubtitle: 'Explore and search all classic & modern AI slash commands with instant preview and 1-click execution.',
    searchPlaceholder: 'Search commands in Arabic or English (e.g., haircut, code, background, /blend)...',
    filterAll: 'All (65+)',
    useCommandBtn: 'Use Command',
    detailsBtn: 'Details',
    noCommandsFound: 'No slash commands matched your query.',
    commandsCount: 'commands available',

    // Modal
    modalClose: 'Close',
    modalKeywords: 'Trigger Keywords:',
    modalTemplate: 'Master Prompt Template:',
    modalSampleAr: 'Arabic Realistic Sample:',
    modalSampleEn: 'English Equivalent Sample:',
    modalRecommendedModels: 'Recommended AI Engines:',
    modalTryCommand: 'Load into Generator Now',

    // Footer
    footerRights: 'All Rights Reserved © 2026 SlashMaster AI',
    footerDesc: 'The premier bilingual engine for AI slash commands and prompt engineering.'
  }
};
