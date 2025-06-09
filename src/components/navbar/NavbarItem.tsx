import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  label: string;
  to: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
