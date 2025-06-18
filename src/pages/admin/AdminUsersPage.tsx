import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useAppSelector } from '../store/hooks'; // הנחת בסיס שיש רדאקס
import { useNavigate } from 'react-router-dom';

const AllUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const token = useAppSelector(state => state.auth.token); // הנחה שיש טוקן
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('/api/users', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => setUsers(res.data))
//     .catch(err => console.error('שגיאה בשליפת המשתמשים', err));
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('האם את בטוחה שברצונך למחוק את המשתמש?')) return;
//     try {
//       await axios.delete(`/api/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUsers(users.filter(user => user.id !== id));
//     } catch (error) {
//       console.error('שגיאה במחיקה', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">רשימת משתמשים</h1>
//       <div className="grid gap-4">
//         {users.map(user => (
//           <div key={user.id} className="border rounded-lg p-4 shadow bg-white flex justify-between items-center">
//             <div>
//               <p><strong>שם:</strong> {user.name}</p>
//               <p><strong>אימייל:</strong> {user.email}</p>
//               <p><strong>סוג משתמש:</strong> {user.userType}</p>
//               {/* תוסיפי פה עוד שדות כמו phone, sector וכו' לפי המודל שלך */}
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => navigate(`/edit-user/${user.id}`)} className="bg-blue-500 text-white px-3 py-1 rounded">עריכה</button>
//               <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">מחיקה</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
};

export default AllUsersPage;
