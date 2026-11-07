import React, { useState, useEffect, useMemo } from 'react';
import { SLASH_COMMANDS, CATEGORIES, SlashCommand } from './data/slashCommandsDB';
import { matchIntentAndGenerate, GenerationResult } from './services/intentMatcher';
import { EnhancerOptions } from './services/fallbackEngine';
import { TRANSLATIONS } from './services/i18n';

interface HistoryItem {
  id: number;
  input: string;
  command: string;
  prompt: string;
  time: string;
}

export const App: React.FC = () => {
  // Preferences: White theme only
  const [lang, setLang] = useState<'ar' | 'en'>(() => (localStorage.getItem('sm_lang') as 'ar' | 'en') || 'ar');

  // Input & Filters
  const [userInput, setUserInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCommand, setActiveModalCommand] = useState<SlashCommand | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Drawers
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Storage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('sm_favorites') || '[]'); } catch { return []; }
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('sm_history') || '[]'); } catch { return []; }
  });

  // Enhancers
  const [enhancers, setEnhancers] = useState<EnhancerOptions>({
    keepIdentity: false,
    photorealistic8k: true,
    studioLighting: false,
    respondArabic: false,
    chainOfThought: false,
    tabularOutput: false,
    codeOnly: false
  });

  // Output
  const [output, setOutput] = useState<GenerationResult>(() => {
    return matchIntentAndGenerate('قص شعري تدريج جانبي بارز وعصري مع حفظ ملامح وجهي', { photorealistic8k: true }, 'ar');
  });

  const t = TRANSLATIONS[lang];

  // Enforce Pure White Light Theme
  useEffect(() => {
    localStorage.setItem('sm_theme', 'light');
    document.documentElement.classList.remove('dark');
  }, []);

  // Language & RTL effect
  useEffect(() => {
    localStorage.setItem('sm_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Save favorites & history
  useEffect(() => {
    localStorage.setItem('sm_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('sm_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const copyToClipboard = (text: string, label?: string) => {
    navigator.clipboard.writeText(text);
    showToast(label ? `${label}: ${t.copiedToast}` : t.copiedToast);
  };

  const toggleFavorite = (cmdId: string) => {
    setFavorites(prev => prev.includes(cmdId) ? prev.filter(id => id !== cmdId) : [...prev, cmdId]);
  };

  const handleGenerate = (inputTextOverride?: string) => {
    const text = (inputTextOverride !== undefined ? inputTextOverride : userInput).trim();
    if (!text) return;

    setIsGenerating(true);
    setTimeout(() => {
      const result = matchIntentAndGenerate(text, enhancers, lang);
      setOutput(result);
      setIsGenerating(false);

      setHistory(prev => [
        {
          id: Date.now(),
          input: text,
          command: result.command,
          prompt: result.prompt,
          time: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
        },
        ...prev.slice(0, 24)
      ]);
    }, 180);
  };

  const filteredCommands = useMemo(() => {
    return SLASH_COMMANDS.filter(cmd => {
      const matchCat = selectedCategory === 'all' || cmd.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        cmd.command.toLowerCase().includes(q) ||
        cmd.titleAr.toLowerCase().includes(q) ||
        cmd.titleEn.toLowerCase().includes(q) ||
        cmd.descriptionAr.toLowerCase().includes(q) ||
        cmd.descriptionEn.toLowerCase().includes(q) ||
        cmd.keywordsAr.some(k => k.toLowerCase().includes(q)) ||
        cmd.keywordsEn.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const samplePrompts = [
    { ar: 'قص وتغيير تسريحة شعري لتدريج جانبي فخم', en: 'Change haircut to modern low taper fade with neat curls' },
    { ar: 'ارتداء بدلة رسمية إيطالية فاخرة لصورة لينكد إن', en: 'Executive Italian navy suit for LinkedIn headshot' },
    { ar: 'تصميم شعار مينيمال لشركة ذكاء اصطناعي ناشئة', en: 'Minimalist geometric vector logo for AI fintech startup' },
    { ar: 'كود بايثون متقدم لتحليل بيانات المبيعات وسرعة المعالجة', en: 'Optimized Python script for high-throughput sales analytics' },
    { ar: 'رد رسمي حازم ومؤدب لرفض طلب تخفيض السعر من عميل', en: 'Diplomatic email response politely declining client discount' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased overflow-x-hidden w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
          <div className="bg-slate-900/95 text-white px-5 py-2.5 rounded-full shadow-xl backdrop-blur-md font-bold text-xs sm:text-sm border border-slate-800 animate-bounce">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs safe-top transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xs tracking-tighter">
              /S
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 truncate">
                  {t.appName}
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200/80">
                  {t.badgeActiveCommands}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate hidden xs:block sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Favorites, History, Lang Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setShowFavorites(true)}
              className="relative p-2 sm:p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition active:scale-95 touch-manipulation"
              title={t.favorites}
              aria-label={t.favorites}
            >
              <span className="text-base sm:text-lg">⭐</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowHistory(true)}
              className="relative p-2 sm:p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition active:scale-95 touch-manipulation"
              title={t.history}
              aria-label={t.history}
            >
              <span className="text-base sm:text-lg">🕒</span>
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {history.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 active:scale-95 touch-manipulation"
            >
              <span>🌐</span>
              <span>{t.languageSwitch}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 px-1 sm:px-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[11px] sm:text-xs font-bold">
            <span>🚀</span>
            <span>Universal Arabic-to-Slash & English Prompt Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {t.heroTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Hero Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <span>✍️</span>
                <span>{lang === 'ar' ? 'طلبك بالعربية أو الإنجليزية' : 'Your Request in Plain Language'}</span>
              </label>
              {userInput && (
                <button
                  onClick={() => setUserInput('')}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold p-1"
                >
                  {t.clearInput}
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleGenerate();
                }}
                placeholder={t.inputPlaceholder}
                rows={4}
                className="w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition resize-none font-medium leading-relaxed"
              />
              <div className="absolute bottom-2.5 end-3 text-[10px] sm:text-[11px] text-slate-400 font-medium hidden sm:block pointer-events-none">
                {t.shortcutHint}
              </div>
            </div>

            {/* Quick Samples */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-600">
                {t.tryExamplesLabel}
              </span>
              <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 pb-1 sm:pb-0 no-scrollbar touch-pan-x">
                {samplePrompts.map((s, idx) => {
                  const text = lang === 'ar' ? s.ar : s.en;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserInput(text);
                        handleGenerate(text);
                      }}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 transition text-start border border-slate-200/60 whitespace-nowrap sm:whitespace-normal shrink-0 sm:shrink max-w-[280px] sm:max-w-full truncate"
                      title={text}
                    >
                      👉 {text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enhancers */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-600">
                {t.enhancersTitle}
              </span>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs font-semibold">
                {[
                  { key: 'keepIdentity', label: t.enhancerIdentity },
                  { key: 'photorealistic8k', label: t.enhancerPhoto8k },
                  { key: 'studioLighting', label: t.enhancerLighting },
                  { key: 'respondArabic', label: t.enhancerArabic },
                  { key: 'chainOfThought', label: t.enhancerCoT },
                  { key: 'tabularOutput', label: t.enhancerTable },
                  { key: 'codeOnly', label: t.enhancerCodeOnly },
                ].map((chip) => {
                  const isActive = enhancers[chip.key as keyof EnhancerOptions];
                  return (
                    <button
                      key={chip.key}
                      onClick={() => setEnhancers(p => ({ ...p, [chip.key]: !p[chip.key as keyof EnhancerOptions] }))}
                      className={`px-3 py-2 rounded-xl border text-start transition flex items-center justify-between gap-1 active:scale-98 ${
                        isActive
                          ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{chip.label}</span>
                      <span className="font-bold text-xs">{isActive ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-extrabold text-sm sm:text-base shadow-sm hover:shadow transition transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
            >
              <span>{isGenerating ? '⏳' : '✨'}</span>
              <span>{isGenerating ? t.generatingBtn : t.generateBtn}</span>
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Box A: Command */}
            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t.resultBoxCommandTitle}
                  </span>
                  {output.isFallback ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {t.fallbackActiveBadge}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.matchedBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <span>{t.accuracyScore}:</span>
                  <span className="text-cyan-700 font-black">{output.confidence}%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200" dir="ltr">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-brand-600 code-font tracking-tight break-all">
                    {output.command}
                  </span>
                  {output.matchedCommand && (
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                      {lang === 'ar' ? output.matchedCommand.titleAr : output.matchedCommand.titleEn}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => copyToClipboard(output.command, 'Slash Command')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 touch-manipulation whitespace-nowrap"
                >
                  <span>📋</span>
                  <span>{t.copyCommand}</span>
                </button>
              </div>

              {output.extractedDetails && output.extractedDetails.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">{t.extractedTermsLabel}</span>
                  {output.extractedDetails.map((term, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-cyan-700 border border-slate-200/70 font-mono text-[11px]">
                      {term}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Box B: Full Mega-Prompt */}
            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.resultBoxPromptTitle}
                </span>

                <div className="text-xs text-slate-400 font-medium">
                  <span>{output.prompt.split(/\s+/).filter(Boolean).length} {t.wordsCount}</span>
                  <span className="mx-1.5">•</span>
                  <span>{output.prompt.length} {t.charactersCount}</span>
                </div>
              </div>

              <div className="relative rounded-xl sm:rounded-2xl bg-slate-50 text-slate-800 p-3.5 sm:p-5 border border-slate-200 font-mono text-xs sm:text-sm leading-relaxed max-h-72 sm:max-h-80 overflow-y-auto whitespace-pre-wrap break-words selection:bg-brand-100 selection:text-brand-900" dir="ltr">
                {output.prompt}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
                <button
                  onClick={() => copyToClipboard(output.prompt, 'Master Prompt')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
                >
                  <span>📋</span>
                  <span>{t.copyPrompt}</span>
                </button>

                <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => copyToClipboard(output.prompt)}
                    className="py-2 px-2 sm:px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1 active:scale-95 text-center truncate"
                  >
                    🤖 {t.openInChatGPT}
                  </a>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => copyToClipboard(output.prompt)}
                    className="py-2 px-2 sm:px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1 active:scale-95 text-center truncate"
                  >
                    ⚡ {t.openInClaude}
                  </a>
                  <a
                    href="https://discord.com/channels/@me"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => copyToClipboard(output.prompt)}
                    className="py-2 px-2 sm:px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1 active:scale-95 text-center truncate"
                  >
                    🎨 {t.openInMidjourney}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Command Encyclopedia */}
        <section className="pt-6 sm:pt-8 border-t border-slate-200 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
                {t.encyclopediaTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {t.encyclopediaSubtitle}
              </p>
            </div>

            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 w-fit shrink-0">
              {filteredCommands.length} {t.commandsCount}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="relative max-w-2xl">
              <span className="absolute inset-y-0 start-3.5 flex items-center pointer-events-none text-slate-400 text-base sm:text-lg">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white border border-slate-200 rounded-xl sm:rounded-2xl py-3 sm:py-3.5 ps-11 pe-9 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-xs transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 end-3 flex items-center text-xs text-slate-400 hover:text-slate-600 font-bold p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x">
              {CATEGORIES.map(cat => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 touch-manipulation ${
                      active
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredCommands.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 p-6">
              <span className="text-3xl sm:text-4xl">🔎</span>
              <p className="mt-3 text-sm sm:text-base font-bold text-slate-600">
                {t.noCommandsFound}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredCommands.map(cmd => {
                const isFav = favorites.includes(cmd.id);
                return (
                  <div
                    key={cmd.id}
                    className="bg-white border border-slate-200 hover:border-brand-500/50 hover:shadow-md rounded-2xl p-4 sm:p-5 transition flex flex-col justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-mono font-bold text-xs sm:text-sm border border-brand-200/80 group-hover:border-brand-500/40 transition" dir="ltr">
                          {cmd.command}
                        </span>
                        <button
                          onClick={() => toggleFavorite(cmd.id)}
                          className={`p-1.5 rounded-lg text-sm transition active:scale-95 touch-manipulation ${
                            isFav ? 'text-amber-500 scale-110' : 'text-slate-300 hover:text-amber-400'
                          }`}
                        >
                          ⭐
                        </button>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1">
                        {lang === 'ar' ? cmd.titleAr : cmd.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                        {lang === 'ar' ? cmd.descriptionAr : cmd.descriptionEn}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3.5">
                        {(lang === 'ar' ? cmd.keywordsAr : cmd.keywordsEn).slice(0, 3).map((kw, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => {
                          const sample = lang === 'ar' ? cmd.exampleInputAr : cmd.exampleInputEn;
                          setUserInput(sample);
                          handleGenerate(sample);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1 active:scale-95 touch-manipulation"
                      >
                        <span>⚡</span>
                        <span>{t.useCommandBtn}</span>
                      </button>

                      <button
                        onClick={() => setActiveModalCommand(cmd)}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition active:scale-95 touch-manipulation"
                        title={t.detailsBtn}
                      >
                        ℹ️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Modal: Command Details */}
      {activeModalCommand && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto safe-bottom">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-xl bg-brand-50 text-brand-700 font-mono font-bold text-sm sm:text-base border border-brand-200" dir="ltr">
                  {activeModalCommand.command}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 mt-2">
                  {lang === 'ar' ? activeModalCommand.titleAr : activeModalCommand.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalCommand(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar' ? activeModalCommand.descriptionAr : activeModalCommand.descriptionEn}
            </p>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.modalTemplate}
              </span>
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 text-slate-800 font-mono text-xs leading-relaxed border border-slate-200 whitespace-pre-wrap break-words" dir="ltr">
                {activeModalCommand.englishTemplate}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.modalSampleAr}
              </span>
              <div className="p-3 rounded-xl bg-slate-50 text-slate-700 text-xs border border-slate-200">
                "{lang === 'ar' ? activeModalCommand.exampleInputAr : activeModalCommand.exampleInputEn}"
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.modalRecommendedModels}
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeModalCommand.recommendedAI.map((ai, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-semibold text-xs border border-brand-200">
                    {ai}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveModalCommand(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                {t.modalClose}
              </button>
              <button
                onClick={() => {
                  const sample = lang === 'ar' ? activeModalCommand.exampleInputAr : activeModalCommand.exampleInputEn;
                  setUserInput(sample);
                  handleGenerate(sample);
                  setActiveModalCommand(null);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition"
              >
                {t.modalTryCommand}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Drawer */}
      {showFavorites && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-s border-slate-200 w-full sm:max-w-md h-full p-4 sm:p-6 shadow-2xl flex flex-col justify-between safe-top safe-bottom">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
                <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <span>⭐</span>
                  <span>{t.favorites}</span>
                </h3>
                <button onClick={() => setShowFavorites(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1">✕</button>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  {t.noFavorites}
                </div>
              ) : (
                <div className="space-y-2.5 overflow-y-auto max-h-[70vh]">
                  {favorites.map(favId => {
                    const cmd = SLASH_COMMANDS.find(c => c.id === favId);
                    if (!cmd) return null;
                    return (
                      <div key={cmd.id} className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="font-mono font-bold text-xs text-brand-600" dir="ltr">
                            {cmd.command}
                          </span>
                          <h5 className="font-bold text-xs text-slate-800 mt-0.5 truncate">
                            {lang === 'ar' ? cmd.titleAr : cmd.titleEn}
                          </h5>
                        </div>

                        <button
                          onClick={() => {
                            const sample = lang === 'ar' ? cmd.exampleInputAr : cmd.exampleInputEn;
                            setUserInput(sample);
                            handleGenerate(sample);
                            setShowFavorites(false);
                            window.scrollTo({ top: 120, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shrink-0"
                        >
                          ⚡ {t.useCommandBtn}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFavorites(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              {t.modalClose}
            </button>
          </div>
        </div>
      )}

      {/* History Drawer */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-s border-slate-200 w-full sm:max-w-md h-full p-4 sm:p-6 shadow-2xl flex flex-col justify-between safe-top safe-bottom">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
                <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <span>🕒</span>
                  <span>{t.history}</span>
                </h3>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <button
                      onClick={() => setHistory([])}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      {t.clearHistory}
                    </button>
                  )}
                  <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold ms-2 p-1">✕</button>
                </div>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  {t.noHistory}
                </div>
              ) : (
                <div className="space-y-2.5 overflow-y-auto max-h-[70vh]">
                  {history.map(item => (
                    <div key={item.id} className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-brand-600" dir="ltr">
                          {item.command}
                        </span>
                        <span className="text-slate-400 text-[11px]">{item.time}</span>
                      </div>

                      <p className="text-xs text-slate-700 line-clamp-2 italic">
                        "{item.input}"
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => copyToClipboard(item.prompt, 'Prompt')}
                          className="text-[11px] font-bold text-cyan-600 hover:underline"
                        >
                          📋 {t.copyPrompt}
                        </button>
                        <span className="text-slate-300">•</span>
                        <button
                          onClick={() => {
                            setUserInput(item.input);
                            handleGenerate(item.input);
                            setShowHistory(false);
                            window.scrollTo({ top: 120, behavior: 'smooth' });
                          }}
                          className="text-[11px] font-bold text-brand-600 hover:underline"
                        >
                          ⚡ Re-run
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowHistory(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              {t.modalClose}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 text-center text-xs text-slate-500 space-y-2 safe-bottom">
        <div className="flex items-center justify-center gap-2 font-black text-slate-800 text-sm">
          <span className="text-brand-600">/S</span> SlashMaster AI
        </div>
        <p className="px-4">{t.footerDesc}</p>
        <p className="text-[11px] text-slate-400 px-4">{t.footerRights}</p>
      </footer>
    </div>
  );
};

export default App;
