const GuideLine: React.FC = () => {
  return (
    <div style={{ height: '8px' }}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="50" y2="10" stroke="black" />
        <line x1="50" y1="10" x2="250" y2="10" stroke="black" />
        <line x1="250" y1="10" x2="250" y2="1" stroke="black" />
      </svg>
    </div>
  );
};

export default GuideLine;
