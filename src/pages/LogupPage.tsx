import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/store";
// import { register } from "../services/auth.service"; // תייבאי את שירות ההרשמה שלך
// import { setUser } from "../redux/auth/auth.slice";
// import { setSession } from "../auth/auth.utils";

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: string;
    gender: string;
    phone?: string;
    city?: string;
}

export default function RegisterPage() {
    const [userData, setUserData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        phone: '',
        city: ''
    });

    const [errors, setErrors] = useState<Partial<RegisterData>>({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
        
        // נקה שגיאות כשהמשתמש מתחיל להקליד
        if (errors[name as keyof RegisterData]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterData> = {};

        if (!userData.firstName.trim()) {
            newErrors.firstName = 'שם פרטי נדרש';
        }

        if (!userData.lastName.trim()) {
            newErrors.lastName = 'שם משפחה נדרש';
        }

        if (!userData.email.trim()) {
            newErrors.email = 'אימייל נדרש';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'אימייל לא תקין';
        }

        if (!userData.password) {
            newErrors.password = 'סיסמה נדרשת';
        } else if (userData.password.length < 6) {
            newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
        }

        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = 'הסיסמאות לא תואמות';
        }

        if (!userData.age) {
            newErrors.age = 'גיל נדרש';
        } else if (parseInt(userData.age) < 18 || parseInt(userData.age) > 120) {
            newErrors.age = 'גיל לא תקין';
        }

        if (!userData.gender) {
            newErrors.gender = 'יש לבחור מין';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        try {
            // כאן תקרא לשירות ההרשמה שלך
            console.log('נתוני הרשמה:', userData);
            
            // const authUser = await register(userData);
            // dispatch(setUser(authUser.user));
            // setSession(authUser);
            
            // הודעת הצלחה או ניתוב לעמוד הבא
            alert('הרשמה הושלמה בהצלחה!');
            
        } catch (error) {
            console.error('שגיאה בהרשמה:', error);
            alert('שגיאה בהרשמה. אנא נסה שוב.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4" dir="rtl">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">הרשמה</h1>
                    <p className="text-gray-600 mt-2">צור חשבון חדש במערכת השידוכים</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* שם פרטי ומשפחה */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                שם פרטי *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="שם פרטי"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                שם משפחה *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="שם משפחה"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* אימייל */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            אימייל *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* גיל ומין */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                גיל *
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={userData.age}
                                onChange={handleChange}
                                min="18"
                                max="120"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.age ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="גיל"
                            />
                            {errors.age && (
                                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                מין *
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.gender ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">בחר מין</option>
                                <option value="male">זכר</option>
                                <option value="female">נקבה</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                            )}
                        </div>
                    </div>

                    {/* טלפון ועיר (אופציונלי) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                טלפון
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="050-1234567"
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                עיר
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={userData.city}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="עיר מגורים"
                            />
                        </div>
                    </div>

                    {/* סיסמה */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            סיסמה *
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="סיסמה (לפחות 6 תווים)"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* אישור סיסמה */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            אישור סיסמה *
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="אישור סיסמה"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* כפתור הרשמה */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-md font-semibold text-white transition duration-200 ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        }`}
                    >
                        {isLoading ? 'מבצע הרשמה...' : 'הירשם'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        כבר יש לך חשבון?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            התחבר כאן
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}