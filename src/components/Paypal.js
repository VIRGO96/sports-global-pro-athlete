import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

function Paypal(props) {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: props.description,
                amount: {
                  currency_code: "USD",
                  value: props.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // props.setLoading(true);
          props.getPaypalDetail(order);
        },
        onError: (err) => {
          toast.warning(err.message);
          // props.setLoading(false);
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <>
      <div ref={paypal}></div>
    </>
  );
}

export default Paypal;
