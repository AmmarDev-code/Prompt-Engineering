# Product Requirements Document (PRD): Universal Arabic-to-Slash & English Prompt Engine

## 1. Executive Summary
- **Product Name:** SlashMaster AI (موسوعة ومُولّد أوامر الذكاء الاصطناعي الشامل)
- **Type:** 100% Client-Side Frontend Web Application (React + TypeScript + Tailwind CSS)
- **Core Mission:** Allow any Arabic-speaking user to type ANY request in plain or colloquial Arabic (photo editing, design, writing, coding, cybersecurity, business, study, or any random topic). The platform instantly detects their intent and outputs:
  1. **The Exact English Slash Command (`/command`)** (covering 60+ classic & modern AI slash commands).
  2. **The Ultra-Precise English Mega-Prompt** ready to copy-paste into Midjourney, ChatGPT, Claude, Gemini, Photoshop AI, or any AI tool.
  3. **Universal Fallback Engine:** Never fails on unknown queries—if the user asks for something outside the 60+ presets, the engine dynamically constructs a custom `/command` and a complete English CO-STAR prompt.

## 2. Technical Architecture & UI/UX
- **Framework:** React (Vite) + Tailwind CSS + Lucide React Icons.
- **RTL/LTR Hybrid Design:** Full RTL (`dir="rtl"`) Arabic interface with LTR (`dir="ltr"`) code boxes for English `/slash` commands and prompts.
- **Typography:** `'Cairo'` for Arabic text, `'JetBrains Mono'` for `/commands`.
- **Storage:** `localStorage` for History, Favorites, and Custom User Commands.

## 3. The 60+ Master Slash Command Database (Must Be Embedded in Code)
Create a dedicated modular file `src/data/slashCommandsDB.ts` containing all 60+ commands across 6 categories, each with:
- `command`: The `/slash` string (e.g., `/haircut`, `/imagine`, `/pro`).
- `category`: Category ID (`classic`, `photo`, `design`, `writing`, `tech`, `study`).
- `titleAr`: Arabic name of the command.
- `keywordsAr`: Array of 10-20 Arabic & colloquial trigger words (e.g., `["شعر", "قص", "تسريحة", "حلاقة", "بارز", "تدريج", "شعري"]`).
- `englishTemplate`: The master English prompt template with `{USER_DETAILS}` placeholder and strict quality/identity locks.

### Required Categories & Commands to Include in `slashCommandsDB.ts`:
1. **Classic AI & Midjourney Commands (8 Commands):**
   `/imagine`, `/blend`, `/describe`, `/shorten`, `/inpaint`, `/outpaint`, `/upscale`, `/remix`
2. **Photo Editing & Portrait Retouching (14 Commands):**
   `/haircut` (قص وتغيير الشعر مع حفظ الملامح), `/haircolor` (تغيير لون الشعر), `/beard` (إضافة/تحديد اللحية), `/suit` (لبس بدلة رسمية للسيرة الذاتية), `/outfit` (تغيير الملابس), `/bg-remove` (عزل وإزالة الخلفية), `/bg-swap` (تغيير الخلفية لمكان فخم), `/enhance` (تصفية الوجه ورفع الدقة), `/restore` (ترميم وتلوين الصور القديمة), `/smile` (تعديل الابتسامة والتعابير), `/glasses` (إضافة/إزالة النظارات), `/age` (تصغير/تكبير العمر), `/relight` (إضاءة سينمائية), `/erase` (مسح عنصر غير مرغوب).
3. **Graphic Design, Branding & Video (10 Commands):**
   `/logo` (تصميم شعار), `/product` (تصوير منتجات تجاري), `/mockup` (موك أب احترافي), `/poster` (بوستر إعلاني), `/3d-icon` (أيقونة ثلاثية الأبعاد), `/ui` (تصميم واجهة تطبيق/موقع), `/anime` (تحويل لأنمي/بيكسار), `/sketch` (رسم بقلم الرصاص), `/video` (توليد فيديو سينمائي), `/thumbnail` (صورة مصغرة لليوتيوب).
4. **Writing, Text Editing & Business (16 Commands):**
   `/pro` (صياغة احترافية), `/reply` (رد رسمي على رسالة/إيميل), `/grammar` (تصحيح لغوي وإملائي), `/paraphrase` (إعادة صياغة), `/tldr` (تلخيص في نقاط), `/expand` (توسيع الفكرة لمقال), `/translate` (ترجمة احترافية), `/cv` (تطوير السيرة الذاتية ATS), `/cover` (رسالة تغطية وظيفية), `/ad` (إعلان تسويقي AIDA), `/script` (سيناريو فيديو ريلز/يوتيوب), `/seo` (مقال متوافق مع البحث), `/plan` (خطة عمل وجدول زمني), `/idea` (عصف ذهني 5 أفكار), `/critic` (نقد الفكرة واستخراج العيوب), `/contract` (صياغة عقد رسمي).
5. **Programming, IT & Cybersecurity (10 Commands):**
   `/code` (كتابة كود نظيف), `/fix` (إصلاح الأخطاء البرمجية), `/refactor` (تحسين وتسريع الكود), `/sql` (استعلام قواعد بيانات), `/regex` (تعبير نمطي), `/api` (تصميم واجهة برمجية), `/sec` (فحص ثغرات الكود OWASP), `/soc` (تحليل تنبيهات وسجلات الأمن السيبراني), `/net` (إعداد وحل مشاكل شبكات سيسكو), `/linux` (أوامر وسكربتات لينكس).
6. **Study, Research & Problem Solving (7 Commands):**
   `/eli5` (تبسيط المفهوم للمبتدئين), `/quiz` (إنشاء اختبار مع الحل), `/flashcards` (بطاقات استذكار), `/research` (بحث أكاديمي منظم), `/compare` (مقارنة شاملة في جدول), `/math` (حل مسائل بالخطوات), `/excel` (معادلات إكسل متقدمة).

## 4. Core Functional Engines

### Engine 1: Arabic Semantic & Keyword Intent Matcher + Detail Translator
- When the user types in Arabic (e.g., *"عندي صورة بشعر طويل وأريد تقص لي الشعر بشكل بارز وعصري"*):
  1. Scores all 65+ commands against the Arabic input and picks the best match (`/haircut`).
  2. Extracts descriptive adjectives from the user's Arabic text using a built-in **500-word Arabic-to-English Dictionary** (`src/data/arEnDictionary.ts` covering colors, hair types, clothing, lighting, moods, tech terms, business terms) and translates them into English modifiers (`prominent, modern, sharp textured cut`).
  3. Injects the translated details into the English Master Prompt Template.

### Engine 2: Universal Fallback Engine (لا يتوقف أمام أي سؤال في العالم)
- If a user types a request that does NOT match any of the 65+ commands, the system dynamically:
  1. Generates a smart contextual slash command (e.g., `/smart-task`, `/visual-gen`, or `/expert-solve`).
  2. Translates key Arabic terms using the built-in dictionary + rule-based converter.
  3. Builds a high-precision English CO-STAR prompt with the Dual-Power lock (processes in English for 100% accuracy, responds in Arabic if it's a text query, or outputs pure English parameters if it's an image query).

### Engine 3: Interactive Slash Command Explorer & Search Bar
- **Instant Live Search:** A search bar where users can search in Arabic or English across all 65+ commands (e.g., searching "شعر" or "خلفية" or "كود" or `/blend` filters the cards immediately).
- **Category Filter Tabs:** (`الكل 65+`, `أوامر الذكاء الأصلية`, `تعديل الصور الشخصية`, `التصميم والجرافيك`, `الكتابة والأعمال`, `البرمجة والأمن السيبراني`, `الدراسة والبحث`).
- **One-Click "استخدم هذا الأمر (Use Command)":** Clicking any card loads it into the main generator with a realistic Arabic example.

### Engine 4: Precision Enhancer Chips (مُحسنات الدقة الفورية)
Clickable toggle pills that append pro parameters to the generated prompt:
- **حفظ ملامح الوجه 100% (`Keep Exact Identity`)**
- **جودة 8K واقعية (`8K RAW Photorealistic`)**
- **إضاءة استوديو سينمائية (`Cinematic Studio Lighting`)**
- **إجابة بالعربية الفصحى (`Respond in Fluent Arabic` - for text/chat prompts)**
- **تفكير خطوة بخطوة (`Chain-of-Thought Step-by-Step`)**
- **إخراج في جدول (`Tabular Output`)**

## 5. User Interface Layout
1. **Header:** Brand Title, Total Commands Counter Badge (`65+ Active Slash Commands`), Dark/Light Mode Toggle, Favorites Drawer Button.
2. **Hero Generator Workspace:**
   - Right/Top Panel: Large Arabic Input Textarea + Quick Modifier Chips + "توليد السلاش والبرومبت الذكي" CTA Button.
   - Left/Bottom Panel: Dual Result Display:
     - **Box A:** Giant glowing `/command` pill with "نسخ السلاش" button.
     - **Box B:** Full Engineered English Prompt with "نسخ البرومبت الإنجليزي الكامل" button + Prompt Accuracy Meter (`100% Ultra-Precise`).
3. **Searchable Master Command Encyclopedia:** Search input + Category filter pills + Responsive grid of all 65+ command cards showing the `/command`, Arabic title, when to use it, and a "جرب الآن" button.
٤.