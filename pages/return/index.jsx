import React from 'react'



export default function Index({}) {
    

    return (
        <div className='returning_container'>
            <h2 className="returning_title">Returning An Item</h2>
            <p>Not what you were looking for? Receive an item in error? Order the wrong item?</p>
            <p>If there is a problem with your order or you are not completely satisfied with your purchase, you may return it within 30 days for a refund, a credit on your account or an exchange for another item of the same price. We will do whatever it takes to make it right.</p>
            <p>Please note: Shortage, discrepancy or damage in a shipment must be reported within 3 business days. Please do not discard any boxes or wrapping supppes until the issue is resolved.</p>
            <p>To ensure full credit, please keep in mind these important points when returning an item:</p>
            <ul className='return_list'>
            <li className='address_return'>
                <p>{`It is the customer’s responsibility to properly pack, ship and insure the contents of all returned packages using a traceable ground shipping method (we recommend FedEx or the US Postal Service insured mail) to:`}</p>
                <p>Nails Beauty Supply - Return Department</p>
                <p>13480 Veterans Memorial Dr, Ste C-1</p>
                <p>Houston, TX 77014</p>
            </li>
            <li>All returns must be authorized to be returned. To obtain a Return Authorization call our Customer Service at 210-607-8888.</li>
            <li>We will refuse and reject all returned packages if there is no Return Authorization Number marked outside of the box.</li>
            <li>Product(s) should be:</li>
                <ul className='product_should_be'>
                    <li>Returned within 30 days from shipping date,</li>
                    <li>In good condition, in original packaging with all printed materials, parts and accessories and the UPC Code on the exterior, and</li>
                    <li>Received in sellable condition.</li>
                </ul>
            <li>Shipping charges are refunded only when the wrong product was shipped or product was defective upon arrival.</li>
            <li>Write the Return Authorization Number on the outside of the box and on a copy of the original packing slip which should be packed inside the box.</li>
            <li>All returns will be inspected and must be 100% complete.</li>
            <li>All free items included with a specific product purchase must be returned as well to receive credit.</li>
            <li>When buy in case, but return less than case quantity, the refund price will be calculated using next higher price level.</li>
            <li>{`It is the customer’s responsibility to make claims with the carrier for any proof of delivery or damage to shipment returned to Nails Beauty Supply.`}</li>
            <li>Products are sold for Professional Use Only. We reserve the right to verify and ask for proof of your current professional license such as salon owner, cosmetology, nail technician, instructor, and student. Any false statement will void your rights for return or claims.</li>
            <li>All authorized returned items are subject to restocking fee.</li>
            <li>*Following items cannot be returned: pedicure spas, acrylic and gel, acrylic nail brushes, furniture, all equipment and parts (nail drills, sterilizers, towel warmers, lights, dryers, nails bit...) and brand name items such as OPI, CND, IBD, Cuccio.</li>
            <li>{`Spas & equipment carry manufacturer's warranty. Please contact manufacturer for technical issues or repair Manufacturer's Return Policy and Warranty`}</li>
            <li>*No returns can be made on clearance sale items and special/custom orders; these are considered final sales.</li>
            <li>Credit will always be issued to the same credit card to which they were charged.</li>
            <li>We will issue a refund within 30 business days of receiving and processing your return. It should appear on your statement within two billing periods, depending on your billing cycle.</li>
            <li>DO NOT RETURN ITEMS TO THE NAILS BEAUTY SUPPLY BY AIR MAIL - The U.S. Department of Transportation (USDOT) restricts air shipment of hazardous materials items that could contribute to a fire or other mishap on board an aircraft. Aerosol products in pressurized spray containers (e.g., Demert nail dryer) and products containing flammable, volatile, or corrosive chemicals (e.g., acrylic nail liquid, nail polish, nail polish removers) have this restricted status. All of these products must be returned via a ground shipping service.</li>
            </ul>
            <p>{`If you return products to the Nails Beauty Supply fulfillment center, you can check your order status online through Your Account at any time to see if we've received and processed it. You can call us at 1-210-607-8888 from 9:00AM - 5:30PM CST Mon-Fri except national holidays. Be sure have your order number available when you call.`}</p>
        </div>
    )
}
