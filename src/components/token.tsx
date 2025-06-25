// פונקציה פשוטה לפענוח JWT בלי ספריות חיצוניות
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const MyComponent = () => {
  // קבלת הטוקן מהלוקאל-סטורג'
  const token = localStorage.getItem('token');

  // אם יש טוקן - מפענחים
  const user = token ? parseJwt(token) : null;

  return (
    <div>
      {user ? (
        <p>שלום {user.fullName || user.name || 'משתמש'}!</p>
      ) : (
        <p>אין משתמש מחובר</p>
      )}
    </div>
  );
};

export default MyComponent;
