import "./LinkButton.css";
import { useNavigate } from "react-router-dom";

export const LinkButton = ({ path, title, disabled }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`linkButtonDesign ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? () => navigate(path) : undefined}
    >
      {title}
    </div>
  );
};
