import './SectionHeader.css';

const SectionHeader = ({ label, title, subtitle, ornament = '❋' }) => {
  return (
    <div className="text-center">
      <div className="section-label">{label}</div>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
      <div className="ornament"><span>{ornament}</span></div>
    </div>
  );
};

export default SectionHeader;
