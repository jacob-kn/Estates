import React from 'react'

function Agreement () {
  let agreementModule = require('./tmpAgreement.js')
  let tmpAgreement = agreementModule.tmpAgreement
  let propertyModule = require('./tmpProps.js')
  let tmpProps = propertyModule.tmpProps

  const property = tmpProps[0]
  const agreement = tmpAgreement[0]

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const timeOptions = { timeStyle: 'short' }

  return (
    <div style={{textAlign:"left", fontFamily:"serif", lineHeight:1}}>
      <p style={{textAlign:"center", lineHeight:1.5}}>
        <b>Offer to Purchase Real Estate</b>
      </p>
      <br />
      <p style={{lineHeight:1.5}}>
        <b>THIS OFFER TO PURCHASE REAL ESTATE (the "Offer"), DATED&nbsp;
        {agreement.offerDate.toLocaleDateString('en-ca', dateOptions)}
        &nbsp;(the "Offer Date"),</b>
      </p>
      <br />
      <p style={{lineHeight:1.5}}>
        <b>IS MADE BY</b>
      </p>
      <br />
      <p style={{textAlign:"center", lineHeight:1.5}}>
        {agreement.buyerName}
      </p>
      <p style={{textAlign:"center", lineHeight:1.5}}>
        (the "Buyer")
      </p>
      <br />
      <p style={{textAlign:"right", lineHeight:1.5}}>
        <b>OF THE FIRST PART</b>
      </p>
      <br/>
      <p style={{textAlign:"center", lineHeight:1.5}}>
        <b>- TO -</b>
      </p>
      <br />
      <p style={{textAlign:"center", lineHeight:1.5}}>
        {agreement.sellerName}
      </p>
      <p style={{textAlign:"center", lineHeight:1.5}}>
        (the "Seller")
      </p>
      <br/>
      <p style={{textAlign:"right", lineHeight:1.5}}>
        <b>OF THE SECOND PART</b>
      </p>
      <br />
      <p style={{lineHeight:1.5}}>
        <b><u>Background</u></b>
      </p>
      <br/>
      <p style={{lineHeight:1.5}}>
        The Buyer wishes to submit an offer to purchase a certain&nbsp;
        {property.criteria.type} property from the Seller under the terms 
        stated below.
      </p>
      <br />
      <p style={{lineHeight:1.5}}>
        <b>IN CONSIDERATION OF</b> and as a condition of the Seller selling the
        Property and the Buyer purchasing the Property (collectively the 
        "Parties") and other valuable consideration the receipt of which is 
        hereby acknowledged, the Parties to this Offer to Purchase Real Estate 
        agree as follows:
      </p>
      <br />
      <ol style={{marginLeft:16}}>
        <p style={{lineHeight:1.5}}>
          <b><u>Real Property</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          The legal description of the Property is as follows:&nbsp;
          {property.criteria.type} property located at {property.street}&nbsp;
          {property.quadrant}, {property.city}, and includes the fixtures 
          located at this property except as provided by this Offer. All 
          Property included within this Offer is referred to as the "Property".
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Sales Price</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          The total purchase price for the Property is $
          {agreement.purchasePrice.toFixed(2)} (the "Purchase Price"), payable 
          as follows:</li>
        <ol style={{marginLeft:32}} type="a">
          <br />
          <li style={{lineHeight:1.5}}>
            The Buyer will pay a deposit of ${agreement.deposit.toFixed(2)}
            &nbsp;(the "Deposit") in cash to be held in escrow. On the Closing 
            Date, the Deposit will be credited to the Seller.
          </li>
          <br />
          <li style={{lineHeight:1.5}}>
            The Buyer will pay the balance of the Purchase Price in cash or 
            equivalent in financing at closing unless otherwise provided in 
            this Offer. The balance will be subject to adjustments.
          </li>
        </ol>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Return of Deposit</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          The Deposit will be returned to the Buyer if the Offer is rejected or
          expires prior to acceptance.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Sales Tax</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          If the Property is subject to Goods and Services Tax ("GST"), then 
          such tax shall be in addition to the Purchase Price. If the sale of 
          the Property is not subject to GST, the Seller agrees to certify on 
          or before the Closing Date that the sale of the Property is not 
          subject to GST.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Offer Expiration</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          If the Offer is not accepted by the Seller by the end of business day 
          on&nbsp;
          {agreement.offerExpiration.toLocaleDateString('en-ca', dateOptions)}
          &nbsp;(the "Offer Expiration"), the Deposit shall be immediately 
          returned to the Buyer. The Buyer may not revoke the Offer prior to 
          the Offer Expiration.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Offer is Binding Once Signed</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          Upon being signed by all Parties to this Offer, this Offer and all 
          terms within will be binding, unless modified by agreement of all 
          Parties in a subsequent real estate purchase agreement.
        </li>
        <br />
        <li style={{lineHeight:1.5}}>
          If the Offer is accepted prior to the Offer Expiration and the Buyer 
          fails to comply with the terms of the Offer, the Seller may treat the 
          Offer as void and the Deposit will be forfeited to the Seller.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Closing &amp; Possession</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          The closing date will be on or be prior to&nbsp;
          {agreement.closingDate.toLocaleDateString('en-ca', dateOptions)} (the 
          "Closing Date") or at such other time agreed by the Parties, at which 
          point the Buyer will take possession of the Property.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Conditions</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          The Buyer's obligation to purchase the Property is contingent upon 
          the following enumerated condition(s):
          {agreement.landSurveyRequested ? (
            <ol style={{marginLeft:32}} type="a">
              <br />
              <li style={{lineHeight:1.5}}>
                The seller must provide the Buyer with a real property report 
                prepared by a licensed Alberta land surveyor on or before&nbsp;
                {agreement.offerDate.toLocaleDateString('en-ca', dateOptions)}. 
                The Buyer can always waive this condition on or before&nbsp;
                {agreement.offerDate.toLocaleDateString('en-ca', dateOptions)}.
              </li>
            </ol>
          ) : (<></>)}
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Residency</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          {agreement.sellerName} represents and warrants that he or she is not 
          and on the Closing Date will not be a non-resident under the 
          non-residency provisions of the Income Tax Act, R.S.C. 1985 which 
          representation and warranty shall survive and not merge upon the 
          completion of this transaction. {agreement.sellerName} shall deliver 
          to the Buyer a statutory declaration that he or she is not then a 
          non-resident of Canada.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Notices</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          All notices pursuant to this Offer must be written and signed by the 
          respective party or its agent and all such correspondence will be 
          effective upon it being mailed with return receipt requested, 
          hand-delivered, or trnasmitted by facsimile as follows:
        </li>
        <br />
        <table style={{lineHeight:1.5, width:"100%"}}>
          <tbody>
            <tr>
              <th>Buyer</th>
              <th>Seller</th> 
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Name: {agreement.buyerName}</td>
              <td>Name: {agreement.sellerName}</td> 
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>E-mail: {agreement.buyerEmail}</td>
              <td>E-mail: {agreement.buyerEmail}</td> 
            </tr>
          </tbody>
        </table>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Severability</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          If any term or provision of this Offer will, to any extent, be 
          determined to be invalid or unenforceable by a court of competent 
          jurisdiction, the remainder of this Offer will not be affected and 
          each unaffected term and provision of this Offer will remain vallid 
          and be enforceable to the fullest extent.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Interpretation</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          Headings are inserted for the convenience of Parties only and are not 
          to be considered when interpreting this Offer. Words in the singular 
          mean and include the plural and vice versa. Words in the masculine 
          gender mean and include the feminine gender and vice versa. Words 
          importing persons include firms and corporations and vice versa.
        </li>
        <br />
        <p style={{lineHeight:1.5}}>
          <b><u>Time of Essence</u></b>
        </p>
        <li style={{lineHeight:1.5}}>
          Time is of the essence in this Offer. Every calendar day, except 
          Saturday, Sunday, or a public holiday will be deemed a business day 
          and all relevant time periods in the Offer will be calculated in 
          business days. Performance will be due the next business day if any 
          deadline falls on a Saturday, Sunday, or a public holiday. A business 
          day ends at 5:00 p.m. local time in the time zone in which the 
          Property is situated.
        </li>
      </ol>
      <br />
      <p style={{textAlign:"center", lineHeight:1.5}}>
        <b><u>Buyer's Offer</u></b>
      </p>
      <br />
      <p style={{lineHeight:1.5}}>
        This is an offer to purchase the Property on the above terms and 
        conditions. The Seller has the right to continue to offer the Property 
        for sale and to accept any other offer at any time prior to acceptance 
        by the Seller. If the Seller does not accept this Offer from the Buyer 
        by {agreement.offerExpiration.toLocaleDateString('en-ca', dateOptions)}
        , this Offer will lapse and become no force or effect.
      </p>
      <br />
      <table style={{lineHeight:1.5, width:'100%'}}>
        <tbody>
          <tr>
            <td>
              Signature:&nbsp;
              <span style={{fontFamily:'cursive'}}>
                <u>{agreement.buyerName}</u>
              </span>
            </td>
            <td>
              Date:&nbsp;
              {agreement.offerDate.toLocaleDateString('en-ca', dateOptions)}
            </td> 
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Buyer's Name: {agreement.buyerName}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <p style={{textAlign:"center", lineHeight:1.5}}>
        <b><u>Seller's Acceptance/Rejection</u></b>
      </p>
      <br />
      {agreement.acceptanceDate != null ? (
        <>
          <p style={{lineHeight:1.5}}>
            <b>Acceptance of offer to purchase:</b> The Seller accepts the 
            foregoing Offer on the terms and conditions specified above and agrees 
            to convey the Property to the Buyer.
          </p>
          <br />
          <table 
            style={{
              lineHeight:1.5, 
              width:'100%', 
              borderSpacing:'32px 0', 
              marginLeft:'-32px',
            }}
          >
            <tbody>
              <tr>
                <td>
                  <span style={{fontFamily:'cursive'}}>
                    {agreement.sellerName}
                  </span>
                </td>
                <td>
                  {agreement.acceptanceDate.toLocaleDateString(
                    'en-ca', dateOptions)}
                </td> 
                  <td>
                  {agreement.acceptanceDate.toLocaleTimeString(
                    'en-ca', timeOptions)}
                  </td> 
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td><hr /></td>
                <td><hr /></td> 
                <td><hr /></td> 
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Signature</td>
                <td>Date</td> 
                <td>Time</td> 
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      ) : (<></>)}
      {agreement.rejectionDate != null ? (
      <>
        <p style={{lineHeight:1.5}}>
          <b>Rejection:</b> The Seller rejects the foregoing Offer.
        </p>
        <br />
        <table 
          style={{
            lineHeight:1.5, 
            width:'100%', 
            borderSpacing:'32px 0', 
            marginLeft:'-32px',
          }}
        >
          <tbody>
            <tr>
              <td>
                <span style={{fontFamily:'cursive'}}>
                  {agreement.sellerName}
                </span>
              </td>
              <td>
                {agreement.rejectionDate.toLocaleDateString('en-ca', dateOptions)}
              </td> 
              <td>
                {agreement.rejectionDate.toLocaleTimeString('en-ca', timeOptions)}
              </td> 
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td><hr /></td>
              <td><hr /></td> 
              <td><hr /></td> 
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Signature</td>
              <td>Date</td> 
              <td>Time</td> 
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
      ) : (<></>)}
      <table style={{lineHeight:1.5, width:'100%'}}>
        <tbody>
          <tr>
            <td>
              Seller's Name: {agreement.sellerName}
            </td>
            <td>
              Date:&nbsp;
              {agreement.acceptanceDate != null ? (
                <>
                  {agreement.acceptanceDate.toLocaleDateString(
                    'en-ca', dateOptions)}
                </>
              ) : (<></>)}
              {agreement.rejectionDate != null ? (
                <>
                  {agreement.rejectionDate.toLocaleDateString(
                    'en-ca', dateOptions)}
                </>
              ) : (<></>)}
            </td> 
          </tr>
        </tbody>     
      </table>
      <br />
    </div>
  )
}

export default Agreement