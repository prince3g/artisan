// // import React, { useState } from "react";
// // import Slider from "react-slick";
// // import { Close } from '@mui/icons-material';
// // import PageServices from '../data/PageServices';
// // import { Link } from 'react-router-dom'; 
// // import ArrowForward from '@mui/icons-material/ArrowForward';
// // import {
// //   ArrowBack as PrevIcon,
// //   ArrowForward as NextIcon,
// //   Bolt as ElectricianIcon,
// //   Plumbing as PlumberIcon,
// //   Carpenter as CarpenterIcon,
// //   Brush as PainterIcon,
// //   AcUnit as HVACIcon,
// //   Roofing as RooferIcon,
// //   Construction as HandymanIcon,
// //   PestControl as PestControlIcon,
// //   CleaningServices as CleanerIcon,
// //   Grass as GardenerIcon,
// //   Pool as PoolMaintenanceIcon,
// //   Fence as FenceInstallerIcon,
// //   Lightbulb as LightingIcon,
// //   DesignServices as InteriorDesignerIcon,
// //   Chair as UpholsteryIcon,
// //   Layers as PlastererIcon,
// //   Settings as ApplianceTechnicianIcon,
// //   Build as GenTechIcon,
// //   Tv as EntertainmentIcon,
// //   SolarPower as SolarPanelIcon,
// //   Spa as HairStylistIcon,
// //   FaceRetouchingNatural as MakeupArtistIcon,
// //   Spa as MassageTherapyIcon, // Import Spa icon
// //   Hardware as NailTechnicianIcon,
// //   Weekend as CarpetCleanerIcon,
// //   LocalLaundryService as LaundryIcon,
// //   Moving as MoveCleanerIcon,
// //   Security as SecurityIcon,
// //   Home as SmartHomeIcon,
// //   Notifications as FireAlarmIcon,
// //   Pets as PetGroomerIcon,
// //   DirectionsWalk as PetSitterIcon,
// // } from "@mui/icons-material";




// // const serviceIcons = {
// //   "Electricians": <ElectricianIcon />,
// //   "Plumbers": <PlumberIcon />,
// //   "Carpenters & Woodworkers": <CarpenterIcon />,
// //   "Painters and Decorators": <PainterIcon />,
// //   "HVAC Technicians": <HVACIcon />,
// //   "Roofers": <RooferIcon />,
// //   "Tilers": <PlastererIcon />,
// //   "Handyman Services": <HandymanIcon />,
// //   "Pest Control": <PestControlIcon />,
// //   "Window Cleaners": <CleanerIcon />,
// //   "Landscapers and Gardeners": <GardenerIcon />,
// //   "Pool Maintenance Technicians": <PoolMaintenanceIcon />,
// //   "Fence and Gate Installer": <FenceInstallerIcon />,
// //   "Outdoor Lighting Installers": <LightingIcon />,
// //   "Interior Designers": <InteriorDesignerIcon />,
// //   "Furniture Upholstery Services": <UpholsteryIcon />,
// //   "Plasterers and POP Installers": <PlastererIcon />,
// //   "Home Appliance Technicians": <ApplianceTechnicianIcon />,
// //   "Generator Technicians": <GenTechIcon />,
// //   "Solar Panel Installers and Technicians": <SolarPanelIcon />,
// //   "Home Entertainment System Installers": <EntertainmentIcon />,
// //   "Hair Stylists and Barbers": <HairStylistIcon />,
// //   "Makeup Artists": <MakeupArtistIcon />,
// //   "Massage Therapists and Spa Services": <MassageTherapyIcon />,
// //   "Nail Technicians": <NailTechnicianIcon />,
// //   "House Cleaners and Deep Clean Specialists": <CleanerIcon />,
// //   "Carpet and Upholstery Cleaners": <CarpetCleanerIcon />,
// //   "Laundry and Dry-Cleaning Services": <LaundryIcon />,
// //   "Move-In and Move-Out Cleaners": <MoveCleanerIcon />,
// //   "Security System Installers": <SecurityIcon />,
// //   "Smart Home Technicians": <SmartHomeIcon />,
// //   "Fire and Smoke Alarm Installers": <FireAlarmIcon />,
// //   "Pet Groomers": <PetGroomerIcon />,
// //   "Pet Sitters and Walkers": <PetSitterIcon />,
// //   "Curtain and Blind Installers": <HandymanIcon />, // Added missing entry
// //   "Tiling Services": <PlastererIcon /> // Added missing entry for "Tilers"
// // };




// // const ServiceSlider = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const itemsPerPage = 6;

// //   const handlePrev = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex - itemsPerPage < 0 ? 0 : prevIndex - itemsPerPage
// //     );
// //   };

// //   const handleNext = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex + itemsPerPage >= PageServices.length
// //         ? prevIndex
// //         : prevIndex + itemsPerPage
// //     );
// //   };

// //   const [selectedService, setSelectedService] = useState(null);

// //   const handleServiceClick = (service) => {
// //     setSelectedService(service);
// //   };

// //   const handleClosePopup = () => {
// //     setSelectedService(null);
// //   };

// //   // Slice the PageServices array based on the current index and items per page
// //   const visibleServices = PageServices.slice(currentIndex, currentIndex + itemsPerPage);

// //   return (
// //     <div className="service-slider-container">
// //       <Slider
// //         dots={false}
// //         infinite={false}
// //         speed={500}
// //         slidesToShow={6}
// //         slidesToScroll={1}
// //         responsive={[
// //           {
// //             breakpoint: 1024,
// //             settings: { slidesToShow: 4 },
// //           },
// //           {
// //             breakpoint: 768,
// //             settings: { slidesToShow: 3 },
// //           },
// //           {
// //             breakpoint: 480,
// //             settings: { slidesToShow: 2 },
// //           },
// //           {
// //             breakpoint: 350,
// //             settings: { slidesToShow: 1 },
// //           },
// //         ]}
// //       >
// //     {visibleServices.map((service) => (
// //           <div key={service.name} className="service-slide" onClick={() => handleServiceClick(service)}>
// //              <button onClick={() => handleServiceClick(service)}>
// //       <div className="icon-container">{serviceIcons[service.name]}</div>
// //       <p>{service.name}</p>
// //     </button>
         
// //           </div>
// //         ))}

// //       </Slider>

// //       {/* Custom Next and Prev Buttons with Icons */}

// //       <div className="navigation-buttons">
// //         <button className="slider-btn prev-btn" onClick={handlePrev} disabled={currentIndex === 0}>
// //           <PrevIcon />
// //         </button>
// //         <button className="slider-btn next-btn"
// //           onClick={handleNext}
// //           disabled={currentIndex + itemsPerPage >= PageServices.length}
// //         >
// //           <NextIcon />
// //         </button>
// //       </div>

// //  {/* Popup Section */}
// //  {selectedService && (
// //         <div className="Services-PopUp-Sec">
// //           <div className="Services-PopUp-Box">
// //             <div className="Services-PopUp-Box-Header">
// //               <h3>What do you need {selectedService.name} for?</h3>
// //               <button onClick={handleClosePopup} className="Close-Service-PopUp">
// //                 <Close />
// //               </button>
// //             </div>
// //             <div className="Services-PopUp-Box-Main">
// //               <ul>
// //                 {selectedService.services.map((service, idx) => (
// //                   <li key={idx}>
// //                <Link
// //                   to={`/search-results?trade=${selectedService.name}&service=${service}&services=${encodeURIComponent(
// //                     JSON.stringify(selectedService.services)
// //                   )}`}
// //                   onClick={() => {
// //                     window.scrollTo(0, 0); // Scroll to top
// //                     handleClosePopup();
// //                   }}
// //                 >
// //                   {service} <ArrowForward />
// //                 </Link>


                        
                          
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       )}


// //     </div>
// //   );
// // };

// // export default ServiceSlider;



// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import { Close } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import {
//   ArrowBack as PrevIcon,
//   ArrowForward as NextIcon,
//   Bolt as ElectricianIcon,
//   Plumbing as PlumberIcon,
//   Carpenter as CarpenterIcon,
//   Brush as PainterIcon,
//   AcUnit as HVACIcon,
//   Roofing as RooferIcon,
//   Construction as HandymanIcon,
//   PestControl as PestControlIcon,
//   CleaningServices as CleanerIcon,
//   Grass as GardenerIcon,
//   Pool as PoolMaintenanceIcon,
//   Fence as FenceInstallerIcon,
//   Lightbulb as LightingIcon,
//   DesignServices as InteriorDesignerIcon,
//   Chair as UpholsteryIcon,
//   Layers as PlastererIcon,
//   Settings as ApplianceTechnicianIcon,
//   Build as GenTechIcon,
//   Tv as EntertainmentIcon,
//   SolarPower as SolarPanelIcon,
//   Spa as HairStylistIcon,
//   FaceRetouchingNatural as MakeupArtistIcon,
//   Spa as MassageTherapyIcon, // Import Spa icon
//   Hardware as NailTechnicianIcon,
//   Weekend as CarpetCleanerIcon,
//   LocalLaundryService as LaundryIcon,
//   Moving as MoveCleanerIcon,
//   Security as SecurityIcon,
//   Home as SmartHomeIcon,
//   Notifications as FireAlarmIcon,
//   Pets as PetGroomerIcon,
//   DirectionsWalk as PetSitterIcon,
// } from "@mui/icons-material";


// const serviceIcons = {
//   "Electricians": <ElectricianIcon />,
//   "Plumbers": <PlumberIcon />,
//   "Carpenters & Woodworkers": <CarpenterIcon />,
//   "Painters and Decorators": <PainterIcon />,
//   "HVAC Technicians": <HVACIcon />,
//   "Roofers": <RooferIcon />,
//   "Tilers": <PlastererIcon />,
//   "Handyman Services": <HandymanIcon />,
//   "Pest Control": <PestControlIcon />,
//   "Window Cleaners": <CleanerIcon />,
//   "Landscapers and Gardeners": <GardenerIcon />,
//   "Pool Maintenance Technicians": <PoolMaintenanceIcon />,
//   "Fence and Gate Installer": <FenceInstallerIcon />,
//   "Outdoor Lighting Installers": <LightingIcon />,
//   "Interior Designers": <InteriorDesignerIcon />,
//   "Furniture Upholstery Services": <UpholsteryIcon />,
//   "Plasterers and POP Installers": <PlastererIcon />,
//   "Home Appliance Technicians": <ApplianceTechnicianIcon />,
//   "Generator Technicians": <GenTechIcon />,
//   "Solar Panel Installers and Technicians": <SolarPanelIcon />,
//   "Home Entertainment System Installers": <EntertainmentIcon />,
//   "Hair Stylists and Barbers": <HairStylistIcon />,
//   "Makeup Artists": <MakeupArtistIcon />,
//   "Massage Therapists and Spa Services": <MassageTherapyIcon />,
//   "Nail Technicians": <NailTechnicianIcon />,
//   "House Cleaners and Deep Clean Specialists": <CleanerIcon />,
//   "Carpet and Upholstery Cleaners": <CarpetCleanerIcon />,
//   "Laundry and Dry-Cleaning Services": <LaundryIcon />,
//   "Move-In and Move-Out Cleaners": <MoveCleanerIcon />,
//   "Security System Installers": <SecurityIcon />,
//   "Smart Home Technicians": <SmartHomeIcon />,
//   "Fire and Smoke Alarm Installers": <FireAlarmIcon />,
//   "Pet Groomers": <PetGroomerIcon />,
//   "Pet Sitters and Walkers": <PetSitterIcon />,
//   "Curtain and Blind Installers": <HandymanIcon />, // Added missing entry
//   "Tiling Services": <PlastererIcon /> // Added missing entry for "Tilers"
// };


// const ServiceSlider = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [services, setServices] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedService, setSelectedService] = useState(null);
//   const [nextPage, setNextPage] = useState(`${djangoHostname}/api/jobs/auth/service-categories/`);
//   const itemsPerPage = 10;

//   const fetchServices = async (url) => {
//     if (!url) return;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setServices((prevServices) => [...prevServices, ...data.results]);
//       setNextPage(data.next);
//     } catch (error) {
//       console.error("Failed to fetch services:", error);
//     }
//   };

//   useEffect(() => {
//     fetchServices(nextPage);
//   }, []);

//   const handleNext = () => {
//     if (currentIndex + itemsPerPage >= services.length && nextPage) {
//       fetchServices(nextPage);
//     }
//     setCurrentIndex((prevIndex) =>
//       prevIndex + itemsPerPage >= services.length ? prevIndex : prevIndex + itemsPerPage
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage < 0 ? 0 : prevIndex - itemsPerPage));
//   };

//   const handleServiceClick = (service) => {
//     setSelectedService(service);
//   };

//   const handleClosePopup = () => {
//     setSelectedService(null);
//   };

//   const visibleServices = services.slice(currentIndex, currentIndex + itemsPerPage);

//   return (
//     <div className="service-slider-container">
//       <Slider
//         dots={false}
//         infinite={false}
//         speed={500}
//         slidesToShow={6}
//         slidesToScroll={1}
//         responsive={[
//           { breakpoint: 1024, settings: { slidesToShow: 4 } },
//           { breakpoint: 768, settings: { slidesToShow: 3 } },
//           { breakpoint: 480, settings: { slidesToShow: 2 } },
//           { breakpoint: 350, settings: { slidesToShow: 1 } },
//         ]}
//       >
//         {visibleServices.map((service) => (
//           <div
//             key={service.unique_id}
//             className="service-slide"
//             onClick={() => handleServiceClick(service)}
//           >
//             <button>
//               <div className="icon-container">{serviceIcons[service.name]}</div>
//               <p>{service.name}</p>
//             </button>
//           </div>
//         ))}
//       </Slider>

//       {/* Navigation buttons */}
//       <div className="navigation-buttons">
//         <button className="slider-btn prev-btn" onClick={handlePrev} disabled={currentIndex === 0}>
//           <PrevIcon />
//         </button>
//         <button
//           className="slider-btn next-btn"
//           onClick={handleNext}
//           disabled={currentIndex + itemsPerPage >= services.length && !nextPage}
//         >
//           <NextIcon />
//         </button>
//       </div>

//       {/* Popup Section */}
//       {selectedService && (
//         <div className="Services-PopUp-Sec">
//           <div className="Services-PopUp-Box">
//             <div className="Services-PopUp-Box-Header">
//               <h3>What do you need {selectedService.name} for?</h3>
//               <button onClick={handleClosePopup} className="Close-Service-PopUp">
//                 <Close />
//               </button>
//             </div>
//             <div className="Services-PopUp-Box-Main">
//               <ul>
//                 {selectedService.services.map((service, idx) => (
//                   <li key={idx}>
//                     <Link
//                       to={`/search-results?trade=${selectedService.name}&service=${service}&service_details_id=${selectedService.unique_id}&services=${encodeURIComponent(
//                         JSON.stringify(selectedService.services)


//                       )}`}
//                       onClick={() => {
//                         window.scrollTo(0, 0);
//                         handleClosePopup();
//                       }}
//                     >
//                       {service} <NextIcon />
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServiceSlider;




















import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  ArrowBack as PrevIcon,
  ArrowForward as NextIcon,
  Bolt as ElectricianIcon,
  Plumbing as PlumberIcon,
  Carpenter as CarpenterIcon,
  Brush as PainterIcon,
  AcUnit as HVACIcon,
  Roofing as RooferIcon,
  Construction as HandymanIcon,
  PestControl as PestControlIcon,
  CleaningServices as CleanerIcon,
  Grass as GardenerIcon,
  Pool as PoolMaintenanceIcon,
  Fence as FenceInstallerIcon,
  Lightbulb as LightingIcon,
  DesignServices as InteriorDesignerIcon,
  Chair as UpholsteryIcon,
  Layers as PlastererIcon,
  Settings as ApplianceTechnicianIcon,
  Build as GenTechIcon,
  Tv as EntertainmentIcon,
  SolarPower as SolarPanelIcon,
  Spa as HairStylistIcon,
  FaceRetouchingNatural as MakeupArtistIcon,
  Spa as MassageTherapyIcon, // Import Spa icon
  Hardware as NailTechnicianIcon,
  Weekend as CarpetCleanerIcon,
  LocalLaundryService as LaundryIcon,
  Moving as MoveCleanerIcon,
  Security as SecurityIcon,
  Home as SmartHomeIcon,
  Notifications as FireAlarmIcon,
  Pets as PetGroomerIcon,
  DirectionsWalk as PetSitterIcon,
} from "@mui/icons-material";


const serviceIcons = {
  "Electricians": <ElectricianIcon />,
  "Plumbers": <PlumberIcon />,
  "Carpenters & Woodworkers": <CarpenterIcon />,
  "Painters and Decorators": <PainterIcon />,
  "HVAC Technicians": <HVACIcon />,
  "Roofers": <RooferIcon />,
  "Tilers": <PlastererIcon />,
  "Handyman Services": <HandymanIcon />,
  "Pest Control": <PestControlIcon />,
  "Window Cleaners": <CleanerIcon />,
  "Landscapers and Gardeners": <GardenerIcon />,
  "Pool Maintenance Technicians": <PoolMaintenanceIcon />,
  "Fence and Gate Installer": <FenceInstallerIcon />,
  "Outdoor Lighting Installers": <LightingIcon />,
  "Interior Designers": <InteriorDesignerIcon />,
  "Furniture Upholstery Services": <UpholsteryIcon />,
  "Plasterers and POP Installers": <PlastererIcon />,
  "Home Appliance Technicians": <ApplianceTechnicianIcon />,
  "Generator Technicians": <GenTechIcon />,
  "Solar Panel Installers and Technicians": <SolarPanelIcon />,
  "Home Entertainment System Installers": <EntertainmentIcon />,
  "Hair Stylists and Barbers": <HairStylistIcon />,
  "Makeup Artists": <MakeupArtistIcon />,
  "Massage Therapists and Spa Services": <MassageTherapyIcon />,
  "Nail Technicians": <NailTechnicianIcon />,
  "House Cleaners and Deep Clean Specialists": <CleanerIcon />,
  "Carpet and Upholstery Cleaners": <CarpetCleanerIcon />,
  "Laundry and Dry-Cleaning Services": <LaundryIcon />,
  "Move-In and Move-Out Cleaners": <MoveCleanerIcon />,
  "Security System Installers": <SecurityIcon />,
  "Smart Home Technicians": <SmartHomeIcon />,
  "Fire and Smoke Alarm Installers": <FireAlarmIcon />,
  "Pet Groomers": <PetGroomerIcon />,
  "Pet Sitters and Walkers": <PetSitterIcon />,
  "Curtain and Blind Installers": <HandymanIcon />, // Added missing entry
  "Tiling Services": <PlastererIcon /> // Added missing entry for "Tilers"
};

const ServiceSlider = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${djangoHostname}/api/jobs/auth/service-categories/`);
      const data = await response.json();
      setServices(data); // Assuming API response directly gives the list of services
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
  };

  return (
    <div className="service-slider-container">
      <Slider
        dots={false}
        infinite={false}
        speed={500}
        slidesToShow={6}
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 4 } },
          { breakpoint: 768, settings: { slidesToShow: 3 } },
          { breakpoint: 480, settings: { slidesToShow: 2 } },
          { breakpoint: 350, settings: { slidesToShow: 1 } },
        ]}
      >
        {services.map((service) => (
          <div
            key={service.unique_id}
            className="service-slide"
            onClick={() => handleServiceClick(service)}
          >
            <button>
              <div className="icon-container">{serviceIcons[service.name]}</div>
              <p>{service.name}</p>
            </button>
          </div>
        ))}
      </Slider>

      {/* Popup Section */}
      {selectedService && (
        <div className="Services-PopUp-Sec">
          <div className="Services-PopUp-Box">
            <div className="Services-PopUp-Box-Header">
              <h3>What do you need {selectedService.name} for?</h3>
              <button onClick={handleClosePopup} className="Close-Service-PopUp">
                <Close />
              </button>
            </div>
            <div className="Services-PopUp-Box-Main">
              <ul>
                {selectedService.services.map((service, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/post-code?trade=${selectedService.name}&service=${service}&service_details_id=${selectedService.unique_id}&services=${encodeURIComponent(
                        JSON.stringify(selectedService.services)
                      )}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        handleClosePopup();
                      }}
                    >
                      {service} <NextIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSlider;


