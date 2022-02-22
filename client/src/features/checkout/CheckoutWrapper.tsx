import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LoadingComponent from "../../app/layout/LoadingComponent";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51KUIElFvv63IwNskqdSjOOCOfXbl776KZd2z01ia0ZdV6Ez3ONWp8zpvfKjII7kQMG26hZYzEd1apbpeBjAeZksv00T1J42ZCr')

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [dispatch]);

  if (loading) return <LoadingComponent message='Loading checkout...' />

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  )
}