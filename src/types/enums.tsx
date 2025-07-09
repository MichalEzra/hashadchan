// enums.ts - זה הקובץ שאתה צריך לעדכן בצד הלקוח (frontend)

// הגדרת Enums עם מפתחות באנגלית וערכים שתואמים לשמות ה-Enum ב-C# (כולל קווים תחתונים)
export enum UserTypeDto {
  PARENT = "הורה",
  MATCHMAKER = "שדכן",
  ADMIN = "מנהל"
}
export enum UserType {
  PARENT = "PARENT",
  MATCHMAKER = "MATCHMAKER",
  ADMIN = "ADMIN",
  DEFAULT = "בחר סוג משתמש"
}

export enum Gender {
  ZACHOR = "זכר",
  NEKEVA = "נקבה",
};

// מפת תצוגה עבור מגדר
export const GenderDisplayMap: Record<Gender, string> = {
  [Gender.ZACHOR]: "גבר",
  [Gender.NEKEVA]: "אישה",
};


export enum Status {
  RAVAK_H = "רווק/ה",
  GARUSH_H = "גרוש/ה",
  ALMAN_H = "אלמן/ה",
  GARUSH_H_IM_YELADIM = "גרוש/ה עם ילדים",
  ALMAN_H_IM_YELADIM = "אלמן/ה עם ילדים",
};

export const CandidateStatusDisplayMap: Record<Status, string> = {
  [Status.RAVAK_H]: "רווק/ה",
  [Status.GARUSH_H]: "גרוש/ה",
  [Status.ALMAN_H]: "אלמן/ה",
  [Status.GARUSH_H_IM_YELADIM]: "גרוש/ה עם ילדים",
  [Status.ALMAN_H_IM_YELADIM]: "אלמן/ה עם ילדים",
};

export enum candidateSector {
  HASIDI = "חסידי",
  LITAI = "ליטאי",
  SEFARDI = "ספרדי",
  TEIMANI = "תימני",
  CHABAD = "חבד",
  HETZI_HETZI = "חצי חצי",
  ACHER = "אחר",
};
export const SectorDisplayMap: Record<candidateSector, string> = {
  [candidateSector.HASIDI]: "חסידי",
  [candidateSector.LITAI]: "ליטאי",
  [candidateSector.SEFARDI]: "ספרדי",
  [candidateSector.TEIMANI]: "תימני",
  [candidateSector.CHABAD]: "חבד",
  [candidateSector.HETZI_HETZI]: "חצי חצי",
  [candidateSector.ACHER]: "אחר",
};

export enum SubSector {
  YESHIVATI = "ישיבתי",
  BNEI_TORAH_ETZ = "בני תורה עץ",
  BALEI_TSHUVA = "בעלי תשובה",
  YERUSHALMI = "ירושלמי",
  HAREDI_MODERNI = "חרדי מודרני",
  CHUTZNIKIM = "חוצניקים",
  CHAZONAISHNIK = "חזונאישניק",
  ZILBERMAN = "זילברמן",
  REKA_HASIDI = "רקע חסידי",
  ACHER = "אחר",
};
export const SubSectorDisplayMap: Record<SubSector, string> = {
  [SubSector.YESHIVATI]: "ישיבתי",
  [SubSector.BNEI_TORAH_ETZ]: "בני תורה עץ",
  [SubSector.BALEI_TSHUVA]: "בעלי תשובה",
  [SubSector.YERUSHALMI]: "ירושלמי",
  [SubSector.HAREDI_MODERNI]: "חרדי מודרני",
  [SubSector.CHUTZNIKIM]: "חוצניקים",
  [SubSector.CHAZONAISHNIK]: "חזונאישניק",
  [SubSector.ZILBERMAN]: "זילברמן",
  [SubSector.REKA_HASIDI]: "רקע חסידי",
  [SubSector.ACHER]: "אחר",
};

export enum TorahStudy {
  TORATO_OMANUTO = "תורתו אומנותו",
  HETZI_OVED_HETZI_LOMED = "חצי עובד חצי לומד",
  KOVEA_ITIM = "קובע עיתים",
};
export const TorahStudyDisplayMap: Record<TorahStudy, string> = {
  [TorahStudy.TORATO_OMANUTO]: "תורתו אומנותו",
  [TorahStudy.HETZI_OVED_HETZI_LOMED]: "חצי עובד חצי לומד",
  [TorahStudy.KOVEA_ITIM]: "קובע עיתים",
};

export enum EducationInstitution {
  YESHIVA_KTANA = "ישיבה קטנה",
  YESHIVA_GDOLA = "ישיבה גדולה",
  KIBBUTZ = "קיבוץ",
  TIKHON = "תיכון",
  SEMINAR = "סמינר",
  MIKHLALA = "מכללה",
  UNIVERSITA = "אוניברסיטה",
  KOLLEL = "כולל",
};
export const EducationInstitutionDisplayMap: Record<EducationInstitution, string> = {
  [EducationInstitution.YESHIVA_KTANA]: "ישיבה קטנה",
  [EducationInstitution.YESHIVA_GDOLA]: "ישיבה גדולה",
  [EducationInstitution.KIBBUTZ]: "קיבוץ",
  [EducationInstitution.TIKHON]: "תיכון",
  [EducationInstitution.SEMINAR]: "סמינר",
  [EducationInstitution.MIKHLALA]: "מכללה",
  [EducationInstitution.UNIVERSITA]: "אוניברסיטה",
  [EducationInstitution.KOLLEL]: "כולל",
};

export enum Occupation {
  LOMED = "לומד/ת",
  OVED = "עובד/ת",
};
export const OccupationDisplayMap: Record<Occupation, string> = {
  [Occupation.LOMED]: "לומד/ת",
  [Occupation.OVED]: "עובד/ת",
};

export enum Language {
  ENGLISH = "אנגלית",
  HEBREW = "עברית",
  YIDDISH = "אידיש",
  FRENCH = "צרפתית",
  SPANISH = "ספרדית",
  RUSSIAN = "רוסית",
};
export const LanguageDisplayMap: Record<Language, string> = {
  [Language.ENGLISH]: "אנגלית",
  [Language.HEBREW]: "עברית",
  [Language.YIDDISH]: "אידיש",
  [Language.FRENCH]: "צרפתית",
  [Language.SPANISH]: "ספרדית",
  [Language.RUSSIAN]: "רוסית",
};

export enum Openness {
  SHAMUR_MEOD = "שמור/ה מאוד",
  SHAMRAN = "שמרן/נית",
  MASORTI = "מסורתי/ת",
  SHAMUR_V_ROSH_PATUACH = "שמור/ה וראש פתוח",
  PATUACH = "פתוח",
  MODERNI = "מודרני/ת",
  MODERNI_MEOD = "מודרני/ת מאוד",
};
export const OpennessDisplayMap: Record<Openness, string> = {
  [Openness.SHAMUR_MEOD]: "שמור/ה מאד",
  [Openness.SHAMRAN]: "שמרן/נית",
  [Openness.MASORTI]: "מסורתי", // תיקון כאן להתאמה לתצוגה שסופקה בעבר
  [Openness.SHAMUR_V_ROSH_PATUACH]: "שמור/ה וראש פתוח",
  [Openness.PATUACH]: "פתוח/ה",
  [Openness.MODERNI]: "מודרני/ת",
  [Openness.MODERNI_MEOD]: "מודרני/ת מאד",
};

export enum HeadCovering {
  PEA_BILVAD = "עקרוני - פאה",
  MITPACHAT_BILVAD = "עקרוני - מטפחת",
  PEA_IM_KISUI = "פאה + כיסוי מעל",
  TOP_LACE = "פאה טופ לייס",
  GAMISH = "גמיש - מטפחת או פאה",
};
export const HeadCoveringDisplayMap: Record<HeadCovering, string> = {
  [HeadCovering.PEA_BILVAD]: "עקרוני - פאה",
  [HeadCovering.MITPACHAT_BILVAD]: "עקרוני - מטפחת",
  [HeadCovering.PEA_IM_KISUI]: "פאה + כיסוי מעל",
  [HeadCovering.TOP_LACE]: "פאה טופ לייס",
  [HeadCovering.GAMISH]: "גמיש - מטפחת או פאה",
};

export enum PhoneType {
  KOSHER = "כשר",
  TOMACH_KOSHER = "תומך כשר",
  MAKHSHIR_MUGAN = "מכשיר מוגן",
  SMARTPHONE = "סמארטפון",
  FLAFON_MAKASHIM_IM_SMS = "פלאפון מקשים עם SMS",
  TELEFON_MUGAN_LA_AVODA = "טלפון מוגן לעבודה",
  SHNEI_TELEFONIM = "שני טלפונים",
};
export const PhoneTypeDisplayMap: Record<PhoneType, string> = {
  [PhoneType.KOSHER]: "כשר",
  [PhoneType.TOMACH_KOSHER]: "תומך כשר",
  [PhoneType.MAKHSHIR_MUGAN]: "מכשיר מוגן (הדרן וכדומה)",
  [PhoneType.SMARTPHONE]: "מכשיר חכם",
  [PhoneType.FLAFON_MAKASHIM_IM_SMS]: "פלאפון מקשים עם SMS בלבד",
  [PhoneType.TELEFON_MUGAN_LA_AVODA]: "פלאפון מוגן לצרכי עבודה",
  [PhoneType.SHNEI_TELEFONIM]: "שני טלפונים",
};

export enum ParentsStatus {
  NESUIM = "נשואים",
  GRUSHIM = "גרושים",
  AV_NIFTAR = "אב נפטר",
  EM_NIFTARA = "אם נפטרה",
  SHNEIHEM_NIFTARU = "אינם בין החיים",
};
export const ParentsStatusDisplayMap: Record<ParentsStatus, string> = {
  [ParentsStatus.NESUIM]: "נשואים",
  [ParentsStatus.GRUSHIM]: "גרושים",
  [ParentsStatus.AV_NIFTAR]: "אב נפטר",
  [ParentsStatus.EM_NIFTARA]: "אם נפטרה",
  [ParentsStatus.SHNEIHEM_NIFTARU]: "אינם בין החיים",
};

export enum Smoking {
  MEASHEN = "מעשן",
  MEASHEN_LE_ITIM_RECHOKOT = "מעשן לעיתים רחוקות",
  LO_MEASHEN = "לא מעשן בכלל",
  SIGARIA_ELEKTRONIT = "מעשן סיגריה אלקטרונית בלבד",
};
export const SmokingDisplayMap: Record<Smoking, string> = {
  [Smoking.MEASHEN]: "מעשן",
  [Smoking.MEASHEN_LE_ITIM_RECHOKOT]: "מעשן רק באירועים מיוחדים - תדירות נמוכה",
  [Smoking.LO_MEASHEN]: "לא מעשן בכלל",
  [Smoking.SIGARIA_ELEKTRONIT]: "מעשן סיגריה אלקטרונית בלבד",
};

export enum Physique {
  RAZE_MEOD = "רזה מאוד",
  RAZE = "רזה",
  MEMUTZA_T = "ממוצע/ת",
  MALE_H = "מלא/ה",
};
export const PhysiqueDisplayMap: Record<Physique, string> = {
  [Physique.RAZE_MEOD]: "רזה מאד",
  [Physique.RAZE]: "רזה",
  [Physique.MEMUTZA_T]: "ממוצע/ת",
  [Physique.MALE_H]: "מלא/ה",
};

export enum SkinTone {
  BAHIR = "בהיר",
  NOTE_LE_BAHIR = "נוטה_לבהיר",
  SHAZUF = "שזוף",
  NOTE_LE_KEHA = "נוטה_לכהה",
  KEHA = "כהה",
};
export const SkinToneDisplayMap: Record<SkinTone, string> = {
  [SkinTone.BAHIR]: "בהיר",
  [SkinTone.NOTE_LE_BAHIR]: "נוטה לבהיר",
  [SkinTone.SHAZUF]: "שזוף",
  [SkinTone.NOTE_LE_KEHA]: "נוטה לכהה",
  [SkinTone.KEHA]: "כהה",
};

export enum HairColor {
  HUM = "חום",
  SHAHOR = "שחור",
  SHATANI = "שטני",
  BLONDI = "בלונדי",
  GINGI = "גינגי",
};
export const HairColorDisplayMap: Record<HairColor, string> = {
  [HairColor.HUM]: "חום",
  [HairColor.SHAHOR]: "שחור",
  [HairColor.SHATANI]: "שטני",
  [HairColor.BLONDI]: "בלונדיני",
  [HairColor.GINGI]: "ג'ינג'י",
};

export enum ClothingStyle {
  MODERNI = "מודרני",
  ADKANI = "עדכני",
  MECHUBAD = "מכובד",
  KLASI = "קלאסי",
  PASHUT = "פשוט",
  PASHUT_MEOD = "פשוט מאוד",
};
export const ClothingStyleDisplayMap: Record<ClothingStyle, string> = {
  [ClothingStyle.MODERNI]: "מודרני",
  [ClothingStyle.ADKANI]: "עדכני",
  [ClothingStyle.MECHUBAD]: "מכובד",
  [ClothingStyle.KLASI]: "קלאסי",
  [ClothingStyle.PASHUT]: "פשוט",
  [ClothingStyle.PASHUT_MEOD]: "פשוט מאד",
};
