import React, { useEffect, useState } from "react";
import { TweenLite } from "gsap";

const myObject = {
  totalValue: 0
};

const Number = props => {
  const [total, setTotal] = useState(props.number);
  useEffect(() => {
    TweenLite.to(myObject, 0.5, {
      totalValue: props.number,
      roundProps: "totalValue",
      onUpdate: () => {
        setTotal(myObject.totalValue);
      }
    });
  }, [props.number]);
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 alert alert-dark text-center">
        {total}
      </div>
    </div>
  );
};

export default Number;
