import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PrivacyPolicy = () => {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const sections = [
    {
      id: 'panel1',
      title: 'Website and Mobile Application (Webapp)',
      content: (
        <div>
          <Typography variant="body2" gutterBottom>
            When you visit the SimserviceHub platform, we collect information including your IP (Internet Protocol) address and details about the pages you visit. This helps us analyse the platform's effectiveness and ensure ease of navigation for users.
          </Typography>
          <Typography variant="body2" gutterBottom>
            We use cookies to optimize platform functionality, support analysis, and for advertising purposes. The app collects and processes your personal data in similar ways, which may include your precise or approximate location derived from your device’s GPS or IP address, depending on your device settings and permissions.
          </Typography>
          <Typography variant="body2" gutterBottom>
            With your consent, we may send you push notifications about SimserviceHub’s products and services. However, service-related messages are sent to you regardless of consent.
          </Typography>

          <Typography variant="h6" gutterBottom>
            When You Provide Feedback or Review a Tradesperson
          </Typography>
          <Typography variant="body2" gutterBottom>
            SimserviceHub encourages feedback and reviews to monitor service quality and help other users find reliable tradespeople. When you connect with a tradesperson through our platform, you may be asked to review your experience. These reviews ensure tradespeople maintain high standards and provide valuable information to other users.
          </Typography>
          <Typography variant="body2" gutterBottom>
            If a tradesperson contacts you for feedback through our platform’s system, the tradesperson is the Data Controller, and SimserviceHub acts as the Data Processor. However, in all other cases where you provide information directly to SimserviceHub, we act as the Data Controller.
          </Typography>
          <Typography variant="body2" gutterBottom>
            To ensure reviews are genuine, we may request:
          </Typography>
          <ul>
            <li>Name</li>
            <li>Location details (town or district, not the full address)</li>
            <li>Contact details (email, phone number)</li>
            <li>Details of the work performed</li>
          </ul>
          <Typography variant="body2" gutterBottom>
            For security, we may verify your review by sending you a confirmation message or calling you. Reviews are published with your consent and show only your location (e.g., Lagos Island). If you wish, you can request to have your review removed at any time.
          </Typography>
          <Typography variant="body2" gutterBottom>
            We use automated systems to check for inappropriate language in reviews and reserve the right to share your review with the relevant tradesperson upon request, provided you’ve consented to this sharing.
          </Typography>

          <Typography variant="h6" gutterBottom>
            If You Make a Claim Under a SimserviceHub Guarantee Scheme
          </Typography>
          <Typography variant="body2" gutterBottom>
            If you make a claim under the SimserviceHub Guarantee Scheme, we may collect:
          </Typography>
          <ul>
            <li>Personal information (e.g., name, address, contact details)</li>
            <li>Proof of transaction and work done (e.g., receipts, photos, correspondence)</li>
            <li>Additional supporting information (e.g., surveyor reports)</li>
          </ul>
          <Typography variant="body2" gutterBottom>
            We use this information to verify claims and ensure they are related to a job initiated through our platform. Your data may also be shared with contracted service providers to arrange inspections or validate claims.
          </Typography>

          <Typography variant="h6" gutterBottom>
            If You Receive Quotes or Invoices Through the Platform
          </Typography>
          <Typography variant="body2" gutterBottom>
            Our tradespersons can send quotes or invoices directly through the SimserviceHub platform. In these instances:
          </Typography>
          <ul>
            <li>The tradesperson sending the information is the Data Controller.</li>
            <li>SimserviceHub serves as the Data Processor, facilitating the secure transmission of data.</li>
          </ul>
          <Typography variant="body2" gutterBottom>
            Each quote or invoice will clarify that SimserviceHub is processing the data on behalf of the tradesperson.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Data Security and Updates
          </Typography>
          <Typography variant="body2" gutterBottom>
            SimserviceHub takes data security seriously and ensures compliance with Nigerian data protection laws. We may update this Privacy Notice periodically to reflect changes in our services or legal requirements. Continued use of the platform signifies your acceptance of these updates.
          </Typography>
          <Typography variant="body2">
            For any questions or concerns, please refer to the Contact Us section on our platform.
          </Typography>
        </div>
      ),
    },
    {
        id: 'panel2',
        title: 'Data Management and Retention',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              When you submit a review or lodge a complaint about a tradesperson via SimserviceHub, your personal information is managed in accordance with our retention policy. Specifically:
            </Typography>
            <ul>
              <li>Personal data linked to your review or complaint will be retained for six years.</li>
              <li>
                After this period, most of the personal data associated with the review will be deleted. However, the review or complaint itself, along with your name, will be retained to uphold the integrity of SimserviceHub’s membership requirements and to ensure public trust.
              </li>
            </ul>
            <Typography variant="body2" gutterBottom>
              If you make a claim under our SimserviceHub Guarantee Scheme, we will collect and retain your financial information for six years to meet our legal and compliance obligations.
            </Typography>
            <Typography variant="body2" gutterBottom>
              When you request contact with a tradesperson via SimserviceHub, some of the personal data provided in the request will be stored. We may also request feedback following your interaction to improve both our platform and the services provided by the tradesperson.
            </Typography>
            <Typography variant="body2">
              If you wish to request the deletion of your personal data, please email us at: privacy@simservicehub.com.
            </Typography>
          </div>
        ),
      },
      {
        id: 'panel3',
        title: 'Artificial Intelligence',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              At SimserviceHub, we may utilize Artificial Intelligence (AI) technologies to enhance the services offered through our webapp and improve the overall user experience for Nigerian tradespeople. This use may include:
            </Typography>
            <ul>
              <li>
                <strong>Personalized Recommendations:</strong> AI technologies may process your personal data and usage patterns to provide tailored suggestions for connecting with potential clients or improving your service listings.
              </li>
              <li>
                <strong>User Behaviour Analysis:</strong> We analyse user behaviour on the platform to protect the integrity of SimserviceHub. This ensures that the platform remains safe and effective for all users by identifying and addressing fraudulent or harmful activities.
              </li>
              <li>
                <strong>Product Optimization:</strong> AI tools are employed to continuously refine and optimize the functionality of our platform, ensuring it meets the needs of both tradespeople and homeowners effectively.
              </li>
            </ul>
            <Typography variant="body2" gutterBottom>
              Any data processed using AI will be handled in strict accordance with this Privacy Notice and all applicable data protection laws.
            </Typography>
            <Typography variant="body2">
              If you have questions about how AI is used within SimserviceHub, or if you wish to make inquiries about your data, please contact us at: privacy@simservicehub.com.
            </Typography>
          </div>
        ),
      },
      {
        id: 'panel4',
        title: 'Data Sharing',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              At SimserviceHub, we share your data with third parties in a manner that complies with Nigeria's Data Protection Regulation (NDPR) and other applicable laws. The following outlines our data-sharing practices:
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Purposes for Data Sharing:</strong>
            </Typography>
            <ul>
              <li>
                <strong>Connecting Trades with Homeowners:</strong> When you request a quote or specific service through the SimserviceHub webapp, your provided contact details and work specifications are shared with tradespeople to enable them to contact you directly.
              </li>
              <li>
                <strong>Contacting Franchise Members:</strong> If you request to connect with one of our franchise members, your information will be shared with your consent. This ensures the trade member can respond to your inquiry promptly.
              </li>
              <li>
                <strong>Legal and Regulatory Obligations:</strong> Data may be shared for fraud prevention and other regulatory purposes to protect the public from illegal or harmful activities. If a serious complaint arises, we may collaborate with regulatory bodies to support investigations.
              </li>
              <li>
                <strong>Processing Payments:</strong> We work with secure payment processors, such as Flutterwave or other similar platforms, to manage transactions and payment collections.
              </li>
              <li>
                <strong>Business Asset Transactions:</strong> If we sell or acquire any business or company assets, your data may be shared as part of this process to fulfil legal or financial requirements.
              </li>
              <li>
                <strong>Claims Under the Guaranteed Scheme:</strong> In cases where claims are submitted, your information may be shared with contracted surveyors or evaluators to investigate the quality and extent of the work performed. This may involve detailed inspections and reporting to support your claim.
              </li>
              <li>
                <strong>Analytics and Advertising:</strong> We collaborate with third-party suppliers for analytical purposes to improve platform functionality and user experience. Your data may be used to create custom and lookalike audiences for advertising on platforms like Facebook and Google. If you prefer not to be included in these activities, you can opt out by contacting us at: privacy@simservicehub.com.
              </li>
            </ul>
            <Typography variant="body2" gutterBottom>
              <strong>Data Safeguards:</strong> SimserviceHub ensures all shared data is protected through:
            </Typography>
            <ul>
              <li>Encryption technologies where applicable.</li>
              <li>Agreements that require third-party partners to comply with Nigeria's Data Protection Regulation and international standards.</li>
              <li>Limiting data sharing to only what is necessary for the stated purposes.</li>
            </ul>
            <Typography variant="body2">
              For questions about data sharing or to request removal from certain activities, please contact privacy@simservicehub.com.
            </Typography>
          </div>
        ),
      },
      {
        id: 'panel5',
        title: 'Marketing',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              At SimserviceHub, operated by Simul Management Solutions, we use your details to inform you about additional products and services we believe may interest you. These communications may be sent through:
            </Typography>
            <ul>
              <li><strong>Email:</strong> Updates about our offerings or new features available on the platform.</li>
              <li><strong>SMS or Phone Calls:</strong> Notifications for special promotions or tailored services.</li>
              <li><strong>Webapp Notifications:</strong> With your consent, you may receive marketing messages directly through the SimserviceHub webapp.</li>
            </ul>
            <Typography variant="body2" gutterBottom>
              <strong>Use of Location Data:</strong> We may use your location details, including your IP address or GPS data, to customize marketing communications and ensure they are relevant to your area and preferences.
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Feedback Requests:</strong> Occasionally, we may contact you to request feedback on your experience with SimserviceHub. This feedback helps us improve our services and the performance of the tradespeople listed on our platform. It also supports research into the development of new features and products.
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Protecting Your Data:</strong> We value your privacy and do not share your information with third parties outside of Simul Management Solutions or its group affiliates for marketing purposes.
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Managing Your Preferences:</strong> You can adjust or revoke your consent for marketing communications at any time by:
            </Typography>
            <ul>
              <li>Clicking the unsubscribe link at the bottom of our emails.</li>
              <li>Responding to text messages with a stop command.</li>
              <li>Sending an email to privacy@simservicehub.com to update your preferences or opt-out entirely.</li>
            </ul>
            <Typography variant="body2">
              By providing these options, we ensure you have control over the communications you receive from SimserviceHub while maintaining a personalized and seamless experience.
            </Typography>
          </div>
        ),
      },
      {
        id: 'panel6',
        title: 'Your Rights',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              If you would like to access a copy of the personal information we hold about you, or request updates to incorrect information, you can contact us by sending an email to <a href="mailto:privacy@simservicehub.com">privacy@simservicehub.com</a>.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Additionally, you have the right to request the deletion of your data or to restrict its processing in specific circumstances. If you choose to discontinue using our services, you may also request that your personal data be transferred to a new service provider on your behalf.
            </Typography>
            <Typography variant="body2" gutterBottom>
              If you have concerns about how we process your personal information, please contact us via email at <a href="mailto:privacy@simservicehub.com">privacy@simservicehub.com</a>.
            </Typography>
            <Typography variant="body2" gutterBottom>
              You may also reach us at:
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Data Protection Officer</strong><br />
              Simul Management Solutions<br />
              Tel: 09066484496<br />
              Email: <a href="mailto:privacy@simservicehub.com">privacy@simservicehub.com</a>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Identity Verification:</strong> We do not charge for providing access to your personal data. However, to protect your privacy, we may request proof of your identity before disclosing any information.
            </Typography>
            <Typography variant="body2">
              <strong>Response Time:</strong> We aim to respond to your requests within one month. If additional time is required to process your request, we will notify you within the initial one-month period.
            </Typography>
          </div>
        ),
      },
      {
        id: 'panel7',
        title: 'Contact Us',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              If you have any concerns or questions about your data, please contact the SimserviceHub Data Protection Team at the address below:
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Simul Management Solutions</strong><br />
              SimserviceHub Head Office<br />
              Email: <a href="mailto:privacy@simservicehub.com">privacy@simservicehub.com</a><br />
              Tel: 09066484496
            </Typography>
          </div>
        ),
      },
      {
        id: 'panel8',
        title: 'Complaints',
        content: (
          <div>
            <Typography variant="body2" gutterBottom>
              If you feel that we have not processed your data fairly or you are not satisfied with how we have handled your personal information, please contact our privacy team.
            </Typography>
          </div>
        ),
      },
  ];

  return (
    <div className='allsk-sec'>
      <div className='site-container'>
        <header className='glla-header'>
          <h1 className='big-text'>SimserviceHub Privacy Notice</h1>
        </header>
        {sections.map((section) => (
          <Accordion
            key={section.id}
            expanded={expanded === section.id}
            onChange={handleAccordionChange(section.id)}
            sx={{
                boxShadow: 'none', // Removes the box-shadow
                '& .MuiAccordionSummary-root': {
                  boxShadow: 'none', // Removes the summary's shadow
                  color: 'black', // Sets the header text color to red
                },
                '& .MuiAccordionDetails-root': {
                  color: 'black', // Sets the content text color to black
                },
              }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {typeof section.content === 'string' ? (
                <Typography>{section.content}</Typography>
              ) : (
                section.content
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
