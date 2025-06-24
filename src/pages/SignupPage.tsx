import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { User } from "../types/user.types";
import { addUser } from "../services/user.service";
import { useNavigate } from "react-router";

interface DecodedToken {
  userId: string;
  userType: string;
  exp: number;
}
export default function Signup() {
    

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        userType: "PARENT"

    });
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<Partial<User>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
        
        // נקה שגיאות כשהמשתמש מתחיל להקליד
        if (errors[name as keyof User]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<User> = {};

        if (!userData.fullName.trim()) {
            newErrors.fullName = 'שם מלא נדרש';
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
            console.log('שולחת לשרת:', userData);
            const response = await addUser(userData as Omit<User, 'id'>); 
            // const token = response.;
                console.log(userData)
            setUserData({fullName: "", email: "", password: "", phoneNumber: "", userType: ""});
            navigate("/"); // מעבר לעמוד הבית
        }
        catch (error) {
        console.error('שגיאה בהרשמה:', error);
        alert('שגיאה בהרשמה. אנא נסה שוב.');
        } finally {
        setIsLoading(false);
        }
    
// const handleClick = () => {
//     console.log(userData); // שלח לשרת
//     setIsLoading(true);

//     setTimeout(() => {
//         setIsLoading(false);
//         alert('ההרשמה הושלמה!');
//     }, 2000);
// };
    }
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
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                שם מלא *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={userData.fullName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="שם מלא"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
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

                    {/* טלפון ועיר (אופציונלי) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                טלפון
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="050-1234567"
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
                        <div>
                    <div>
                        <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                            סוג משתמש *
                        </label>
                        <select
                            id="userType"
                            name="userType"
                            value={userData.userType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">בחר סוג משתמש</option>
                            <option value="ADMIN">Admin</option>
                            <option value="MATCHMAKER">Matchmaker</option>
                            <option value="PARENT">Parent</option>
                        </select>
                        {errors.userType && (
                            <p className="text-red-500 text-xs mt-1">{errors.userType}</p>
                        )}
                        </div>
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
