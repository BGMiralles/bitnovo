import "./LinkButton.css";
import { useNavigate } from "react-router-dom";

export const LinkButton = ({ path, title, disabled, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate(path);
      onClick && onClick();
    }
  };

  return (
    <div
      className={`linkButtonDesign ${disabled ? "disabled" : ""}`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};
