import React from 'react';
import { Link } from 'react-router-dom';

const HomeownersTerms = () => {
  return (
    <div className='allsk-sec'>
        <div className='site-container'>

      <div className="terms-container">

      <section className="terms-Costumers">
        <h1 className='big-text'>Terms of Use for Costumers</h1>
        <p>
          Welcome to SimserviceHub, a platform by Simul Management Solutions for finding reliable Artisans across Nigeria.
        </p>

        <h3>1. Account Creation</h3>
        <ul>
          <li>Costumers must register with valid contact details to post job requests or hire Artisans.</li>
        </ul>

        <h3>2. Job Postings</h3>
        <ul>
          <li>Job descriptions must be clear, lawful, and appropriate. Misleading or abusive postings are prohibited.</li>
        </ul>

        <h3>3. Booking and Payments</h3>
        <ul>
          <li>Payments should be processed through SimserviceHub’s secure gateway to ensure accountability and protection.</li>
          <li>Costumers must adhere to agreed payment schedules with Artisans.</li>
        </ul>

        <h3>4. User Conduct</h3>
        <ul>
          <li>Costumers are expected to communicate respectfully and provide access to premises as agreed for services.</li>
        </ul>

        <h3>5. Reviews and Feedback</h3>
        <ul>
          <li>Costumers can leave reviews after service completion. Reviews must be honest and free of defamatory language.</li>
        </ul>

        <h3>6. Liability</h3>
        <p>SimserviceHub does not directly employ Artisans and is not responsible for service quality. Dispute resolution options are available for unresolved issues.</p>

        <h3>7. Updates to Terms</h3>
        <p>Terms may be updated periodically. Continued use of the platform implies acceptance of the updated Terms.</p>
      </section>

      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px' }}>
        These terms ensure clarity and fairness for all users, while fostering trust and professionalism on the platform.
      </footer>



    </div>
    </div>


        </div>

  );
};

export default HomeownersTerms;
