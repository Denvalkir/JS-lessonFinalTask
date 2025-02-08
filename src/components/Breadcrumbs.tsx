import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  items: { label: string; path: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav>
      <ul className="breadcrumbs">
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
            {index < items.length - 1 && " > "}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
