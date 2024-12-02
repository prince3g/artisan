const PageServices = [
  {
    name: 'electrician',
    postName: 'Electrician',
    services: [
      'Wiring', 
      'Fault Finding', 
      'Repairs'
    ],
    simpleDescription: 'Item which trips the electrics identified, issues with appliances, or few sockets.',
    complexDescription: 'Multiple appliances affected with several issues.'
  },
  {
    name: 'plumber',
    postName: 'Plumber',
    services: [
      'Leak Fixing', 
      'Pipe Replacement', 
      'Drain Cleaning'
    ],
    simpleDescription: 'Issues with a single leaking pipe or blocked drain.',
    complexDescription: 'Multiple leaks or entire plumbing system requiring replacement.'
  },
  {
    name: 'carpenter',
    postName: 'Carpenter',
    services: [
      'Shelving', 
      'Cabinet Making', 
      'Furniture Repair'
    ],
    simpleDescription: 'Basic furniture assembly or shelf installation.',
    complexDescription: 'Custom woodwork or large-scale carpentry projects.'
  },
  {
    name: 'painter',
    postName: 'Painter',
    services: [
      'Interior Painting', 
      'Exterior Painting', 
      'Wallpapering'
    ],
    simpleDescription: 'Touch-ups or small painting jobs.',
    complexDescription: 'Full-house painting or exterior jobs with prep work.'
  },
  {
    name: 'hvac',
    postName: 'HVAC Technician',
    services: [
      'Air Conditioning Repair', 
      'Heating Systems', 
      'Ventilation'
    ],
    simpleDescription: 'Single HVAC unit repair or routine maintenance.',
    complexDescription: 'Multiple systems requiring repair or replacement.'
  },
  {
    name: 'roofer',
    postName: 'Roofer',
    services: [
      'Roof Repair', 
      'Gutter Cleaning', 
      'Roof Installation'
    ],
    simpleDescription: 'Small leaks or gutter blockages.',
    complexDescription: 'Full roof replacement or extensive repairs.'
  },
  {
    name: 'tiler',
    postName: 'Tiler',
    services: [
      'Floor Tiling', 
      'Wall Tiling', 
      'Bathroom Tiling'
    ],
    simpleDescription: 'Small tile repairs or single-room tiling jobs.',
    complexDescription: 'Large areas or custom tiling designs.'
  },
  {
    name: 'handyman',
    postName: 'Handyman',
    services: [
      'Furniture Assembly', 
      'Repairs', 
      'Miscellaneous Tasks'
    ],
    simpleDescription: 'Small home repairs or installations.',
    complexDescription: 'Larger projects needing multiple skill sets.'
  },
  {
    name: 'pestControl',
    postName: 'Pest Control',
    services: [
      'Pest Extermination', 
      'Inspections', 
      'Fumigation'
    ],
    simpleDescription: 'Minor pest problems requiring treatment.',
    complexDescription: 'Widespread infestations requiring comprehensive services.'
  },
  {
    name: 'windowCleaner',
    postName: 'Window Cleaner',
    services: [
      'Interior Cleaning', 
      'Exterior Cleaning', 
      'High Rise Window Cleaning'
    ],
    simpleDescription: 'Cleaning of interior windows.',
    complexDescription: 'Cleaning of large exterior areas or high-rise windows.'
  },
  {
    name: 'landscaper',
    postName: 'Landscaper',
    services: [
      'Lawn Mowing', 
      'Tree Trimming', 
      'Garden Design'
    ],
    simpleDescription: 'Basic lawn care or trimming.',
    complexDescription: 'Full garden redesign or large tree trimming.'
  },
  {
    name: 'poolTechnician',
    postName: 'Pool Technician',
    services: [
      'Pool Cleaning', 
      'Water Quality Checks', 
      'Equipment Repairs'
    ],
    simpleDescription: 'Routine pool cleaning and chemical checks.',
    complexDescription: 'Full equipment overhauls or repairs.'
  },
  {
    name: 'fenceInstaller',
    postName: 'Fence Installer',
    services: [
      'Fence Installation', 
      'Fence Repair', 
      'Gate Installation'
    ],
    simpleDescription: 'Small fence repairs or replacements.',
    complexDescription: 'New fence installations or large-scale repairs.'
  },
  {
    name: 'outdoorLighting',
    postName: 'Outdoor Lighting',
    services: [
      'Outdoor Light Setup', 
      'Security Light Installation', 
      'Garden Lighting'
    ],
    simpleDescription: 'Simple outdoor lighting setups.',
    complexDescription: 'Comprehensive outdoor lighting design and installation.'
  },
  {
    name: 'interiorDesigner',
    postName: 'Interior Designer',
    services: [
      'Design Consultations', 
      'Furniture Arrangements', 
      'Décor Recommendations'
    ],
    simpleDescription: 'Basic interior styling and furniture rearrangements.',
    complexDescription: 'Full home redesign or custom décor solutions.'
  },
  {
    name: 'curtainInstaller',
    postName: 'Curtain Installer',
    services: [
      'Curtain Installation', 
      'Blind Installation', 
      'Window Treatment Customization'
    ],
    simpleDescription: 'Basic curtain and blind setups.',
    complexDescription: 'Custom window treatment designs and installations.'
  },
  {
    name: 'upholsterer',
    postName: 'Upholsterer',
    services: [
      'Sofa Upholstery', 
      'Chair Upholstery', 
      'Furniture Repair'
    ],
    simpleDescription: 'Basic reupholstering or furniture repair.',
    complexDescription: 'Large or custom reupholstery projects.'
  },
  {
    name: 'plasterer',
    postName: 'Plasterer',
    services: [
      'Ceiling Installation', 
      'Wall Repair', 
      'Plaster Moulding'
    ],
    simpleDescription: 'Small wall repairs or ceiling touch-ups.',
    complexDescription: 'Large-scale plastering or custom moulding work.'
  },
  {
    name: 'applianceTechnician',
    postName: 'Appliance Technician',
    services: [
      'Refrigerator Repairs', 
      'Washing Machine Repair', 
      'Dishwasher Maintenance'
    ],
    simpleDescription: 'Repair of a single appliance or unit.',
    complexDescription: 'Multiple appliance repairs or replacements.'
  },
  {
    name: 'generatorTechnician',
    postName: 'Generator Technician',
    services: [
      'Generator Installation', 
      'Generator Repair', 
      'Servicing Backup Systems'
    ],
    simpleDescription: 'Minor generator repairs or servicing.',
    complexDescription: 'Full generator installation or major repairs.'
  },
  {
    name: 'solarTechnician',
    postName: 'Solar Technician',
    services: [
      'Panel Installation', 
      'Inverter Repair', 
      'Solar System Maintenance'
    ],
    simpleDescription: 'Basic solar panel installation.',
    complexDescription: 'Full solar system design and installation.'
  },
  {
    name: 'homeEntertainment',
    postName: 'Home Entertainment',
    services: [
      'Home Theatre Setup', 
      'Sound System Installation', 
      'TV and Cable Setup'
    ],
    simpleDescription: 'Basic home entertainment system installation.',
    complexDescription: 'Custom home theatre setups with full wiring.'
  },
  {
    name: 'hairStylist',
    postName: 'Hair Stylist',
    services: [
      'Hairstyling', 
      'Haircuts', 
      'Braiding'
    ],
    simpleDescription: 'Basic hairstyling or trimming.',
    complexDescription: 'Specialty haircuts or complex styling.'
  },
  {
    name: 'makeupArtist',
    postName: 'Makeup Artist',
    services: [
      'Event Makeup', 
      'Photoshoot Makeup', 
      'Everyday Makeup'
    ],
    simpleDescription: 'Simple makeup for events or photoshoots.',
    complexDescription: 'Full makeup application for special events.'
  },
  {
    name: 'massageTherapist',
    postName: 'Massage Therapist',
    services: [
      'At-Home Massage', 
      'Facials', 
      'Spa Treatments'
    ],
    simpleDescription: 'Simple massage or facial treatment.',
    complexDescription: 'Full-body massage or extended spa services.'
  },
  {
    name: 'nailTechnician',
    postName: 'Nail Technician',
    services: [
      'Manicures', 
      'Pedicures', 
      'Nail Art'
    ],
    simpleDescription: 'Basic manicures or pedicures.',
    complexDescription: 'Custom nail art or full-service manicures/pedicures.'
  },
  {
    name: 'houseCleaner',
    postName: 'House Cleaner',
    services: [
      'Regular Cleaning', 
      'Deep Cleaning', 
      'Post-Renovation Cleaning'
    ],
    simpleDescription: 'Regular cleaning or tidying.',
    complexDescription: 'Full deep cleaning or specialized cleaning services.'
  },
  {
    name: 'carpetCleaner',
    postName: 'Carpet Cleaner',
    services: [
      'Carpet Cleaning', 
      'Upholstery Cleaning'
    ],
    simpleDescription: 'Basic carpet or rug cleaning.',
    complexDescription: 'Heavy-duty cleaning or specialized services for upholstery.'
  },
  {
    name: 'laundry',
    postName: 'Laundry Services',
    services: [
      'Pick-Up and Delivery', 
      'Ironing', 
      'Folding'
    ],
    simpleDescription: 'Basic laundry service or ironing.',
    complexDescription: 'Laundry with special folding or delivery services.'
  },
  {
    name: 'Move-In and Move-Out Cleaners',
    postName: 'Move-In and Move-Out Cleaning',
    services: [
      'Cleaning services for moving in or out',
      'Tailored for new or leaving homeowners'
    ],
    simpleDescription: 'Cleaning services designed for moving in or out of a home.',
    complexDescription: 'Professional cleaning services that cater specifically to individuals moving into or out of a property. These services ensure that the home is spotless and ready for the next occupant, whether you’re moving in or leaving behind a clean space.'
  },
  {
    name: 'Security System Installers',
    postName: 'Security Systems',
    services: [
      'CCTV camera installation',
      'Alarm system setups',
      'Motion detector installations'
    ],
    simpleDescription: 'Installation of security systems including cameras, alarms, and motion detectors.',
    complexDescription: 'Our expert technicians install a variety of security systems to safeguard your home or business. This includes setting up CCTV cameras for surveillance, alarm systems for emergency alerts, and motion detectors for heightened security.'
  },
  {
    name: 'Smart Home Technicians',
    postName: 'Smart Home Setup',
    services: [
      'Smart lock installations',
      'Thermostat and lighting control setups',
      'Intercom system installations'
    ],
    simpleDescription: 'Setting up smart home devices for convenience and efficiency.',
    complexDescription: 'Transform your home into a smart home with installations like smart locks for enhanced security, thermostats for optimal temperature control, lighting systems for energy efficiency, and intercom systems for easy communication.'
  },
  {
    name: 'Fire and Smoke Alarm Installers',
    postName: 'Fire and Smoke Alarms',
    services: [
      'Fire and smoke detector installation',
      'Regular maintenance for safety compliance'
    ],
    simpleDescription: 'Installation and maintenance of fire and smoke alarms for safety.',
    complexDescription: 'Installations of high-quality fire and smoke detectors to ensure your property is protected against fire hazards. We also offer ongoing maintenance services to keep your detectors in top condition and comply with safety regulations.'
  },
  {
    name: 'Pet Groomers',
    postName: 'Pet Grooming',
    services: [
      'Bathing and grooming for pets',
      'Nail trimming and fur cutting'
    ],
    simpleDescription: 'Grooming services for pets including bathing and trimming.',
    complexDescription: 'Our professional pet groomers provide a full range of services, including bathing, fur cutting, nail trimming, and overall grooming to keep your pet looking and feeling their best.'
  },
  {
    name: 'Pet Sitters and Walkers',
    postName: 'Pet Sitting and Walking',
    services: [
      'Convenient pet-sitting services',
      'Dog walking for busy owners'
    ],
    simpleDescription: 'Pet sitting and dog walking services for busy pet owners.',
    complexDescription: 'If you’re unable to care for your pet, our pet sitters provide a safe and comfortable environment for them.'
  }
  
];

export default PageServices;
