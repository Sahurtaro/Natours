import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51MTo0vGijbV7hJ3WXnX8r3AUFpvpyo0s5pSQmTDgts9Zj0XKoY2dLvUqFaKVsrmLXi3XtSOwgVUwW7HKz8TdzA7e008VPSj9ht'
);

export const bookTour = async (tourId) => {
  try {
    // const stripe = Stripe(
    //   'pk_test_51MTo0vGijbV7hJ3WXnX8r3AUFpvpyo0s5pSQmTDgts9Zj0XKoY2dLvUqFaKVsrmLXi3XtSOwgVUwW7HKz8TdzA7e008VPSj9ht'
    // );
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
