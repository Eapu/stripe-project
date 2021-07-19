import { NextPage } from 'next';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
    const handleClick = async (event) => {
        // Call backend to create Checkout session.
        const { sessionId } = await fetch('/api/checkout/session', {
            method: 'POST',
            headers:{
                "content-type": "aplication/json"
            },
            body: JSON.stringify({quantity: 1})
        }).then(res => res.json())
        // redirect to Checkout after button clicked
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
    }
    console.log('handleClick', handleClick)
    return (
    <div>
        <h1>Checkout</h1>

      <button role="link" onClick={handleClick}>
      Checkout</button>
    </div>
    )
}
