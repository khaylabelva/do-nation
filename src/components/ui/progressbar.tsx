interface ProgressBarProps {
    value: number; // The progress percentage (0-100)
}
  
const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    return (
        <div className="w-full bg-gray-300 rounded-full h-4">
        <div
            className="bg-[#4C84F6] h-4 rounded-full transition-all duration-300"
            style={{ width: `${value}%` }}
        ></div>
        </div>
    );
};

export default ProgressBar;
