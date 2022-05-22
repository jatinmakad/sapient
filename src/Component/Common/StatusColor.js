import React from "react";

const StatusColor = ({ status }) => {
  const style =
    "text-white rounded-md flex items-center p-1 w-3/4 justify-center";
  return status === "Pending" ? (
    <p className={`bg-yellow-600 ${style}`}>{status}</p>
  ) : status === "Completed" ? (
    <p className={`bg-green-700 ${style}`}>{status}</p>
  ) : status === "On Going" ? (
    <p className={`bg-red-600 ${style}`}>{status}</p>
  ) : (
    ""
  );
};

export default StatusColor;
