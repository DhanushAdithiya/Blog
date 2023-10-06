import React from "react";

function Error({
  message,
  color: textColor,
}: {
  message: string;
  color: string;
}) {
  return (
    <div className="error-component">
      <h3 style={{ color: textColor }} className="error-msg">
        {message}
      </h3>
    </div>
  );
}

export default Error;
