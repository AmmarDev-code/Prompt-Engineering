import { translateArabicTerms } from '../data/arEnDictionary';

export interface EnhancerOptions {
  keepIdentity?: boolean;       // حفظ ملامح الوجه 100%
  photorealistic8k?: boolean;   // جودة 8K واقعية
  studioLighting?: boolean;     // إضاءة استوديو سينمائية
  respondArabic?: boolean;      // إجابة بالعربية الفصحى
  chainOfThought?: boolean;     // تفكير خطوة بخطوة
  tabularOutput?: boolean;      // إخراج في جدول
  codeOnly?: boolean;           // كود نقي بدون محادثة
}

export interface FallbackResult {
  command: string;
  prompt: string;
  intentDomain: 'visual' | 'code' | 'business' | 'academic' | 'general';
  confidence: number;
}

/**
 * Universal Fallback Engine (محرك الـ Fallback الشامل بنموذج CO-STAR)
 * لا يتوقف أمام أي سؤال في العالم—إذا كان الطلب خارج الأوامر الـ 65،
 * يقوم المحرك بصياغة أمر سلاش ذكي مخصص وبناء برومبت إنجليزي CO-STAR متكامل مع قفل القوة المزدوجة (Dual-Power Lock).
 */
export function generateFallbackPrompt(
  rawInput: string,
  enhancers: EnhancerOptions = {},
  targetLang: 'ar' | 'en' = 'ar'
): FallbackResult {
  const cleanInput = rawInput.trim();
  const { enrichedEnglishString } = translateArabicTerms(cleanInput);

  // الكشف عن المجال الأساسي للطلب غير المصنف
  const isVisual = /صورة|رسم|تصميم|خلفية|فيديو|ألوان|شخصية|لوحة|photo|image|draw|design|video|render/i.test(cleanInput);
  const isCode = /كود|برمج|سيرفر|خطأ|دالة|موقع|تطبيق|قاعدة بيانات|code|program|bug|function|api|dev/i.test(cleanInput);
  const isBusiness = /تسويق|مبيعات|شركة|إيميل|خطة|مشروع|وظيفة|مالية|market|sales|business|plan|email/i.test(cleanInput);
  const isAcademic = /شرح|دراسة|بحث|سؤال|لماذا|كيف|نظرية|علم|study|research|explain|why|how|science/i.test(cleanInput);

  let dynamicCommand = '/smart-task';
  let domain: FallbackResult['intentDomain'] = 'general';
  let roleTitle = 'World-Class Domain Specialist & Cognitive Strategist';
  let targetFormat = 'Structured analytical breakdown with actionable takeaways';

  if (isVisual) {
    dynamicCommand = '/visual-gen';
    domain = 'visual';
    roleTitle = 'Master Creative Director & Visual Art Technologist';
    targetFormat = 'High-fidelity cinematic visual generation prompt with lighting and composition specs';
  } else if (isCode) {
    dynamicCommand = '/expert-solve';
    domain = 'code';
    roleTitle = 'Principal Enterprise Systems & Software Architect';
    targetFormat = 'Production-ready code architecture, error-handling logic, and step-by-step verification';
  } else if (isBusiness) {
    dynamicCommand = '/biz-strategy';
    domain = 'business';
    roleTitle = 'Chief Strategy Officer & Direct-Response Communications Expert';
    targetFormat = 'Phased execution roadmap, risk matrix, and persuasive messaging framework';
  } else if (isAcademic) {
    dynamicCommand = '/deep-study';
    domain = 'academic';
    roleTitle = 'Senior Research Fellow & Pedagogical Synthesizer';
    targetFormat = 'First-principles breakdown, empirical analogies, and progressive conceptual proofs';
  }

  // بناء أجزاء الـ CO-STAR
  const contextDetails = enrichedEnglishString
    ? `Identified parameters and domain signals: [${enrichedEnglishString}]. User raw query context: "${cleanInput}"`
    : `User raw query context: "${cleanInput}"`;

  // تضمين إعدادات اللغة في المخرجات
  const languageDirective = targetLang === 'ar' || /[\u0600-\u06FF]/.test(cleanInput)
    ? 'Dual-Power Lock: Internalize and reason in English for maximum logical precision, then formulate and output the final response in fluent, articulate Modern Standard Arabic (فصحى معربة بدقة).'
    : 'Dual-Power Lock: Process and formulate the final response in crisp, authoritative, professional English.';

  // دمج مُحسنات الدقة
  const extraClauses: string[] = [];
  if (enhancers.chainOfThought) {
    extraClauses.push('Think step-by-step through first principles, explicitly stating assumptions before deriving conclusions.');
  }
  if (enhancers.tabularOutput) {
    extraClauses.push('Synthesize all core comparative metrics and categorical data in an organized markdown table.');
  }
  if (enhancers.codeOnly) {
    extraClauses.push('Deliver only production-grade runnable code without conversational filler or Markdown wrapping.');
  }
  if (enhancers.respondArabic) {
    extraClauses.push('Strictly deliver the final resolution in articulate, elegant Arabic.');
  }
  if (enhancers.photorealistic8k && isVisual) {
    extraClauses.push('Visual specs: 8k resolution RAW, photorealistic masterwork, Hasselblad 100c medium format lens, authentic textures --v 6.1 --style raw.');
  }
  if (enhancers.studioLighting && isVisual) {
    extraClauses.push('Lighting specs: Volumetric atmospheric lighting, dramatic chiaroscuro rim accents, Octane render 8K.');
  }
  if (enhancers.keepIdentity && isVisual) {
    extraClauses.push('Identity lock: Lock facial landmarks and biometric features 100% --cref [IMAGE_URL] --cw 100.');
  }

  const prompt = [
    `# Role: ${roleTitle}`,
    `# Framework: CO-STAR High-Precision Prompt Engine`,
    '',
    `## CONTEXT:`,
    `${contextDetails}`,
    '',
    `## OBJECTIVE:`,
    `Execute the user's intent with zero ambiguity, addressing explicit and implicit requirements. Direct intent: "${cleanInput}".`,
    '',
    `## STYLE:`,
    `Authoritative, analytical, comprehensive, and rigorously verified.`,
    '',
    `## TONE:`,
    `Objective, insightful, and strategic.`,
    '',
    `## AUDIENCE:`,
    `High-standard professionals and leading AI systems (ChatGPT-4o, Claude 3.5 Sonnet, Midjourney v6).`,
    '',
    `## RESPONSE & OUTPUT FORMAT:`,
    `- Format: ${targetFormat}.`,
    `- Language Protocol: ${languageDirective}`,
    ...(extraClauses.length > 0 ? [`- Precision Directives:\n  * ${extraClauses.join('\n  * ')}`] : []),
    '',
    `Execute the mandate now with the highest achievable standard of quality.`
  ].join('\n');

  return {
    command: dynamicCommand,
    prompt,
    intentDomain: domain,
    confidence: 88
  };
}
