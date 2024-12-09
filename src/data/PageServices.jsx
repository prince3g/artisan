// const PageServices = [
//   {
//     name: 'Electricians',
//     postName: 'Electrical',
//     services: [
//       'Wiring installation and repairs',
//       'Lighting installations',
//       'Troubleshooting electrical issues',
//       'General electrical maintenance'
//     ],
//     simpleDescription: 'Item which trips the electrics identified, issues with appliances, or few sockets.',
//     complexDescription: 'Multiple appliances affected with several issues.'
//   },
//   {
//     name: 'Plumbers',
//     postName: 'Plumbering',
//     services: [
//       'Pipe installations',
//       'Leak repairs',
//       'Faucet replacements',
//       'Bathroom and kitchen plumbing issues'
//     ],
//      simpleDescription: 'Issues with a single leaking pipe or blocked drain.',
//     complexDescription: 'Multiple leaks or entire plumbing system requiring replacement.'
//   },
//   {
//     name: 'Carpenters & Woodworkers',
//     postName: 'Carpentering and Woodwork',
//     services: [
//       'Installing shelves',
//       'Cabinetry installation',
//       'Furniture repairs',
//       'Custom woodwork installations'
//     ],
//        simpleDescription: 'Basic furniture assembly or shelf installation.',
//     complexDescription: 'Custom woodwork or large-scale carpentry projects.'
//   },
//   {
//     name: 'Painters and Decorators',
//     postName: 'Painting and Decoration',
//     services: [
//       'Interior and exterior painting',
//       'Wallpapering',
//       'Wall repairs and touch-ups'
//     ],
//     simpleDescription: 'Touch-ups or small painting jobs.',
//     complexDescription: 'Full-house painting or exterior jobs with prep work.'
//   },
//   {
//     name: 'HVAC Technicians',
//     postName: 'HVAC Maintenance',
//     services: [
//       'Air conditioning unit maintenance and repair',
//       'Heating system repair',
//       'Ventilation system maintenance'
//     ],
//      simpleDescription: 'Single HVAC unit repair or routine maintenance.',
//     complexDescription: 'Multiple systems requiring repair or replacement.'
//   },
//   {
//     name: 'Roofers',
//     postName: 'Roofing',
//     services: [
//       'Roof repairs and maintenance',
//       'Waterproofing services',
//       'Gutter cleaning or replacements'
//     ],
//      simpleDescription: 'Small leaks or gutter blockages.',
//     complexDescription: 'Full roof replacement or extensive repairs.'
//   },

//   {
//     name: 'Tilers',
//     postName: 'Tiling',
//     services: [
//       'Floor tile installation',
//       'Wall tile installation',
//       'Specialized bathroom and kitchen tiling'
//     ],
//      simpleDescription: 'Small tile repairs or single-room tiling jobs.',
//     complexDescription: 'Large areas or custom tiling designs.'
//   },

//   {
//     name: 'Handyman Services',
//     postName: 'Handyman',
//     services: [
//       'General repair tasks',
//       'Minor installations',
//       'Door repairs',
//       'Furniture assembly'
//     ],
//      simpleDescription: 'Small home repairs or installations.',
//     complexDescription: 'Larger projects needing multiple skill sets.'
//   },
//   {
//     name: 'Pest Control',
//     postName: 'Pest Control',
//     services: [
//       'Pest inspections',
//       'Fumigation services',
//       'Extermination of pests'
//     ],
//      simpleDescription: 'Minor pest problems requiring treatment.',
//     complexDescription: 'Widespread infestations requiring comprehensive services.'
//   },

//   {
//     name: 'Window Cleaners',
//     postName: 'Window Cleaning',
//     services: [
//       'Interior and exterior window cleaning',
//       'High-rise window cleaning for multi-story homes'
//     ],
//      simpleDescription: 'Cleaning of interior windows.',
//     complexDescription: 'Cleaning of large exterior areas or high-rise windows.'
//   },

//   {
//     name: 'Landscapers and Gardeners',
//     postName: 'Landscaping and Gardening',
//     services: [
//       'Lawn mowing',
//       'Planting and landscaping',
//       'Tree trimming',
//       'Garden design'
//     ],
//        simpleDescription: 'Basic lawn care or trimming.',
//     complexDescription: 'Full garden redesign or large tree trimming.'
//   },
  
//   {
//     name: 'Pool Maintenance Technicians',
//     postName: 'Pool Maintenance',
//     services: [
//       'Pool cleaning and maintenance',
//       'Water quality checks',
//       'Pool equipment repairs'
//     ],
//      simpleDescription: 'Routine pool cleaning and chemical checks.',
//     complexDescription: 'Full equipment overhauls or repairs.'
//   },
//   {
//     name: 'Fence and Gate Installer',
//     postName: 'Fencing and Gate Installation',
//     services: [
//       'Fence repairs',
//       'Gate installations',
//       'Security and aesthetic maintenance'
//     ],
//      simpleDescription: 'Small fence repairs or replacements.',
//     complexDescription: 'New fence installations or large-scale repairs.'
//   },
//   {
//     name: 'Outdoor Lighting Installers',
//     postName: 'Outdoor Lighting Installation',
//     services: [
//       'Setting up outdoor lights',
//       'Fixing security lights',
//       'Garden lighting installation'
//     ],
//      simpleDescription: 'Simple outdoor lighting setups.',
//     complexDescription: 'Comprehensive outdoor lighting design and installation.'
//   },
//   {
//     name: 'Interior Designers',
//     postName: 'Interior Design',
//     services: [
//       'In-home consultations for design',
//       'Furniture arrangement services',
//       'Décor recommendations'
//     ],
//      simpleDescription: 'Basic interior styling and furniture rearrangements.',
//     complexDescription: 'Full home redesign or custom décor solutions.'
//   },
//   {
//     name: 'Curtain and Blind Installers',
//     postName: 'Curtain and Blind Installation',
//     services: [
//       'Curtain installations',
//       'Blind repairs or replacements',
//       'Window treatment customization'
//     ],
//       simpleDescription: 'Basic curtain and blind setups.',
//     complexDescription: 'Custom window treatment designs and installations.'
//   },
//   {
//     name: 'Furniture Upholstery Services',
//     postName: 'Furniture Upholstery',
//     services: [
//       'Reupholstering sofas and chairs',
//       'On-site upholstery services',
//       'Pick-up and delivery for larger items'
//     ],
//       simpleDescription: 'Basic reupholstering or furniture repair.',
//     complexDescription: 'Large or custom reupholstery projects.'
//   },
//   {
//     name: 'Plasterers and POP Installers',
//     postName: 'Plastering and POP Installation',
//     services: [
//       'Ceiling installation and repair',
//       'Wall repairs',
//       'Decorative mouldings using Plaster of Paris (POP)'
//     ],
//     simpleDescription: 'Small wall repairs or ceiling touch-ups.',
//     complexDescription: 'Large-scale plastering or custom moulding work.'
//   },
//   {
//     name: 'Home Appliance Technicians',
//     postName: 'Home Appliance Maintenance',
//     services: [
//       'Repairs for refrigerators and washing machines',
//       'Oven and dishwasher maintenance',
//       'Servicing other household appliances'
//     ],
//     simpleDescription: 'Repair of a single appliance or unit.',
//     complexDescription: 'Multiple appliance repairs or replacements.'
//   },
//   {
//     name: 'Generator Technicians',
//     postName: 'Generator Maintenance',
//     services: [
//       'Installation of home generators',
//       'Repairs and servicing of backup power systems'
//     ],
//       simpleDescription: 'Minor generator repairs or servicing.',
//     complexDescription: 'Full generator installation or major repairs.'
//   },
//   {
//     name: 'Solar Panel Installers and Technicians',
//     postName: 'Solar Installation',
//     services: [
//       'Solar panel installation',
//       'Maintenance of inverters and panels',
//       'Renewable energy solutions'
//     ],
//      simpleDescription: 'Basic solar panel installation.',
//     complexDescription: 'Full solar system design and installation.'
//   },
//   {
//     name: 'Home Entertainment System Installers',
//     postName: 'Home Entertainment Installation',
//     services: [
//       'Home theatre system setup',
//       'Sound system installations',
//       'Cable and TV installations'
//     ],
//      simpleDescription: 'Basic home entertainment system installation.',
//     complexDescription: 'Custom home theatre setups with full wiring.'
//   },
//   {
//     name: 'Hair Stylists and Barbers',
//     postName: 'Hair Styling and Barbering',
//     services: [
//       'On-demand hairstyling services',
//       'Braiding and haircut services',
//       'Convenient in-home barber services'
//     ],
//      simpleDescription: 'Basic hairstyling or trimming.',
//     complexDescription: 'Specialty haircuts or complex styling.'
//   },
//   {
//     name: 'Makeup Artists',
//     postName: 'Makeup',
//     services: [
//       'In-home makeup for events',
//       'Makeup for photoshoots',
//       'Everyday or special occasion makeup services'
//     ],
//      simpleDescription: 'Simple makeup for events or photoshoots.',
//     complexDescription: 'Full makeup application for special events.'
//   },
//   {
//     name: 'Massage Therapists and Spa Services',
//     postName: 'Massage and Spa',
//     services: [
//       'At-home massage services',
//       'Facials and skincare treatments',
//       'Relaxation and convenience-focused spa services'
//     ],
//      simpleDescription: 'Simple massage or facial treatment.',
//     complexDescription: 'Full-body massage or extended spa services.'
//   },
//   {
//     name: 'Nail Technicians',
//     postName: 'Nail Services',
//     services: [
//       'Manicures and pedicures',
//       'On-site nail care services for convenience'
//     ],
//      simpleDescription: 'Basic manicures or pedicures.',
//     complexDescription: 'Custom nail art or full-service manicures/pedicures.'
//   },
//   {
//     name: 'House Cleaners and Deep Clean Specialists',
//     postName: 'House Cleaning',
//     services: [
//       'General home cleaning',
//       'Deep cleaning and post-renovation cleaning',
//       'Spring-cleaning services'
//     ],
//      simpleDescription: 'Regular cleaning or tidying.',
//     complexDescription: 'Full deep cleaning or specialized cleaning services.'
//   },
//   {
//     name: 'Carpet and Upholstery Cleaners',
//     postName: 'Carpet and Upholstery Cleaning',
//     services: [
//       'Specialized cleaning for carpets and rugs',
//       'Upholstery cleaning using professional equipment'
//     ],
//      simpleDescription: 'Basic carpet or rug cleaning.',
//     complexDescription: 'Heavy-duty cleaning or specialized services for upholstery.'
//   },
//   {
//     name: 'Laundry and Dry-Cleaning Services',
//     postName: 'Laundry and Dry-Cleaning',
//     services: [
//       'Laundry pick-up and delivery',
//       'Ironing or folding included with service'
//     ],
//     simpleDescription: 'Basic laundry service or ironing.',
//     complexDescription: 'Laundry with special folding or delivery services.'
//   },
//   {
//     name: 'Move-In and Move-Out Cleaners',
//     postName: 'Move-In and Move-Out Cleaning',
//     services: [
//       'Cleaning services for moving in or out',
//       'Tailored for new or leaving homeowners'
//     ],
//      simpleDescription: 'Cleaning services designed for moving in or out of a home.',
//     complexDescription: 'Professional cleaning services that cater specifically to individuals moving into or out of a property. These services ensure that the home is spotless and ready for the next occupant, whether you’re moving in or leaving behind a clean space.'
//   },
//   {
//     name: 'Security System Installers',
//     postName: 'Security Systems',
//     services: [
//       'CCTV camera installation',
//       'Alarm system setups',
//       'Motion detector installations'
//     ],
//     simpleDescription: 'Installation of security systems including cameras, alarms, and motion detectors.',
//     complexDescription: 'Our expert technicians install a variety of security systems to safeguard your home or business. This includes setting up CCTV cameras for surveillance, alarm systems for emergency alerts, and motion detectors for heightened security.'
//   },
//   {
//     name: 'Smart Home Technicians',
//     postName: 'Smart Home Setup',
//     services: [
//       'Smart lock installations',
//       'Thermostat and lighting control setups',
//       'Intercom system installations'
//     ],
//     simpleDescription: 'Setting up smart home devices for convenience and efficiency.',
//     complexDescription: 'Transform your home into a smart home with installations like smart locks for enhanced security, thermostats for optimal temperature control, lighting systems for energy efficiency, and intercom systems for easy communication.'
//   },
//   {
//     name: 'Fire and Smoke Alarm Installers',
//     postName: 'Fire and Smoke Alarms',
//     services: [
//       'Fire and smoke detector installation',
//       'Regular maintenance for safety compliance'
//     ],
//      simpleDescription: 'Installation and maintenance of fire and smoke alarms for safety.',
//     complexDescription: 'Installations of high-quality fire and smoke detectors to ensure your property is protected against fire hazards. We also offer ongoing maintenance services to keep your detectors in top condition and comply with safety regulations.'
//   },
//   {
//     name: 'Pet Groomers',
//     postName: 'Pet Grooming',
//     services: [
//       'Bathing and grooming for pets',
//       'Nail trimming and fur cutting'
//     ],
//      simpleDescription: 'Grooming services for pets including bathing and trimming.',
//     complexDescription: 'Our professional pet groomers provide a full range of services, including bathing, fur cutting, nail trimming, and overall grooming to keep your pet looking and feeling their best.'
//   },
//   {
//     name: 'Pet Sitters and Walkers',
//     postName: 'Pet Sitting and Walking',
//     services: [
//       'Convenient pet-sitting services',
//       'Dog walking for busy owners'
//     ],
//     simpleDescription: 'Pet sitting and dog walking services for busy pet owners.',
//     complexDescription: 'If you’re unable to care for your pet, our pet sitters provide a safe and comfortable environment for them.'
//   }
// ];

// export default PageServices;


import { useState, useEffect } from 'react';

// Function to fetch service categories from the API
const fetchServiceCategories = async () => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  try {
    const response = await fetch(`${djangoHostname}/api/jobs/auth/service-categories/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching service categories:', error);
    return [];
  }
};

// Function to format the data as per the required structure
const formatServiceCategories = (data) => {
  return data.map((category) => ({
    name: category.name,  // Assuming 'name' is part of the response
    postName: category.postName,  // Assuming 'postName' is part of the response
    services: category.services,  // Assuming 'services' is an array in the response
    simpleDescription: category.simpleDescription,  // Assuming 'simpleDescription' is part of the response
    complexDescription: category.complexDescription  // Assuming 'complexDescription' is part of the response
  }));
};

export const PageServices = () => {
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    const getServiceCategories = async () => {
      const data = await fetchServiceCategories();
      const formattedData = formatServiceCategories(data);
      setServiceCategories(formattedData);
    };

    getServiceCategories();
  }, []);

  return serviceCategories;
};

// Export the service categories to use in other components
export default PageServices;
