# E-STR — אתר שיווקי

אתר סטטי (HTML/CSS/JS, בלי build) לפי האפיון העיצובי.

- `index.html` — עמוד ראשי
- `contact.html` — דף נחיתה "בוא נדבר" עם טופס לידים

## Supabase

הטופס שומר לידים בטבלה `public.estr_leads` (פרויקט Supabase: *Be healthy with nature*).

- ב-`js/config.js` יש רק את ה-URL ואת המפתח הציבורי (publishable). זה בטוח לחשיפה בדפדפן.
- **לעולם לא להכניס לקוד את מפתח ה-`service_role` / secret.**
- RLS פעיל: הגולש יכול רק להוסיף ליד (INSERT), ואינו יכול לקרוא, לעדכן או למחוק.
- את הלידים רואים ב-Supabase Dashboard → Table Editor → `estr_leads`.

## הרצה מקומית

פותחים את `index.html` בדפדפן, או מגישים את התיקייה בכל שרת סטטי.
