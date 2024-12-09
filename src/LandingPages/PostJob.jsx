import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import PageServices from '../data/PageServices'; // Import the PageServices data
import './Css/Main.css';


import { Link } from 'react-router-dom';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState, useEffect } from 'react';
// import './Css/PostJob.css';

const PostJob = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [textareaContent, setTextareaContent] = useState('');
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  const navigate = useNavigate();

  const fetchServices = async (url = `${djangoHostname}/api/jobs/auth/service-categories/`) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setServices((prev) => [...prev, ...data.results]);
        setPagination({ count: data.count, next: data.next, previous: data.previous });
      } else {
        console.error('Failed to fetch services:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleLoadMore = () => {
    if (pagination.next) {
      fetchServices(pagination.next);
    }
  };

  const handleServiceChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const service = services.find((s) => s.id === selectedId);
    setSelectedService(service);
    setActiveService(null);
    setExpandedService(null);
    setActiveIndex(null);
  };

  const handleServiceClick = (index) => {
    setActiveService(index);
    setExpandedService(expandedService === index ? null : index);
  };

  const toSingular = (str) => (str.endsWith('s') ? str.slice(0, -1) : str);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleChange = (event) => {
    setTextareaContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedService || activeIndex === null || !textareaContent.trim()) {
      alert('Please complete all the required fields.');
      return;
    }

    const jobData = {
      service_details: selectedService.unique_id,
      category: selectedService.name,
      title: selectedService.name,
      location: "N0 10 station Road Ph, R/s",
      customer: "fd91931a-d092-46e8-9a6c-4ef7da63fb99",
      budget: 50.00,
      type: activeIndex === 0 ? 'Simple' : 'Complex',
      description: textareaContent,
    };



    try {
      const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Job posted successfully:', result);
        alert('Your job has been posted successfully!');
        navigate('/success');
      } else {
        console.error('Failed to post job:', response.statusText);
        alert('Failed to post the job. Please try again later.');
      }
    } catch (error) {
      console.error('Error while posting the job:', error);
      alert('An error occurred while posting the job.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="Gradnded-page">
                        <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p><Link to="/">Simservicehub</Link> <ChevronRightIcon /> <Link to="/post-job"> Post a job</Link> </p>
          </div>
          </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Post a job</h2>
              <p>Receive responses from SimserviceHub’s trusted and verified local tradespeople nearby</p>
            </div>
            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">What would you like to have done?</label>
                  <select
                    id="serviceSelect"
                    className="service-dropdown"
                    onChange={handleServiceChange}
                  >
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.postName}
                      </option>
                    ))}
                  </select>
                  {pagination.next && (
                    <button className="load-more-btn" onClick={handleLoadMore}>
                      Load More
                    </button>
                  )}
                </div>

                {selectedService && (
                  <div className="service-details Gland-Quest-data">
                    <label>
                      What do you need{' '}
                      {/[aeiouAEIOU]/.test(toSingular(selectedService.name)) ? 'an ' : 'a '}
                      {toSingular(selectedService.name).replace(/&/g, 'an')} for?
                    </label>
                    <ul className="service-list">
                      {selectedService.services.map((service, index) => (
                        <li
                          key={index}
                          className={`service-item ${
                            activeService === index ? 'active-gland-list-Li' : ''
                          }`}
                          onClick={() => handleServiceClick(index)}
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {expandedService !== null && (
                  <div className="Gland-Quest-data gahys-li">
                    <label>Which best describes your issues?</label>
                    <ul>
                      <li
                        className={`sub-service-item ${
                          activeIndex === 0 ? 'active-ooo-lip' : ''
                        }`}
                        onClick={() => handleClick(0)}
                      >
                        <p>Simple</p>
                        <span>E.g. {selectedService.simpleDescription}</span>
                      </li>
                      <li
                        className={`sub-service-item ${
                          activeIndex === 1 ? 'active-ooo-lip' : ''
                        }`}
                        onClick={() => handleClick(1)}
                      >
                        <p>Complex</p>
                        <span>E.g. {selectedService.complexDescription}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeIndex !== null && (
                  <div className="Gland-Quest-data">
                    <label>Add a description to your job</label>
                    <textarea
                      id="descriptionTextarea"
                      className="description-textarea"
                      value={textareaContent}
                      onChange={handleChange}
                      placeholder="Describe your issue here..."
                    />
                  </div>
                )}
              </div>

              <div className="Gland-Cnt-Btn">
                <button type="button" className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <button type="submit" className="post-job-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
