export enum Gender {
  MALE = "גבר",
  FEMALE = "אישה",
};

export enum Status {
  SINGLE = "רווק/ה",
  DIVORCED = "גרוש/ה",
  WIDOWED = "אלמן/ה",
  DIVORCED_WITH_KIDS = "גרוש/ה עם ילדים",
  WIDOWED_WITH_KIDS = "אלמן/ה עם ילדים",
};

export enum Sector {
  HASIDI = "חסידי",
  LITAI = "ליטאי",
  SEFARDI = "ספרדי",
  TEIMANI = "תימני",
  CHABAD = "חבד",
  HALF_HALF = "חצי חצי",
  OTHER = "אחר",
};

export enum SubSector {
  YESHIVISH = "ישיבתי",
  BNEI_TORAH_ETZ = "בני תורה עץ",
  BALEI_TSHUVA = "בעלי תשובה",
  YERUSHALMI = "ירושלמי",
  MODERN_HAREDI = "חרדי מודרני",
  CHUTZNIKIM = "חוצניקים",
  CHAZON_ISH = "חזונאישניקים",
  ZILBERMAN = "זילברמן",
  CHASIDIC_BACKGROUND = "רקע חסידי",
  OTHER = "אחר",
};

export enum TorahStudy {
  FULL_TIME = "תורתו אומנתו",
  HALF_HALF = "חצי עובד חצי לומד",
  PART_TIME = "קובע עיתים לתורה",
};

export enum EducationInstitution {
  YESHIVA_KTANA = "ישיבה קטנה",
  YESHIVA_GDOLA = "ישיבה גדולה",
  KIBBUTZ = "קיבוץ",
  HIGH_SCHOOL = "תיכון",
  COLLEGE = "מכללה",
  UNIVERSITY = "אוניברסיטה",
  KOLLEL = "כולל",
};

export enum Occupation {
  STUDENT = "לומד/ת",
  WORKING = "עובד/ת",
};

export enum Language {
  ENGLISH = "אנגלית",
  HEBREW = "עברית",
  YIDDISH = "אידיש",
  FRENCH = "צרפתית",
  SPANISH = "ספרדית",
  RUSSIAN = "רוסית",
};

export enum Openness {
  VERY_STRICT = "שמור/ה מאד",
  CONSERVATIVE = "שמרן/נית",
  TRADITIONAL = "שמור/ה",
  OPEN_TRADITIONAL = "שמור/ה וראש פתוח",
  OPEN = "פתוח/ה",
  MODERN = "מודרני/ת",
  VERY_MODERN = "מודרני/ת מאד",
};

export enum HeadCovering {
  WIG_ONLY = "עקרוני - פאה",
  SCARF_ONLY = "עקרוני - מטפחת",
  WIG_WITH_COVER = "פאה + כיסוי מעל",
  TOP_LACE_WIG = "פאה טופ לייס",
  FLEXIBLE = "גמיש - מטפחת או פאה",
};

export enum PhoneType {
  KOSHER = "כשר",
  SUPPORTS_KOSHER = "תומך כשר",
  SECURE_DEVICE = "מכשיר מוגן (הדרן וכדומה)",
  SMARTPHONE = "מכשיר חכם",
  BUTTON_PHONE_SMS = "פלאפון מקשים עם SMS בלבד",
  WORK_PHONE = "פלאפון מוגן לצרכי עבודה",
  TWO_PHONES = "שני טלפונים",
};

export enum ParentsStatus {
  MARRIED = "נשואים",
  DIVORCED = "גרושים",
  FATHER_DECEASED = "אב נפטר",
  MOTHER_DECEASED = "אם נפטרה",
  BOTH_DECEASED = "אינם בין החיים",
};

export enum Smoking {
  SMOKER = "מעשן",
  OCCASIONAL_SMOKER = "מעשן רק באירועים מיוחדים - תדירות נמוכה",
  NON_SMOKER = "לא מעשן בכלל",
  ELECTRONIC_CIGARETTE = "מעשן סיגריה אלקטרונית בלבד",
};

export enum Physique {
  VERY_THIN = "רזה מאד",
  THIN = "רזה",
  AVERAGE = "ממוצע/ת",
  FULL = "מלא/ה",
};

export enum SkinTone {
  FAIR = "בהיר",
  FAIR_TO_MEDIUM = "נוטה לבהיר",
  TAN = "שזוף",
  MEDIUM_TO_DARK = "נוטה לכהה",
  DARK = "כהה",
};

export enum HairColor {
  BROWN = "חום",
  BLACK = "שחור",
  DIRTY_BLONDE = "שטני",
  BLONDE = "בלונדי",
  REDHEAD = "ג'ינג'י",
};

export enum ClothingStyle {
  MODERN = "מודרני",
  TRENDY = "עדכני",
  ELEGANT = "מכובד",
  CLASSIC = "קלאסי",
  SIMPLE = "פשוט",
  VERY_SIMPLE = "פשוט מאד",
};

// export enum Status {
//   SINGLE = "רווק/ה",
//   DIVORCED = "גרוש/ה",
//   WIDOWED = "אלמן/ה",
//   DIVORCED_WITH_KIDS = "גרוש/ה עם ילדים",
//   WIDOWED_WITH_KIDS = "אלמן/ה עם ילדים",
// };

// export enum Sector {
//   HASIDI = "חסידי",
//   LITAI = "ליטאי",
//   SEFARDI = "ספרדי",
//   TEIMANI = "תימני",
//   CHABAD = "חבד",
//   HALF_HALF = "חצי חצי",
//   OTHER = "אחר",
// };

// export enum SubSector {
//   YESHIVISH = "ישיבתי",
//   BNEI_TORAH_ETZ = "בני תורה עץ",
//   BALEI_TSHUVA = "בעלי תשובה",
//   YERUSHALMI = "ירושלמי",
//   MODERN_HAREDI = "חרדי מודרני",
//   CHUTZNIKIM = "חוצניקים",
//   CHAZON_ISH = "חזונאישניקים",
//   ZILBERMAN = "זילברמן",
//   CHASIDIC_BACKGROUND = "רקע חסידי",
//   OTHER = "אחר",
// };

// export enum TorahStudy {
//   FULL_TIME = "תורתו אומנתו",
//   HALF_HALF = "חצי עובד חצי לומד",
//   PART_TIME = "קובע עיתים לתורה",
// };

// export enum EducationInstitution {
//   YESHIVA_KTANA = "ישיבה קטנה",
//   YESHIVA_GDOLA = "ישיבה גדולה",
//   KIBBUTZ = "קיבוץ",
//   HIGH_SCHOOL = "תיכון",
//   COLLEGE = "מכללה",
//   UNIVERSITY = "אוניברסיטה",
//   KOLLEL = "כולל",
// };

// export enum Occupation {
//   STUDENT = "לומד/ת",
//   WORKING = "עובד/ת",
// };

// export enum Language {
//   ENGLISH = "אנגלית",
//   HEBREW = "עברית",
//   YIDDISH = "אידיש",
//   FRENCH = "צרפתית",
//   SPANISH = "ספרדית",
//   RUSSIAN = "רוסית",
// };

// export enum Openness {
//   VERY_STRICT = "שמור/ה מאד",
//   CONSERVATIVE = "שמרן/נית",
//   TRADITIONAL = "שמור/ה",
//   OPEN_TRADITIONAL = "שמור/ה וראש פתוח",
//   OPEN = "פתוח/ה",
//   MODERN = "מודרני/ת",
//   VERY_MODERN = "מודרני/ת מאד",
// };

// export enum HeadCovering {
//   WIG_ONLY = "עקרוני - פאה",
//   SCARF_ONLY = "עקרוני - מטפחת",
//   WIG_WITH_COVER = "פאה + כיסוי מעל",
//   TOP_LACE_WIG = "פאה טופ לייס",
//   FLEXIBLE = "גמיש - מטפחת או פאה",
// };

// export enum PhoneType {
//   KOSHER = "כשר",
//   SUPPORTS_KOSHER = "תומך כשר",
//   SECURE_DEVICE = "מכשיר מוגן (הדרן וכדומה)",
//   SMARTPHONE = "מכשיר חכם",
//   BUTTON_PHONE_SMS = "פלאפון מקשים עם SMS בלבד",
//   WORK_PHONE = "פלאפון מוגן לצרכי עבודה",
//   TWO_PHONES = "שני טלפונים",
// };

// export enum ParentsStatus {
//   MARRIED = "נשואים",
//   DIVORCED = "גרושים",
//   FATHER_DECEASED = "אב נפטר",
//   MOTHER_DECEASED = "אם נפטרה",
//   BOTH_DECEASED = "אינם בין החיים",
// };

// export enum Smoking {
//   SMOKER = "מעשן",
//   OCCASIONAL_SMOKER = "מעשן רק באירועים מיוחדים - תדירות נמוכה",
//   NON_SMOKER = "לא מעשן בכלל",
//   ELECTRONIC_CIGARETTE = "מעשן סיגריה אלקטרונית בלבד",
// };

// export enum Physique {
//   VERY_THIN = "רזה מאד",
//   THIN = "רזה",
//   AVERAGE = "ממוצע/ת",
//   FULL = "מלא/ה",
// };

// export enum SkinTone {
//   FAIR = "בהיר",
//   FAIR_TO_MEDIUM = "נוטה לבהיר",
//   TAN = "שזוף",
//   MEDIUM_TO_DARK = "נוטה לכהה",
//   DARK = "כהה",
// };

// export enum HairColor {
//   BROWN = "חום",
//   BLACK = "שחור",
//   DIRTY_BLONDE = "שטני",
//   BLONDE = "בלונדי",
//   REDHEAD = "ג'ינג'י",
// };

// export enum ClothingStyle {
//   MODERN = "מודרני",
//   TRENDY = "עדכני",
//   ELEGANT = "מכובד",
//   CLASSIC = "קלאסי",
//   SIMPLE = "פשוט",
//   VERY_SIMPLE = "פשוט מאד",
// };