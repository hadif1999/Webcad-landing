export type TranslationKey =
  | "nav.features"
  | "nav.pricing"
  | "nav.contact"
  | "nav.startDesigning"
  | "nav.signIn"
  | "hero.badge"
  | "hero.engineTag"
  | "hero.title"
  | "hero.titleBreak"
  | "hero.titleAccent"
  | "hero.description"
  | "hero.startDesigning"
  | "hero.exploreCapabilities"
  | "hero.specs"
  | "features.eyebrow"
  | "features.heading"
  | "features.brepTitle"
  | "features.brepDesc"
  | "features.cloudTitle"
  | "features.cloudDesc"
  | "features.aiTitle"
  | "features.aiDesc"
  | "features.portableTitle"
  | "features.portableDesc"
  | "features.revisionsTitle"
  | "features.revisionsDesc"
  | "features.collabTitle"
  | "features.collabDesc"
  | "workflow.eyebrow"
  | "workflow.heading"
  | "workflow.step1"
  | "workflow.step1Desc"
  | "workflow.step2"
  | "workflow.step2Desc"
  | "workflow.step3"
  | "workflow.step3Desc"
  | "pricing.eyebrow"
  | "pricing.heading"
  | "pricing.seeDashboard"
  | "pricing.freeTitle"
  | "pricing.freeDesc"
  | "pricing.proTitle"
  | "pricing.proDesc"
  | "pricing.teamTitle"
  | "pricing.teamDesc"
  | "cta.heading"
  | "cta.description"
  | "footer.desc"
  | "footer.copyright"
  | "preferences.language"
  | "preferences.themeToggle"
  | "preferences.dark"
  | "preferences.light"
  | "preferences.english"
  | "preferences.persian"
  | "preferences.russian";

export const translations: Record<"en" | "fa" | "ru", Record<TranslationKey, string>> = {
  en: {
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.startDesigning": "Start designing",
    "nav.signIn": "Sign in",
    "hero.badge": "CAD, connected",
    "hero.engineTag": "BROWSER B-REP ENGINE",
    "hero.title": "Parametric CAD for work",
    "hero.titleBreak": "that",
    "hero.titleAccent": "keeps moving.",
    "hero.description":
      "Build precise models in your browser, keep cloud workbenches and revision history together, and use AI assistance when the next change is easier to describe than assemble.",
    "hero.startDesigning": "Start designing",
    "hero.exploreCapabilities": "Explore capabilities",
    "hero.specs": "SKETCH / MODEL / REFINE / PARAMETRIC HISTORY",
    "features.eyebrow": "Six capabilities",
    "features.heading": "Built for real engineering workflow",
    "features.brepTitle": "Parametric B-Rep in the browser",
    "features.brepDesc":
      "Extrude, revolve, loft, fillet and boolean with precise boundary representation geometry executed in WebAssembly.",
    "features.cloudTitle": "Cloud workbenches",
    "features.cloudDesc":
      "Every part is backed by durable cloud storage with instantaneous load times and secure project workspaces.",
    "features.aiTitle": "AI design assistant",
    "features.aiDesc":
      "Describe modifications or new features in natural language and watch the model update step by step.",
    "features.portableTitle": "Portable design data",
    "features.portableDesc":
      "Export to STEP, STL, and standard formats without vendor lock-in or proprietary walls.",
    "features.revisionsTitle": "Revision bookmarks",
    "features.revisionsDesc":
      "Named version checkpoints with visual thumbnails make rollbacks and design exploration effortless.",
    "features.collabTitle": "Team collaboration",
    "features.collabDesc":
      "Invite team members, assign permissions, and share workbench access across your organization.",
    "workflow.eyebrow": "A continuous workflow",
    "workflow.heading": "From initial sketch to manufacturing-ready part",
    "workflow.step1": "1. Constrained Sketching",
    "workflow.step1Desc":
      "Draft parametric sketches with dimensional constraints and geometric relationships.",
    "workflow.step2": "2. Feature Tree Modeling",
    "workflow.step2Desc":
      "Build 3D solids through an ordered, editable history of parametric operations.",
    "workflow.step3": "3. Verify & Export",
    "workflow.step3Desc":
      "Inspect measurements, check topology, and download clean STEP/STL assets.",
    "pricing.eyebrow": "Plans that match your momentum",
    "pricing.heading": "Start free, scale with your team",
    "pricing.seeDashboard": "See current plans in Dashboard",
    "pricing.freeTitle": "Free",
    "pricing.freeDesc":
      "Essential parametric CAD for individual makers and personal projects.",
    "pricing.proTitle": "Pro",
    "pricing.proDesc":
      "Unlimited workbenches, advanced AI assistance, and high-frequency revisions.",
    "pricing.teamTitle": "Team",
    "pricing.teamDesc":
      "Organization workspaces, member management, and dedicated capacity.",
    "cta.heading": "Ready to build without installation?",
    "cta.description":
      "Open WebCAD in any modern browser and start modeling in seconds.",
    "footer.desc":
      "Browser-based parametric CAD with cloud workbenches, durable history and AI-assisted editing.",
    "footer.copyright": "WebCAD. Modern parametric CAD in the browser.",
    "preferences.language": "Language",
    "preferences.themeToggle": "Toggle theme",
    "preferences.dark": "Dark",
    "preferences.light": "Light",
    "preferences.english": "English",
    "preferences.persian": "فارسی",
    "preferences.russian": "Русский",
  },
  fa: {
    "nav.features": "ویژگی‌ها",
    "nav.pricing": "قیمت‌گذاری",
    "nav.contact": "تماس",
    "nav.startDesigning": "شروع طراحی",
    "nav.signIn": "ورود",
    "hero.badge": "طراحی مهندسی، متصل و یکپارچه",
    "hero.engineTag": "موتور B-REP تحت مرورگر",
    "hero.title": "طراحی پارامتریک برای کارهایی",
    "hero.titleBreak": "که",
    "hero.titleAccent": "در حرکت‌اند.",
    "hero.description":
      "مدل‌های دقیق را در مرورگر خود بسازید، میزکارهای ابری و تاریخچه نسخه‌ها را یکپارچه نگه دارید و هر زمان که توصیف تغییر بعدی ساده‌تر از ساخت آن است از دستیار هوش مصنوعی بهره بگیرید.",
    "hero.startDesigning": "شروع طراحی",
    "hero.exploreCapabilities": "مشاهده قابلیت‌ها",
    "hero.specs": "طرح دوبعدی / مدلسازی / اصلاح / تاریخچه پارامتریک",
    "features.eyebrow": "شش قابلیت کلیدی",
    "features.heading": "طراحی‌شده برای فرآیندهای واقعی مهندسی",
    "features.brepTitle": "هندسه B-Rep پارامتریک در مرورگر",
    "features.brepDesc":
      "اکسترود، چرخش، لافت، فیلت و عملیات بولی با هندسه دقیق مبتنی بر وب‌اسمبلی.",
    "features.cloudTitle": "میزکارهای ابری",
    "features.cloudDesc":
      "هر قطعه توسط ذخیره‌سازی ابری پایدار با بارگذاری آنی و پروژه‌های امن پشتیبانی می‌شود.",
    "features.aiTitle": "دستیار هوشمند طراحی",
    "features.aiDesc":
      "تغییرات یا ویژگی‌های جدید را به زبان طبیعی توصیف کنید و به‌روزرسانی گام‌به‌گام مدل را مشاهده نمایید.",
    "features.portableTitle": "داده‌های طراحی قابل انتقال",
    "features.portableDesc":
      "خروجی به قالب‌های استاندارد STEP و STL بدون محدودیت مالکیت پلتفرم یا قفل نرم‌افزاری.",
    "features.revisionsTitle": "نشانه‌گذاری نسخه‌ها",
    "features.revisionsDesc":
      "نقاط عطف نام‌گذاری‌شده همراه با پیش‌نمایش بصری برای بازگشت و مقایسه آسان تغییرات.",
    "features.collabTitle": "همکاری تیمی",
    "features.collabDesc":
      "دعوت از اعضای تیم، تعیین سطوح دسترسی و اشتراک‌گذاری امن پروژه‌ها در سراسر سازمان.",
    "workflow.eyebrow": "یک جریان کاری پیوسته",
    "workflow.heading": "از طرح اولیه تا قطعه آماده ساخت",
    "workflow.step1": "۱. طرح دوبعدی مقید",
    "workflow.step1Desc":
      "ترسیم اسکچ‌های پارامتریک با قیدهای ابعادی و روابط هندسی دقیق.",
    "workflow.step2": "۲. مدلسازی با درخت ویژگی‌ها",
    "workflow.step2Desc":
      "ساخت حجم سه‌بعدی از طریق تاریخچه منظم، منسجم و قابل ویرایش دستورها.",
    "workflow.step3": "۳. اعتبارسنجی و استخراج",
    "workflow.step3Desc":
      "بررسی ابعاد، سنجش صحت توپولوژی و دانلود فایل‌های استاندارد STEP و STL.",
    "pricing.eyebrow": "پلن‌های متناسب با نیاز شما",
    "pricing.heading": "رایگان شروع کنید، با تیم خود رشد کنید",
    "pricing.seeDashboard": "مشاهده پلن‌های جاری در داشبورد",
    "pricing.freeTitle": "رایگان",
    "pricing.freeDesc":
      "امکانات ضروری مدلسازی پارامتریک برای سازندگان و پروژه‌های فردی.",
    "pricing.proTitle": "حرفه‌ای",
    "pricing.proDesc":
      "میزکارهای نامحدود، هوش مصنوعی پیشرفته و تاریخچه نسخه‌های نامحدود.",
    "pricing.teamTitle": "تیمی",
    "pricing.teamDesc":
      "فضای اختصاصی سازمانی، مدیریت دسترسی کاربران و ظرفیت پردازش اختصاصی.",
    "cta.heading": "آماده ساخت بدون نیاز به نصب نرم‌افزار هستید؟",
    "cta.description":
      "وب‌کد را در هر مرورگر مدرنی باز کنید و در چند ثانیه مدلسازی را آغاز نمایید.",
    "footer.desc":
      "مدلسازی پارامتریک مبتنی بر مرورگر همراه با میزکارهای ابری، تاریخچه پایدار و هوش مصنوعی.",
    "footer.copyright": "وب‌کد. مدلسازی نوین پارامتریک در بستر وب.",
    "preferences.language": "زبان",
    "preferences.themeToggle": "تغییر پوسته",
    "preferences.dark": "تیره",
    "preferences.light": "روشن",
    "preferences.english": "English",
    "preferences.persian": "فارسی",
    "preferences.russian": "Русский",
  },
  ru: {
    "nav.features": "Возможности",
    "nav.pricing": "Цены",
    "nav.contact": "Контакты",
    "nav.startDesigning": "Начать проектирование",
    "nav.signIn": "Войти",
    "hero.badge": "САПР на связи",
    "hero.engineTag": "ДВИЖОК B-REP В БРАУЗЕРЕ",
    "hero.title": "Параметрическое САПР для проектов,",
    "hero.titleBreak": "которые",
    "hero.titleAccent": "не стоят на месте.",
    "hero.description":
      "Создавайте точные модели в браузере, объединяйте облачные проекты с историей версий и используйте ИИ-ассистента, когда проще описать изменение, чем собрать его вручную.",
    "hero.startDesigning": "Начать проектирование",
    "hero.exploreCapabilities": "Все возможности",
    "hero.specs": "ЭСКИЗ / МОДЕЛЬ / ДОРАБОТКА / ПАРАМЕТРИЧЕСКАЯ ИСТОРИЯ",
    "features.eyebrow": "Шесть возможностей",
    "features.heading": "Создано для реальных инженерных задач",
    "features.brepTitle": "Параметрический B-Rep в браузере",
    "features.brepDesc":
      "Выдавливание, вращение, лофтинг, скругление и булевы операции на WebAssembly с точной граничной геометрией.",
    "features.cloudTitle": "Облачные верстаки",
    "features.cloudDesc":
      "Каждая деталь надежно сохраняется в облаке с мгновенной загрузкой и безопасными рабочими пространствами.",
    "features.aiTitle": "ИИ-ассистент проектирования",
    "features.aiDesc":
      "Описывайте изменения на естественном языке и наблюдайте пошаговую генерацию геометрии.",
    "features.portableTitle": "Переносимые данные проекта",
    "features.portableDesc":
      "Экспорт в STEP, STL и стандартные форматы без привязки к проприетарным экосистемам.",
    "features.revisionsTitle": "Закладки версий",
    "features.revisionsDesc":
      "Именованные контрольные точки с визуальным предпросмотром для быстрого анализа и отката изменений.",
    "features.collabTitle": "Командная работа",
    "features.collabDesc":
      "Приглашайте участников, настраивайте роли и управляйте общим доступом к проектам компании.",
    "workflow.eyebrow": "Непрерывный рабочий процесс",
    "workflow.heading": "От первого наброска до готовой детали",
    "workflow.step1": "1. Параметрический эскиз",
    "workflow.step1Desc":
      "Создавайте эскизы с размерными и геометрическими ограничениями.",
    "workflow.step2": "2. Дерево операций",
    "workflow.step2Desc":
      "Формируйте 3D-тела через упорядоченную и редактируемую историю операций.",
    "workflow.step3": "3. Проверка и экспорт",
    "workflow.step3Desc":
      "Проверяйте размеры, исследуйте топологию и скачивайте чистые файлы STEP и STL.",
    "pricing.eyebrow": "Тарифы под ваши задачи",
    "pricing.heading": "Начните бесплатно, масштабируйтесь с командой",
    "pricing.seeDashboard": "Посмотреть актуальные тарифы в панели управления",
    "pricing.freeTitle": "Бесплатный",
    "pricing.freeDesc":
      "Базовые возможности параметрического САПР для индивидуальных мейкеров и личных проектов.",
    "pricing.proTitle": "Про",
    "pricing.proDesc":
      "Неограниченные верстаки, продвинутый ИИ-ассистент и детальная история ревизий.",
    "pricing.teamTitle": "Командный",
    "pricing.teamDesc":
      "Рабочие пространства организации, управление доступом участников и выделенные мощности.",
    "cta.heading": "Готовы проектировать прямо сейчас?",
    "cta.description":
      "Откройте WebCAD в современном браузере и начните моделирование за считанные секунды.",
    "footer.desc":
      "Параметрический САПР в браузере с облачными верстаками, надежной историей и поддержкой ИИ.",
    "footer.copyright": "WebCAD. Современный параметрический САПР в браузере.",
    "preferences.language": "Язык",
    "preferences.themeToggle": "Переключить тему",
    "preferences.dark": "Тёмная",
    "preferences.light": "Светлая",
    "preferences.english": "English",
    "preferences.persian": "فارسی",
    "preferences.russian": "Русский",
  },
};
