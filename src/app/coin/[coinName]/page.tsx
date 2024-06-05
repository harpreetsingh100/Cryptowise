import React from "react";

const page = ({params}:{params:{coinName:string}}) => {
  return (
    <div>{params.coinName}</div>
  )
}

export default page