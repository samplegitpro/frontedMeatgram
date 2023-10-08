import React from 'react';
import './FAQPage.css';

function FAQPage() {
  return (
    <div className="main-container-faqs">
      <div className="headind-faqs">
        <h1>Frequently Asked Questions (FAQs)</h1>
      </div>

      <div className="quetion-faqs">
      <div className="faq-container">
        <details open>
          <summary>What is your shop name?</summary>
          <div className="faq__content">
            <p>ANSWER: MEATGRAM</p>
          </div>
        </details>

        {/* <details>
          <summary>What are your hours of operation?</summary>
          <div className="faq__content">
            <p>ANSWER: We are open from 9 AM to 9 PM, Monday to Saturday.</p>
          </div>
        </details> */}

        <details>
          <summary>Do you deliver in Bhopal only?</summary>
          <div className="faq__content">
            <p>ANSWER: Yes, currently Cher's MeatGram delivers exclusively in Bhopal, ensuring that residents of the city have access to fresh and high-quality meat and seafood.</p>
          </div>
        </details>

        <details>
          <summary>What products do you offer?</summary>
          <div className="faq__content">
            <p>ANSWER: Cher's MeatGram offers a wide range of products, including fresh chicken, various types of fish, mutton, and a selection of marinades and seasonings to enhance your cooking.</p>
          </div>
        </details>

        <details>
          <summary>How do you ensure the quality of your products?</summary>
          <div className="faq__content">
            <p>ANSWER: Cher's MeatGram is committed to providing the freshest and highest quality meat and seafood. They source their products from trusted suppliers and maintain strict quality control standards to ensure freshness and safety.</p>
          </div>
        </details>

        <details>
          <summary>What is the delivery process?</summary>
          <div className="faq__content">
            <p>ANSWER: Once you place an order, Cher's MeatGram will deliver your products to your specified address in Bhopal. They aim to deliver within a reasonable timeframe to ensure the freshness of your order.</p>
          </div>
        </details>

        <details>
          <summary>Is there a minimum order requirement?</summary>
          <div className="faq__content">
            <p>ANSWER: Cher's MeatGram may have a minimum order requirement for delivery. This information can be found on their website or app when placing an order.</p>
          </div>
        </details>

        <details>
          <summary>What are the payment options available?</summary>
          <div className="faq__content">
            <p>ANSWER: Cher's MeatGram accepts various payment methods, including online payment through debit/credit cards, net banking, and digital wallets, ensuring a convenient and secure payment process.</p>
          </div>
        </details>

        <details>
          <summary>Can I track my order?</summary>
          <div className="faq__content">
            <p>ANSWER: Yes, Cher's MeatGram provides order tracking facilities. You can track the status of your order through their website or app once it is dispatched for delivery.</p>
          </div>
        </details>

        <details>
          <summary>What if I'm not satisfied with my order or there's an issue with it?</summary>
          <div className="faq__content">
            <p>ANSWER: Cher's MeatGram is dedicated to customer satisfaction. If you have any issues with your order, such as receiving the wrong item or quality concerns, you can contact their customer support for assistance. They will work to resolve the issue promptly.</p>
          </div>
        </details>

        <details>
          <summary>Do you offer any special discounts or promotions?</summary>
          <div className="faq__content">
            <p>ANSWER: Cher's MeatGram may have periodic promotions and discounts. Check their website or app for the latest offers and deals.</p>
          </div>
        </details>

        <details>
          <summary>How can I get in touch with Cher's MeatGram for inquiries or support?</summary>
          <div className="faq__content">
            <p>ANSWER: You can contact Cher's MeatGram customer support through the contact information provided on their website or app. They are available to assist you with any questions or concerns.</p>
          </div>
        </details>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
