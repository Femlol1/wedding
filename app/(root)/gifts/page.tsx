// pages/gifts.js

const Gifts = () => {
  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-4xl font-semibold text-center">Gifts</h1>
      <p className="mt-4 text-lg text-center">
        Your presence at our wedding is the greatest gift we could ask for. If you would like to
        contribute further, a cash gift towards our honeymoon or our new home would be greatly appreciated.
        Thank you for your love and support.
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Bank Details</h2>
        <div className="mt-4 space-y-3">
          <div>
            <h3 className="font-semibold">United States</h3>
            <p>Please contact us directly for details.</p>
          </div>
          <div>
            <h3 className="font-semibold">United Kingdom</h3>
            <p>Name on the account: Ope Osibemekun <br />
                Sort code: 30-65-85 <br />
            Account number: 44706068</p>
          </div>
          <div>
            <h3 className="font-semibold">Nigeria</h3>
            <p>Please contact us directly for details.</p>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Stripe/PayPal</h2>
        <p className="mt-4">For convenience, you can also use Stripe or PayPal. Links will be provided directly to registered guests.</p>
      </div>
    </div>
  );
}

export default Gifts;
