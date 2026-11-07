import { SLASH_COMMANDS, SlashCommand } from '../data/slashCommandsDB';
import { translateArabicTerms } from '../data/arEnDictionary';
import { generateFallbackPrompt, EnhancerOptions } from './fallbackEngine';

export interface GenerationResult {
  command: string;
  prompt: string;
  matchedCommand: SlashCommand | null;
  confidence: number;
  isFallback: boolean;
  extractedDetails: string[];
  activeEnhancersApplied: string[];
}

/**
 * محرك مطابقة النوايا الدلالية واستخراج المحددات (Intent Matcher & Generator)
 */
export function matchIntentAndGenerate(
  rawInput: string,
  enhancers: EnhancerOptions = {},
  uiLanguage: 'ar' | 'en' = 'ar'
): GenerationResult {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return {
      command: '/imagine',
      prompt: 'Please enter your prompt idea in Arabic or English to generate the exact slash command and engineered mega-prompt.',
      matchedCommand: null,
      confidence: 0,
      isFallback: false,
      extractedDetails: [],
      activeEnhancersApplied: []
    };
  }

  // إذا أدخل المستخدم أمراً يبدأ بسلاش صريحاً مثل `/haircut` أو `/code`
  if (trimmed.startsWith('/')) {
    const enteredCmd = trimmed.split(' ')[0].toLowerCase();
    const explicitMatch = SLASH_COMMANDS.find(c => c.command.toLowerCase() === enteredCmd);
    if (explicitMatch) {
      const remainingText = trimmed.replace(enteredCmd, '').trim();
      return buildPromptForCommand(explicitMatch, remainingText || explicitMatch.exampleInputAr, enhancers, uiLanguage, 100);
    }
  }

  const normalized = trimmed.toLowerCase();
  const inputWords = normalized.split(/[\s,،.\-_\/]+/);

  // حساب درجات التطابق لجميع الأوامر الـ 65+
  let bestScore = -1;
  let bestCommand: SlashCommand | null = null;

  for (const cmd of SLASH_COMMANDS) {
    let score = 0;

    // 1. فحص الكلمات المفتاحية العربية (أعلى وزن)
    for (const kw of cmd.keywordsAr) {
      const kwLower = kw.toLowerCase();
      if (normalized.includes(kwLower)) {
        // إذا كانت الكلمة مطابقة تامة لكلمة مستقلة
        if (inputWords.includes(kwLower)) {
          score += 30;
        } else {
          score += 15;
        }
      }
    }

    // 2. فحص الكلمات المفتاحية الإنجليزية
    for (const kw of cmd.keywordsEn) {
      const kwLower = kw.toLowerCase();
      if (normalized.includes(kwLower)) {
        if (inputWords.includes(kwLower)) {
          score += 25;
        } else {
          score += 12;
        }
      }
    }

    // 3. فحص عنوان الأمر بالعربية والإنجليزية
    if (normalized.includes(cmd.titleAr.toLowerCase())) score += 40;
    if (normalized.includes(cmd.titleEn.toLowerCase())) score += 35;

    // 4. فحص اسم السلاش نفسه
    const cmdClean = cmd.command.replace('/', '');
    if (normalized.includes(cmdClean)) score += 50;

    if (score > bestScore) {
      bestScore = score;
      bestCommand = cmd;
    }
  }

  // عتبة التطابق المعتمدة: إذا كانت النتيجة كافية (Score >= 20)
  if (bestCommand && bestScore >= 20) {
    const confidence = Math.min(99, Math.max(75, Math.round(bestScore * 1.3)));
    return buildPromptForCommand(bestCommand, trimmed, enhancers, uiLanguage, confidence);
  }

  // في حال عدم وجود تطابق وثيق -> تفعيل محرك الـ Fallback الشامل بنموذج CO-STAR
  const fallback = generateFallbackPrompt(trimmed, enhancers, uiLanguage);
  const activeEnhancersList = getActiveEnhancersList(enhancers, uiLanguage);

  return {
    command: fallback.command,
    prompt: fallback.prompt,
    matchedCommand: null,
    confidence: fallback.confidence,
    isFallback: true,
    extractedDetails: translateArabicTerms(trimmed).translatedWords,
    activeEnhancersApplied: activeEnhancersList
  };
}

/**
 * دمج المحددات والمُحسنات في قالب الأمر المطابق
 */
function buildPromptForCommand(
  cmd: SlashCommand,
  userInput: string,
  enhancers: EnhancerOptions,
  uiLanguage: 'ar' | 'en',
  confidence: number
): GenerationResult {
  const { translatedWords, enrichedEnglishString } = translateArabicTerms(userInput);
  
  // بناء تفاصيل المستخدم المحقونة:
  // نفضل الترجمة الإنجليزية للمصطلحات مع النص الأصلي إذا كان إنجليزياً
  const isInputArabic = /[\u0600-\u06FF]/.test(userInput);
  let userDetailsString = '';

  if (isInputArabic) {
    if (enrichedEnglishString) {
      userDetailsString = `${enrichedEnglishString} (derived from: "${userInput}")`;
    } else {
      userDetailsString = `"${userInput}"`;
    }
  } else {
    userDetailsString = userInput;
  }

  let finalPrompt = cmd.englishTemplate.replace('{USER_DETAILS}', userDetailsString);

  // تطبيق الـ Enhancers حسب طبيعة الأمر (صورة أو نص/كود)
  const isVisualCommand = cmd.category === 'classic' || cmd.category === 'photo' || cmd.category === 'design';
  const appliedEnhancers: string[] = [];

  if (isVisualCommand) {
    const visualModifiers: string[] = [];
    if (enhancers.photorealistic8k && !finalPrompt.includes('8k')) {
      visualModifiers.push('8k resolution RAW, photorealistic masterwork, Hasselblad 100c medium format lens, authentic textures --v 6.1 --style raw');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'جودة 8K واقعية' : '8K RAW Photorealistic');
    }
    if (enhancers.studioLighting && !finalPrompt.includes('rim light')) {
      visualModifiers.push('volumetric atmospheric studio lighting, dramatic chiaroscuro rim accents, Octane render 8K');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'إضاءة سينمائية' : 'Cinematic Studio Lighting');
    }
    if (enhancers.keepIdentity && !finalPrompt.includes('--cref')) {
      visualModifiers.push('--cref [IMAGE_URL] --cw 100 (strictly preserve biometric facial identity and features)');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'حفظ الملامح 100%' : 'Keep Exact Identity');
    }
    if (visualModifiers.length > 0) {
      finalPrompt += `, ${visualModifiers.join(', ')}`;
    }
  } else {
    // للأوامر النصية والبرمجية والدراسية
    const textDirectives: string[] = [];
    if (enhancers.respondArabic) {
      textDirectives.push('Format and output the final comprehensive response in articulate, high-level Modern Standard Arabic (فصحى بليغة).');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'إجابة بالعربية الفصحى' : 'Respond in Fluent Arabic');
    }
    if (enhancers.chainOfThought) {
      textDirectives.push('Think step-by-step through first principles, explicitly stating assumptions and reasoning before concluding.');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'تفكير خطوة بخطوة' : 'Chain-of-Thought');
    }
    if (enhancers.tabularOutput) {
      textDirectives.push('Structure and synthesize all key outputs and comparisons into an exhaustive markdown table.');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'إخراج في جدول' : 'Tabular Output');
    }
    if (enhancers.codeOnly && (cmd.category === 'tech' || cmd.id === 'code' || cmd.id === 'sql')) {
      textDirectives.push('Deliver strictly production-grade code only. No conversational pleasantries, explanations, or unnecessary comments.');
      appliedEnhancers.push(uiLanguage === 'ar' ? 'كود نقي بدون محادثة' : 'Code Only');
    }
    if (textDirectives.length > 0) {
      finalPrompt += `\n\n[Special Directives]:\n- ${textDirectives.join('\n- ')}`;
    }
  }

  return {
    command: cmd.command,
    prompt: finalPrompt,
    matchedCommand: cmd,
    confidence,
    isFallback: false,
    extractedDetails: translatedWords,
    activeEnhancersApplied: appliedEnhancers
  };
}

function getActiveEnhancersList(enhancers: EnhancerOptions, lang: 'ar' | 'en'): string[] {
  const list: string[] = [];
  if (enhancers.keepIdentity) list.push(lang === 'ar' ? 'حفظ الملامح 100%' : 'Keep Exact Identity');
  if (enhancers.photorealistic8k) list.push(lang === 'ar' ? 'جودة 8K واقعية' : '8K RAW Photorealistic');
  if (enhancers.studioLighting) list.push(lang === 'ar' ? 'إضاءة سينمائية' : 'Cinematic Studio Lighting');
  if (enhancers.respondArabic) list.push(lang === 'ar' ? 'إجابة بالعربية الفصحى' : 'Respond in Fluent Arabic');
  if (enhancers.chainOfThought) list.push(lang === 'ar' ? 'تفكير خطوة بخطوة' : 'Chain-of-Thought');
  if (enhancers.tabularOutput) list.push(lang === 'ar' ? 'إخراج في جدول' : 'Tabular Output');
  if (enhancers.codeOnly) list.push(lang === 'ar' ? 'كود نقي بدون محادثة' : 'Code Only');
  return list;
}
