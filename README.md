# 🚀 SlashMaster AI (Universal Arabic-to-Slash & English Prompt Engine)
### موسوعة ومُولّد أوامر الذكاء الاصطناعي الشامل ثنائي اللغة (عربي / إنجليزي)

---

## 🌟 نظرة عامة (Overview)
منصة ويب متكاملة فائقة السرعة تتيح لأي مستخدم إدخال أي طلب باللغة العربية (سواء كانت فصحى أو عامية دارجة بمختلف اللهجات) أو باللغة الإنجليزية، ليقوم المحرك الذكي فوراً بـ:
1. **اكتشاف النية الدلالية (Intent Detection)** ومطابقتها بأحد أوامر الـ Slash الـ 65+ المعتمدة.
2. **استخراج المحددات والصفات والترجمة الدلالية** عبر قاموس مدمج ضخم (500+ مصطلح).
3. **توليد البرومبت الإنجليزي الخارق (Master Mega-Prompt)** الجاهز للنسخ المباشر لأدوات الذكاء الاصطناعي (Midjourney, ChatGPT, Claude, Gemini, Photoshop).
4. **محرك الـ Fallback الشامل بنموذج CO-STAR** لا يتوقف أمام أي سؤال نادر أو خارج التصنيفات.
5. **دعم ثنائي كامل للغتين العربية والإنجليزية** مع تبديل الاتجاه التلقائي (`dir="rtl"` و `dir="ltr"`).
6. **واجهة بيضاء نقية واحترافية بالكامل (Pure White Theme)** متجاوبة 100% مع كافة مقاسات شاشات أجهزة آيفون (iPhone) وأندرويد (Android) والأجهزة اللوحية والمكتبية.
7. **مُحسنات الدقة الفورية (Precision Enhancers)** مثل قفل الملامح، وجودة 8K، وإضاءة الاستوديو، والإجابة بالفصحى.

---

## ⚡ التشغيل الفوري بنقرة واحدة (Zero-Setup Instant Launch)
التطبيق مصمم للعمل الفوري في أي متصفح دون الحاجة لتثبيت أي برامج أو خوادم:
- فقط قم بالنقر المزدوج على ملف:
  👉 **`index.html`**
  أو كليك يمين ثم `Open with Microsoft Edge` أو `Google Chrome`.
- سيعمل التطبيق بكامل وظائفه التفاعلية وقاعدة بيانات الـ 65+ أمراً ومحرك البحث الفوري والمطابقة الدلالية دون أي اتصال خارجي أو انتظار.

---

## 📂 أقسام الأوامر الـ 65+ المتوفرة في الموسوعة

1. **أوامر الذكاء الأصلية (Classic AI & Midjourney - 8 أوامر):**
   `/imagine`, `/blend`, `/describe`, `/shorten`, `/inpaint`, `/outpaint`, `/upscale`, `/remix`

2. **تعديل وتحسين الصور الشخصية (Photo & Portrait - 14 أمر):**
   `/haircut`, `/haircolor`, `/beard`, `/suit`, `/outfit`, `/bg-remove`, `/bg-swap`, `/enhance`, `/restore`, `/smile`, `/glasses`, `/age`, `/relight`, `/erase`

3. **التصميم والهوية والفيديو (Design, Branding & Video - 10 أوامر):**
   `/logo`, `/product`, `/mockup`, `/poster`, `/3d-icon`, `/ui`, `/anime`, `/sketch`, `/video`, `/thumbnail`

4. **الكتابة وصياغة الأعمال (Writing & Business - 16 أمر):**
   `/pro`, `/reply`, `/grammar`, `/paraphrase`, `/tldr`, `/expand`, `/translate`, `/cv`, `/cover`, `/ad`, `/script`, `/seo`, `/plan`, `/idea`, `/critic`, `/contract`

5. **البرمجة والأمن السيبراني (Tech & Cybersecurity - 10 أوامر):**
   `/code`, `/fix`, `/refactor`, `/sql`, `/regex`, `/api`, `/sec`, `/soc`, `/net`, `/linux`

6. **الدراسة والبحث وحل المسائل (Study & Research - 7 أوامر):**
   `/eli5`, `/quiz`, `/flashcards`, `/research`, `/compare`, `/math`, `/excel`

---

## 🛠️ هيكلية المشروع البرمجية (Project Structure)
```
Prompt Eng/
├── index.html                  # التطبيق التفاعلي المستقل الجاهز للتشغيل المباشر
├── prd.md                      # ملف متطلبات المنتج الأصلي
├── package.json                # إعدادات الحزم والاعتماديات (React + Vite + Tailwind)
├── tsconfig.json               # إعدادات TypeScript
├── vite.config.ts              # إعدادات Vite
├── tailwind.config.js          # إعدادات Tailwind CSS والوضع الليلي
├── src/
│   ├── main.tsx                # مدخل التطبيق القياسي
│   ├── App.tsx                 # المكون الرئيسي للواجهة التفاعلية
│   ├── index.css               # الأنماط والتخصيصات
│   ├── data/
│   │   ├── slashCommandsDB.ts  # قاعدة بيانات الـ 65+ أمر المعتمدة
│   │   └── arEnDictionary.ts   # القاموس الدلالي العربي-الإنجليزي (500+ كلمة)
│   └── services/
│       ├── intentMatcher.ts    # محرك المطابقة الدلالية واستخراج المحددات
│       ├── fallbackEngine.ts   # محرك الـ Fallback الشامل بنموذج CO-STAR
│       └── i18n.ts             # نظام الترجمة الثنائي (عربي / إنجليزي)
```

---

## 🧪 اختبارات التحقق والتجربة (Verification & Testing)
يمكنك اختبار المنصة بالأمثلة التالية للتحقق من سرعة ودقة الاستجابة:
- **تعديل شعر:** `عندي صورة وأريد تقص لي الشعر تدريج جانبي بارز` ➔ يتم توجيهه لأمر `/haircut` مع استخراج محددات `taper fade, prominent textured` وقفل ملامح الوجه `--cref [IMAGE_URL] --cw 100`.
- **بدلة رسمية:** `لبسني بدلة رسمية كحلية لصورة لينكد إن` ➔ يتم توجيهه لأمر `/suit`.
- **برمجة:** `اكتب كود بايثون لمعالجة ملفات ضخمة بسرعة` ➔ يتم توجيهه لأمر `/code`.
- **طلب نادر (Fallback):** `كيف أصنع سفينة فضائية ورقية للأطفال` ➔ يتم تفعيل محرك الـ Fallback الشامل بنموذج CO-STAR وأمر `/smart-task` مع التفكير بالإنجليزية والرد بالعربية الفصحى.

---

جميع الحقوق محفوظة © 2026 **SlashMaster AI**.
