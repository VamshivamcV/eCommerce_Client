interface ButtonProps {
    onClick: () => void;
    label: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ onClick, label }) => (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-lg hover:rounded-2xl"
    >
      {label}
    </button>
  );
  
  export default Button;