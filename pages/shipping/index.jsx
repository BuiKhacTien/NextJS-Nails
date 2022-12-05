import { maxWidth } from '@mui/system'
import React from 'react'
export default function Index({}) {
    

    return (
        <div className='shipping_charges_container'>
            <h2 className='shipping_charges_title'>Shipping Charges & Policies</h2>
            <h3>Shipping Charges</h3>
                <h4>{`Your shipping/handling fee is determined by the parcel's weight, size and destination. Some orders are shipped in multiple packages.`}
                United States</h4>
            <div style={{textAlign: "justify"}} className="shipping_policies_text">
                    <p>•	All orders are subject to shipping charges. There is a minimum $50 order. We will choose the best and most cost-effective way to ship your products</p>
                    <p>{`•	We currently use FedEx, UPS and US Post Office. However, should your order exceed size or weight limits for parcel shipment, "Truck Delivery" will be selected.`}</p>
                    <p>{`•	For truck delivery on furniture and equipment, drivers will usually only provide tailgate delivery. The driver will bring the merchandise to the tailgate of the truck, but won't assist you in bringing down the merchandise or inside. We provide you with the options of calling to schedule the delivery window of time, liftgate to bring down the furniture or inside delivery with additional charges if selected at checkout.`}</p>
                    <p>•	Furniture and equipment take 1-2 weeks to be delivered.</p>
                    <p>{`•	Orders shipped outside the 48 contiguous states to Hawaii, Puerto Rico, Virgin Islands and Alaska by ground are subject to the carrier’s normal delivery time. You can always choose to expedite your order next or second day air with additional costs. However, The U.S. Department of Transportation restricts orders containing hazardous materials from being shipped by air.`}</p>
                <h4>International</h4>
                    <p>•	Shipment outside the continental United States (including Hawaii, Puerto Rico, Virgin Islands and Alaska) are subject to the international carriers shipping rate. Due to high costs associated with international shipments, there is a minimum $95 order. An additional hazardous material fee will be incurred as set forth by the carrier. All rates are subject to change without notice.</p>
                    <p>•	Duties, taxes, VAT and import costs are not included in the shipping cost. These fees are set by the country of destination, based on the shipment value and class of goods. Those fees will be collected directly from the carrier. Please contact your local government for questions related to import taxes and duties.</p>
                    <p>•	We do not ship to: Russia, Cuba, Iran, North Korea, Sudan or Syria.</p>
                <h4>Additional Shipping charges</h4>
                    <p>•	Residential deliveries</p>
                    <p>•	Signature confirmation for residential addresses (mandatory for orders over $100)</p>
                    <p>•	Hazardous material</p>
                    <p>•	Oversize and special handling</p>
                    <p>•	Special order</p>
                <h4>Pick-up at warehouse</h4>
                    <p>•	No charge</p>
                    <p>•	Pick-up is available our warehouse in Franklin Park, if you select the option at checkout. We will contact you to let you know time frame for the pick-up.</p>
                <h4>Additional information</h4>
                    <p>•	We can only ship to your permanent address. We cannot ship to any of these locations: hotels, motels and resorts</p>
                    <p>•	We ship to APO addresses, US territories and possessions.</p>
                    <p>•	Saturday and Sunday are not considered business days.</p>
            </div>
        </div>
    )
}
