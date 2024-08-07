const ConverterTime = () => {
  const now = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // or false for 24-hour format
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    now
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    now
  );

  return (
    <div>
      <h3>Online currency converter</h3>
      <p className="mt-2">
        <span> {formattedDate}</span>
        <span className="ml-2">{formattedTime}</span>
      </p>
    </div>
  );
};

export default ConverterTime;
