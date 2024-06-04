import React from "react";

const page = ({params}) => {
  return (
    <div>{params.coinName}</div>
  )
}

export default page