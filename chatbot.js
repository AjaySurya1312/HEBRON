/* ================================================================
   HEBRON AUTOMOTIVE — Chatbot "Hebro"
   Enhanced knowledge-based conversational assistant.
   Covers: company info + automotive manufacturing + quality systems
   + materials + careers + industry general knowledge.
   ================================================================ */

(function () {
  'use strict';

  // ── KNOWLEDGE BASE ─────────────────────────────────────────────
  // Each entry: keywords[] (matched against user input) + response
  const KB = [

    /* ── COMPANY INFO ─────────────────────────────────────── */
    {
      id: 'about',
      keywords: ['who are you', 'about hebron', 'about company', 'what is hebron', 'tell me about', 'company history', 'founded', 'established', 'when was', 'background'],
      response: `Hebron Automotive Products Pvt. Ltd. was founded in 2019 by Mr. N. Kumar, a specialist in Die Casting and Machine Tool Technology.\n\n📍 Located in Hosur, Tamil Nadu\n👥 120+ skilled employees\n🏭 Full in-house: Casting → Machining → Coating → Assembly\n🏆 Certified: IATF 16949:2016, ISO 9001:2015, ISO 14001:2015\n\nWe are a trusted Tier-1 supplier to Gabriel India and Hitachi Astemo.`
    },
    {
      id: 'products',
      keywords: ['product', 'what do you make', 'manufacture', 'produce', 'component', 'parts', 'shock absorber', 'outer tube', 'spring seat', 'eyelet', 'housing', 'bracket'],
      response: `We manufacture precision aluminium automotive components:\n\n🔩 Shock Absorber Outer Tubes (LH & RH)\n🔩 Spring Seat Adjusters\n🔩 Eyelet Assemblies with Sleeves\n🔩 Aluminium Housings & Brackets\n🔩 Custom CNC-Machined Die Castings\n\nAll products are 100% inspected and delivered ready-to-assemble to OEM specifications.`
    },
    {
      id: 'capabilities',
      keywords: ['capability', 'service', 'what can you do', 'process', 'facilities', 'plant', 'operations'],
      response: `Our end-to-end manufacturing capabilities:\n\n🔧 High Pressure Die Casting (7 PDC machines, 120T–250T)\n🔧 Gravity Die Casting (7 GDC machines)\n🔧 CNC / VMC Machining (5 HAAS USA VMC + 2 CNC + 10 Auto Traub)\n🔧 Powder Coating (2 semi-automatic conveyor lines)\n🔧 Bush Assembly & Finishing\n🔧 Full Tool Room (Wire EDM, Surface Grinding)\n\n34% free capacity — ready for new programs!`
    },
    {
      id: 'quality',
      keywords: ['quality', 'certificate', 'certification', 'iatf', 'iso', 'standard', 'inspection', 'testing', 'audit', 'defect', 'zero defect', 'qms'],
      response: `Quality is our core promise:\n\n✅ IATF 16949:2016 — Automotive Quality Management\n✅ ISO 9001:2015 — Quality Management System\n✅ ISO 14001:2015 — Environmental Management\n\nInspection equipment:\n• Video Measuring Machine (VMM)\n• Universal Testing Machine (UTM)\n• Optical Emission Spectrometer\n• Surface Roughness Tester (Ra)\n• 2D Master / Height Gauge\n• DFT Meter (Powder Coating)\n• Salt Spray Test Chamber (SST)`
    },
    {
      id: 'clients',
      keywords: ['client', 'customer', 'partner', 'gabriel', 'hitachi', 'oem', 'supply to', 'who do you supply', 'tier'],
      response: `Our OEM customers:\n\n🏭 Gabriel India Ltd.\n   • Hosur Main Plant\n   • Hosur Satellite Plant\n   • Nashik Plant, Maharashtra\n   • Parwanoo Plant, Himachal Pradesh\n\n🏭 Hitachi Astemo Rajasthan Brake Systems Pvt. Ltd.\n   • Tumkur Plant, Karnataka\n\nWe are an approved Tier-1 automotive supplier across India.`
    },
    {
      id: 'contact',
      keywords: ['contact', 'phone', 'email', 'address', 'location', 'reach', 'call', 'hosur', 'where are you', 'visit', 'office'],
      response: `📍 No. 3/250, Bharathiyar Nagar, Avalapalli Road\n   Hosur – 635109, Krishnagiri Dist., Tamil Nadu\n\n📞 +91 63811 00663 (Main)\n📞 +91 94426 19772 (MD: Mr. N. Kumar)\n📧 info@hebronautomotive.com\n\n🕐 Mon–Fri: 8:30 AM – 5:30 PM\n🕐 Saturday: 8:30 AM – 1:30 PM`
    },
    {
      id: 'internship',
      keywords: ['intern', 'internship', 'student', 'training', 'college', 'apply internship', 'engineering student', 'diploma', 'project', 'industrial training'],
      response: `We welcome engineering interns! 🎓\n\nDepartments open:\n• Production & Die Casting\n• CNC / VMC Operations\n• Quality & Inspection\n• Design & Engineering\n• Maintenance\n• Administration\n\nDuration: 1–6 months\nEligibility: BE / Diploma Engineering students\nStipend: Performance-based\nCertificate: Issued on completion\n\nApply on our Internship page or email info@hebronautomotive.com`
    },
    {
      id: 'careers',
      keywords: ['job', 'career', 'vacancy', 'hiring', 'recruitment', 'work at', 'join hebron', 'employment', 'opening', 'apply job'],
      response: `We're growing! Current hiring areas:\n\n• Production Operators (Die Casting)\n• CNC / VMC Machinists\n• Quality Engineers\n• Tool Room Technicians\n• Maintenance Engineers\n• Supervisors\n\nSend your resume to info@hebronautomotive.com or visit our Careers page. Fresh graduates and experienced professionals both welcome.`
    },
    {
      id: 'capacity',
      keywords: ['capacity', 'free capacity', 'available', 'new order', 'can you take', 'bandwidth', 'lead time'],
      response: `Yes! We currently have 34% free manufacturing capacity.\n\nThis means we can:\n✔ Immediately absorb new customer programs\n✔ Handle volume ramps without new capital investment\n✔ Offer competitive lead times\n\nContact our team to discuss your requirement and get a quote within 24 hours.`
    },
    {
      id: 'machines',
      keywords: ['machine', 'equipment', 'haas', 'toyo', 'technocrats', 'how many machines', 'vmc', 'traub', 'edm', 'furnace'],
      response: `Our key equipment:\n\n🔩 7 PDC Machines (120T–250T) — Toyo & Technocrats\n🔩 7 GDC Machines + 3 Melting Furnaces + 1 Holding Furnace\n🔩 5 HAAS USA VMC Machining Centres\n🔩 2 CNC Turning Centres\n🔩 10 Auto Traub Lathes (up to Ø32mm)\n🔩 1 Wire EDM Machine\n🔩 1 Surface Grinding Machine\n🔩 2 Semi-Automatic Powder Coating Lines\n🔩 3 Bush Fitting Machines + 4 Presses (10T)`
    },
    {
      id: 'quote',
      keywords: ['quote', 'price', 'cost', 'enquiry', 'inquiry', 'how much', 'rate', 'rfq', 'request'],
      response: `To get a manufacturing quote:\n\n1. Visit our Contact page and fill the inquiry form\n2. Email: info@hebronautomotive.com\n3. WhatsApp: +91 94426 19772\n4. Call: +91 63811 00663\n\nPlease share your component drawing, material spec, quantity, and required tolerance. We respond within 24 hours! 🚀`
    },

    /* ── AUTOMOTIVE MANUFACTURING — GENERAL ───────────────── */
    {
      id: 'die_casting_general',
      keywords: ['what is die casting', 'die casting process', 'explain die casting', 'how die casting works', 'die casting meaning'],
      response: `Die casting is a metal casting process where molten metal is forced under high pressure into a mould cavity (die).\n\n🔹 High Pressure Die Casting (HPDC): Metal injected at 1,500–25,000 psi. Fast cycle times, tight tolerances, high volume.\n🔹 Gravity Die Casting (GDC): Metal poured by gravity. Better for thicker walls, fewer porosity issues.\n\nAluminium is the most common die casting alloy due to its light weight, strength, and corrosion resistance.`
    },
    {
      id: 'hpdc',
      keywords: ['hpdc', 'high pressure', 'pressure die casting', 'cold chamber', 'hot chamber'],
      response: `High Pressure Die Casting (HPDC):\n\n• Metal injected at 10–175 MPa pressure\n• Very fast cycle times (seconds per shot)\n• Excellent dimensional consistency\n• Best for thin-walled, complex shapes\n• Cold chamber: used for aluminium (higher melting point)\n• Hot chamber: used for zinc, magnesium\n\nHebron operates 7 HPDC machines from 120T to 250T clamping force.`
    },
    {
      id: 'gdc',
      keywords: ['gdc', 'gravity die casting', 'permanent mould casting', 'tilt casting'],
      response: `Gravity Die Casting (GDC):\n\n• Molten metal poured by gravity into a reusable steel die\n• Better for thicker sections and structural parts\n• Lower porosity than HPDC for certain geometries\n• Slower than HPDC but more flexible for part complexity\n• Ideal for: suspension housings, shock absorber tubes\n\nHebron has 7 GDC machines, making us strong in both HPDC and GDC.`
    },
    {
      id: 'aluminium_alloys',
      keywords: ['aluminium alloy', 'adc12', 'a380', 'lm25', 'alloy composition', 'what alloy', 'material grade', 'die cast alloy'],
      response: `Common aluminium die casting alloys:\n\n🔸 ADC12 (A383): Most widely used. Good fluidity, excellent pressure tightness, good machinability.\n🔸 A380: High strength, good corrosion resistance, excellent castability — used in automotive parts.\n🔸 LM6 / A413: Excellent corrosion resistance, good pressure tightness — marine/aerospace.\n🔸 LM25 / A356: Heat-treatable, high strength — structural components.\n\nHebron primarily uses certified ADC12 and A380 alloys, verified by Optical Emission Spectrometer.`
    },
    {
      id: 'cnc_machining',
      keywords: ['cnc', 'vmc', 'machining', 'milling', 'turning', 'g-code', 'haas', 'how machining works', 'precision machining'],
      response: `CNC Machining at Hebron:\n\n🔧 VMC (Vertical Machining Centre): Multi-axis milling for complex surfaces, bores, pockets.\n🔧 CNC Turning: Precision OD/ID turning for shafts and cylindrical components.\n🔧 Auto Traub: High-volume precision turning up to Ø32mm.\n\nCNC machines follow programmed G-code instructions for repeatable, micron-level accuracy. Hebron uses 5 HAAS USA VMCs — world-class for automotive machining.`
    },
    {
      id: 'powder_coating',
      keywords: ['powder coating', 'painting', 'surface finish', 'coating thickness', 'dft', 'paint', 'rust protection', 'corrosion'],
      response: `Powder Coating at Hebron:\n\n✅ Process: Electrostatically charged powder is sprayed on the part, then cured in an oven at 180–200°C.\n✅ Advantages: Uniform finish, excellent corrosion resistance, no solvents/VOCs, eco-friendly.\n✅ DFT (Dry Film Thickness): 60–80 microns, verified with DFT meter.\n✅ Salt Spray Test: Tested in SST chamber to verify corrosion resistance per OEM spec.\n\nHebron runs 2 semi-automatic conveyor powder coating lines for consistent quality.`
    },
    {
      id: 'quality_systems',
      keywords: ['iatf 16949', 'what is iatf', 'iso 9001', 'quality management system', 'qms', 'apqp', 'ppap', 'fmea', 'control plan', 'spc'],
      response: `Key automotive quality tools:\n\n📋 IATF 16949:2016 — Global automotive QMS standard.\n📋 APQP — Advanced Product Quality Planning: structured process for new part development.\n📋 PPAP — Production Part Approval Process: validates manufacturing process before mass production.\n📋 FMEA — Failure Mode & Effects Analysis: identifies potential failure risks before they occur.\n📋 Control Plan — Documents all inspection checkpoints across production.\n📋 SPC — Statistical Process Control: monitors process stability using control charts.\n📋 MSA — Measurement System Analysis: validates inspection equipment accuracy.\n\nHebron implements all of these as part of our IATF 16949:2016 certified QMS.`
    },
    {
      id: 'shock_absorber',
      keywords: ['shock absorber', 'suspension', 'damper', 'strut', 'how shock absorber works', 'outer tube', 'inner tube'],
      response: `A shock absorber (damper) controls vehicle suspension movement:\n\n🔹 Outer Tube: Houses the inner piston rod and fluid — Hebron manufactures these via GDC/HPDC.\n🔹 Inner Tube (Cylinder): The piston moves inside, restricting hydraulic fluid flow.\n🔹 Piston Rod: Transmits wheel motion; attached to the vehicle chassis.\n🔹 Spring Seat: Supports the coil spring — Hebron makes these too.\n\nShock absorbers convert kinetic energy to heat via hydraulic resistance, giving smooth ride.`
    },
    {
      id: 'tier_supplier',
      keywords: ['tier 1', 'tier 2', 'tier supplier', 'oem supplier', 'supply chain', 'automotive supply chain'],
      response: `Automotive Supply Chain Tiers:\n\n🏭 OEM (Original Equipment Manufacturer): Final vehicle assembler (e.g., Maruti, Tata, Honda).\n🔩 Tier-1 Supplier: Supplies directly to OEM. Must be IATF certified. (e.g., Gabriel India, Hitachi Astemo — Hebron's customers)\n🔩 Tier-2 Supplier: Supplies components to Tier-1. (e.g., Hebron Automotive)\n🔩 Tier-3 Supplier: Raw material and basic part suppliers to Tier-2.\n\nHebron is a Tier-1 approved supplier to Gabriel India and Hitachi Astemo.`
    },
    {
      id: 'iso14001',
      keywords: ['iso 14001', 'environment', 'environmental', 'green manufacturing', 'sustainability', 'waste', 'emission'],
      response: `ISO 14001:2015 — Environmental Management System:\n\n✅ Identifies and controls environmental impact of manufacturing.\n✅ Requires documented targets for energy use, waste reduction, and emissions.\n✅ Covers: aluminium scrap recycling, chemical handling in powder coating, effluent management.\n\nHebron is ISO 14001:2015 certified, reflecting our commitment to responsible and sustainable manufacturing.`
    },
    {
      id: 'dimensional_inspection',
      keywords: ['vmm', 'utm', 'spectrometer', 'roughness', 'measurement', 'inspection equipment', 'dimensional', 'tolerance', 'micron'],
      response: `Hebron's precision measurement equipment:\n\n📐 VMM (Video Measuring Machine): Non-contact optical measurement for 2D geometries.\n📐 UTM (Universal Testing Machine): Tensile, yield, hardness testing of material samples.\n📐 Spectrometer: Alloy composition verification (Si, Cu, Mg, Fe ratios).\n📐 Ra Tester: Surface roughness measurement — Ra, Rz, Rmax values.\n📐 2D Master / Height Gauge: Dimensional measurement on granite plate.\n📐 DFT Meter: Powder coating film thickness (non-destructive).\n📐 SST Chamber: Salt spray corrosion testing per OEM standards.`
    },
    {
      id: 'wire_edm',
      keywords: ['wire edm', 'edm', 'electrical discharge machining', 'spark erosion', 'edm machining'],
      response: `Wire EDM (Electrical Discharge Machining):\n\n⚡ Uses a thin electrically charged wire to cut metal with extreme precision.\n⚡ No mechanical force on the workpiece — ideal for hard materials and intricate profiles.\n⚡ Accuracy: ±0.002mm or better.\n⚡ Used for: Die inserts, tool profiles, complex punch shapes.\n\nHebron has a Wire EDM in our tool room for manufacturing and maintaining precision dies and fixtures.`
    },
    {
      id: 'auto_traub',
      keywords: ['traub', 'auto traub', 'cam lathe', 'automatic lathe', 'swiss type', 'sliding head'],
      response: `Auto Traub Lathe:\n\n⚙ A high-speed, cam-operated automatic lathe for precision turning of small components.\n⚙ Capable of: OD/ID turning, grooving, threading, drilling in a single setup.\n⚙ Diameter range: up to Ø32mm.\n⚙ Very high production rates — ideal for high-volume automotive parts.\n\nHebron operates 10 Auto Traub machines for volume production of turned components.`
    },
    {
      id: 'surface_grinding',
      keywords: ['surface grinding', 'grinding', 'flatness', 'surface finish grinding'],
      response: `Surface Grinding:\n\n🔄 Uses a rotating abrasive wheel to achieve a very flat, smooth surface.\n🔄 Achieves dimensional accuracy to ±0.005mm.\n🔄 Used for: Die plates, fixtures, flat mating surfaces.\n🔄 Improves flatness, parallelism, and surface finish beyond what milling can achieve.\n\nHebron uses surface grinding in our tool room for die maintenance and precision flat surfaces.`
    },
    {
      id: 'bush_fitting',
      keywords: ['bush', 'bush fitting', 'press fit', 'interference fit', 'sleeve', 'rubber bush'],
      response: `Bush Fitting (Press Fitting):\n\n🔩 A bush (sleeve/lining) is pressed into a bore using a bush fitting machine.\n🔩 Interference fit: bush OD is slightly larger than bore ID, creating a tight grip without fasteners.\n🔩 Press force is monitored to ensure consistent interference fit per OEM drawing spec.\n🔩 Used in: Shock absorber eyelet assemblies, suspension mounts, pivot joints.\n\nHebron operates 3 bush fitting machines and 4 presses (10T) for assembly operations.`
    },
    {
      id: 'shot_blasting',
      keywords: ['shot blasting', 'shot peening', 'blast', 'surface preparation', 'deburring'],
      response: `Shot Blasting:\n\n💥 Steel shot/grit is propelled at high velocity onto the part surface.\n💥 Removes: scale, flash, oxide layers, and surface contamination from castings.\n💥 Improves: surface roughness uniformity before coating or machining.\n💥 Shot Peening (variation): improves fatigue life of parts by inducing compressive stress.\n\nHebron uses shot blasting as a surface preparation step before powder coating for optimal adhesion.`
    },
    {
      id: 'vibro_finishing',
      keywords: ['vibro', 'vibratory finishing', 'deburring', 'edge break', 'mass finishing'],
      response: `Vibratory (Vibro) Finishing:\n\n🔄 Parts are tumbled with abrasive media in a vibrating bowl.\n🔄 Removes: burrs, sharp edges, casting flash.\n🔄 Produces: uniform edge breaks and consistent surface finish.\n🔄 Non-directional process — reaches all surfaces simultaneously.\n\nHebron uses vibro finishing after casting and before precision machining to prepare component surfaces.`
    },
    {
      id: 'ppap',
      keywords: ['ppap', 'part approval', 'first article', 'sample submission', 'initial sample'],
      response: `PPAP (Production Part Approval Process):\n\nA structured automotive industry process to verify that a supplier's manufacturing process can consistently produce parts meeting OEM specifications.\n\n📄 PPAP includes: Design records, PFMEA, Control Plan, MSA, dimensional results, material certs, SPC studies.\n📄 Levels 1–5 — Level 3 is most common (full submission with samples).\n📄 Approved PPAP = green light for mass production.\n\nHebron completes PPAP documentation for all new customer programs.`
    },
    {
      id: 'apqp',
      keywords: ['apqp', 'advanced product quality', 'product launch', 'new product development', 'npd'],
      response: `APQP (Advanced Product Quality Planning):\n\nA structured framework used by automotive manufacturers to plan and define quality requirements for new parts/processes.\n\n5 Phases:\n1️⃣ Plan & Define: Customer requirements, design goals\n2️⃣ Product Design: DFMEA, prototypes, design verification\n3️⃣ Process Design: PFMEA, control plans, process flow\n4️⃣ Product & Process Validation: Pilot runs, PPAP submission\n5️⃣ Launch & Feedback: Production start, lessons learned\n\nHebron follows APQP for all new product launches.`
    },
    {
      id: 'fmea',
      keywords: ['fmea', 'failure mode', 'risk analysis', 'dfmea', 'pfmea', 'severity', 'occurrence', 'detection', 'rpn'],
      response: `FMEA (Failure Mode & Effects Analysis):\n\nA structured risk analysis tool used in product and process design.\n\n📋 DFMEA — Design FMEA: Analyses potential design failures.\n📋 PFMEA — Process FMEA: Analyses potential manufacturing process failures.\n\nKey metrics:\n• Severity (S): Impact of failure on customer (1–10)\n• Occurrence (O): How often the failure might happen (1–10)\n• Detection (D): How likely it is to be caught (1–10)\n• RPN = S × O × D — higher RPN = higher risk priority\n\nFMEA helps prevent defects before they reach production.`
    },
    {
      id: 'aluminium_properties',
      keywords: ['why aluminium', 'aluminium properties', 'aluminium advantages', 'why use aluminium', 'lightweight metal', 'al alloy benefits'],
      response: `Why Aluminium for Automotive Die Casting?\n\n⚡ Lightweight: ~2.7 g/cm³ (vs steel ~7.8 g/cm³) — reduces vehicle weight, improves fuel efficiency.\n⚡ High strength-to-weight ratio: Excellent structural performance.\n⚡ Corrosion resistance: Forms natural oxide layer — no rusting.\n⚡ Good castability: Low melting point (~660°C), excellent fluidity for complex shapes.\n⚡ Recyclable: 100% recyclable without quality loss.\n⚡ Thermal conductivity: Good heat dissipation — ideal for engine/suspension parts.\n\nAll Hebron components are precision aluminium die castings.`
    },
    {
      id: 'tolerances',
      keywords: ['tolerance', 'precision', 'accuracy', 'dimension', 'micron', 'tight tolerance', 'gd&t', 'geometric'],
      response: `Dimensional Tolerances in Automotive Manufacturing:\n\n📐 General Die Casting: ±0.1mm to ±0.3mm achievable.\n📐 After CNC Machining: ±0.01mm to ±0.05mm for critical features.\n📐 Precision Turning (Traub): ±0.005mm for diameter features.\n📐 Surface Roughness: Ra 0.8µm to 3.2µm depending on application.\n\nGD&T (Geometric Dimensioning & Tolerancing) defines:\n• Flatness, Roundness, Cylindricity\n• Perpendicularity, Parallelism\n• True Position, Profile of a Surface\n\nHebron verifies all critical dimensions using VMM and 2D measurement systems.`
    },
    {
      id: 'ev_automotive',
      keywords: ['electric vehicle', 'ev', 'electric car', 'ev components', 'battery', 'motor housing', 'ev casting'],
      response: `Aluminium Die Casting in Electric Vehicles (EVs):\n\n⚡ EVs use MORE aluminium than ICE vehicles for weight savings.\n\nKey EV die cast components:\n• Battery housings & enclosures\n• Motor housings & end covers\n• Inverter housings\n• Structural chassis components\n• Thermal management parts\n• Suspension & steering components\n\nHebron is actively positioning for EV component supply — our IATF-certified quality systems and existing aluminium expertise make us EV-ready. India's EV market is expected to grow significantly by 2030.`
    },
    {
      id: 'material_testing',
      keywords: ['material test', 'tensile', 'hardness', 'brinell', 'rockwell', 'vickers', 'yield strength', 'elongation', 'spectrometer'],
      response: `Material Testing Methods:\n\n🔬 Tensile Test (UTM): Measures ultimate tensile strength (UTS), yield strength, elongation % — key for aluminium alloy certification.\n🔬 Hardness Test:\n   • Brinell (HB): Large indenter — for castings\n   • Rockwell (HRC/HRB): Fast test for harder metals\n   • Vickers (HV): High precision, small indenter\n🔬 Spectrometer (OES): Instantaneous alloy composition — verifies Si, Cu, Mg, Fe content.\n🔬 Salt Spray Test (SST): Accelerated corrosion testing — typically 48–500 hours.\n\nHebron performs all these tests in our standard room.`
    },
    {
      id: 'hosur',
      keywords: ['hosur', 'krishnagiri', 'tamil nadu', 'industrial hub', 'manufacturing hub', 'bangalore near', 'sipcot'],
      response: `Hosur — India's Premier Manufacturing Hub:\n\n📍 Located in Krishnagiri District, Tamil Nadu\n📍 ~40 km from Bengaluru (NH-44)\n📍 Home to: Toyota, Daimler, Volvo, TVS, Ashok Leyland plants & suppliers\n📍 SIPCOT Industrial Estate: major industrial zone\n📍 Excellent logistics: Road, Rail, Air connectivity\n\nHebron Automotive is located in Bharathiyar Nagar, Hosur — at the heart of south India's auto components industry.`
    },
    {
      id: 'gabriel_india',
      keywords: ['gabriel', 'gabriel india', 'anand group', 'shock absorber manufacturer'],
      response: `Gabriel India Ltd.:\n\n🏭 Part of the Anand Group — India's largest auto components group.\n🏭 Leading manufacturer of ride control products: shock absorbers, struts, front forks.\n🏭 Plants: Hosur, Nashik, Parwanoo, Chakan, Sanand.\n🏭 Supplies to: Maruti Suzuki, Tata Motors, Honda, Bajaj, TVS, Hero.\n\nGabriel India is Hebron's primary OEM customer. We supply shock absorber outer tubes, spring seats, and eyelet assemblies to their Hosur (×2), Nashik, and Parwanoo plants.`
    },
    {
      id: 'hitachi_astemo',
      keywords: ['hitachi', 'astemo', 'hitachi astemo', 'braking system', 'brake'],
      response: `Hitachi Astemo Rajasthan Brake Systems Pvt. Ltd.:\n\n🏭 A joint venture between Hitachi Astemo Ltd. (Japan) and Rajasthan Electronics.\n🏭 Manufactures braking systems and suspension components.\n🏭 Tumkur Plant (Karnataka) supplies to Indian and export vehicle programs.\n\nHebron supplies precision aluminium die-cast components and assemblies to Hitachi Astemo's Tumkur plant.`
    },
    {
      id: 'casting_defects',
      keywords: ['porosity', 'defect', 'casting defect', 'shrinkage', 'cold shut', 'misrun', 'flash', 'blowhole', 'inclusions'],
      response: `Common Die Casting Defects & Prevention:\n\n⚠ Porosity: Gas or shrinkage voids inside the casting.\n   Prevention: Optimise injection speed, venting, alloy temperature.\n⚠ Cold Shut: Incomplete fusion of two metal streams.\n   Prevention: Increase metal temperature, die temperature, injection pressure.\n⚠ Flash: Excess metal at parting line.\n   Prevention: Proper die clamping force, die maintenance.\n⚠ Misrun: Metal solidifies before filling the cavity.\n   Prevention: Increase metal temp, injection speed.\n⚠ Inclusions: Oxide/slag particles in casting.\n   Prevention: Clean melt practice, degassing, spectrometer verification.\n\nHebron uses in-process SPC and incoming material spectrometer checks to prevent these defects.`
    },
    {
      id: 'lean_manufacturing',
      keywords: ['lean', 'kaizen', 'continuous improvement', '5s', 'waste', 'muda', 'kanban', 'just in time', 'jit', 'tpm'],
      response: `Lean Manufacturing Principles:\n\n🏭 Lean = eliminating waste (Muda) to deliver maximum value.\n\n7 Types of Waste: Overproduction, Waiting, Transport, Over-processing, Inventory, Motion, Defects.\n\nKey Tools:\n✅ 5S: Sort, Set in Order, Shine, Standardise, Sustain — workplace organisation.\n✅ Kaizen: Continuous small improvements by all employees.\n✅ Kanban: Visual signal-based production pull system.\n✅ JIT (Just-In-Time): Produce only what's needed, when needed.\n✅ TPM (Total Productive Maintenance): Zero breakdowns, zero defects.\n\nHebron implements lean practices across our production floor.`
    },
    {
      id: 'mechanical_engineering',
      keywords: ['mechanical engineering', 'what is mechanical', 'me branch', 'mechanical syllabus', 'core mechanical'],
      response: `Mechanical Engineering — Core Subjects:\n\n📚 Thermodynamics: Energy conversion, heat engines\n📚 Fluid Mechanics: Fluid flow, hydraulics, pneumatics\n📚 Strength of Materials: Stress, strain, beam analysis\n📚 Manufacturing Processes: Casting, machining, forming, welding\n📚 Machine Design: Gears, shafts, bearings, fasteners\n📚 CAD/CAM: Solidworks, AutoCAD, CNC programming\n📚 Metrology: Measurement science and precision instruments\n📚 Theory of Machines: Kinematics, dynamics of mechanisms\n\nAt Hebron, interns get hands-on exposure to manufacturing processes, quality systems, and CNC machining — perfect for ME/PE students!`
    },
    {
      id: 'production_engineering',
      keywords: ['production engineering', 'industrial engineering', 'ie', 'pe branch', 'manufacturing engineering'],
      response: `Production / Industrial Engineering:\n\n🏭 Focuses on optimising manufacturing systems, processes, and workflows.\n\nKey areas:\n• Process Planning & Optimisation\n• Work Study & Method Study\n• Production Planning & Control (PPC)\n• Quality Engineering (SPC, FMEA, PPAP)\n• Facility Layout & Material Handling\n• Supply Chain & Inventory Management\n• Lean & Six Sigma\n\nHebron's internship programme offers PE/IE students real exposure to IATF-compliant production environments.`
    },
    {
      id: 'six_sigma',
      keywords: ['six sigma', 'dmaic', 'black belt', 'sigma', 'process improvement', 'variation reduction'],
      response: `Six Sigma:\n\nA data-driven quality improvement methodology that reduces defects to fewer than 3.4 per million opportunities.\n\n📊 DMAIC Framework:\n1. Define: Problem statement, project charter\n2. Measure: Baseline process performance data\n3. Analyse: Root cause analysis (fishbone, Pareto)\n4. Improve: Implement solutions, pilot testing\n5. Control: Control plans, SPC to sustain gains\n\nBelt levels: Yellow → Green → Black → Master Black Belt.\n\nCombined with Lean, Six Sigma drives world-class manufacturing quality.`
    },
    {
      id: 'salary',
      keywords: ['salary', 'stipend', 'pay', 'compensation', 'fresher salary', 'engineer salary'],
      response: `I can share general guidance:\n\n💼 Fresher Engineer (BE/B.Tech) in manufacturing: ₹2.5–4.5 LPA depending on company and location.\n💼 Diploma Engineer: ₹1.5–3 LPA.\n💼 Experienced CNC Operator: ₹3–6 LPA.\n💼 Quality Engineer (IATF experience): ₹4–7 LPA.\n\nFor Hebron-specific openings and compensation, please contact:\n📧 info@hebronautomotive.com\n📞 +91 63811 00663`
    },
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'vanakkam', 'greetings'],
      response: `Hello! 👋 I'm Hebro, Hebron Automotive's virtual assistant.\n\nI can help you with:\n• Company info & capabilities\n• Products & manufacturing processes\n• Quality certifications\n• Internship & career opportunities\n• General automotive manufacturing knowledge\n\nWhat would you like to know? 😊`
    },
    {
      id: 'thanks',
      keywords: ['thank', 'thanks', 'thank you', 'thx', 'great', 'awesome', 'helpful', 'nice', 'perfect', 'good'],
      response: `You're welcome! 😊 Happy to help.\n\nFeel free to ask anything else about Hebron Automotive or automotive manufacturing. You can also reach us directly at:\n📞 +91 63811 00663\n📧 info@hebronautomotive.com`
    },
    {
      id: 'whatsapp',
      keywords: ['whatsapp', 'chat', 'message', 'wa'],
      response: `You can WhatsApp us directly:\n\n📱 +91 94426 19772 (MD: Mr. N. Kumar)\n\nOr click the WhatsApp button on our website. We're responsive during business hours (Mon–Sat, 8:30 AM – 5:30 PM).`
    },
    {
      id: 'gallery',
      keywords: ['gallery', 'photo', 'picture', 'image', 'factory photo', 'see factory', 'plant image'],
      response: `Our gallery showcases:\n📸 Factory & production floor\n📸 Die casting machines in operation\n📸 CNC / VMC machining centres\n📸 Powder coating lines\n📸 Quality standard room\n📸 Finished automotive components\n\nVisit our Gallery page to see it all! 🏭`
    },

    /* ── FALLBACK ─────────────────────────────────────────── */
    {
      id: 'default',
      keywords: [],
      response: `I'm not sure about that specific question. Here are things I can help with:\n\n🏭 Hebron company info & capabilities\n🔩 Die casting, CNC machining, powder coating\n📋 Quality certifications (IATF, ISO)\n👥 Clients, internships, careers\n⚙ Automotive manufacturing knowledge\n\nOr reach us at 📞 +91 63811 00663 or 📧 info@hebronautomotive.com`
    }
  ];

  // ── SMART MATCHING — score-based, finds best match ─────────────
  function findResponse(text) {
    const lower = text.toLowerCase().trim();
    let bestScore = 0;
    let bestResponse = null;

    for (const item of KB) {
      if (item.id === 'default') continue;
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) {
          // Longer keyword matches score higher
          score += kw.split(' ').length * 2;
        }
        // Partial word match (each word of keyword present)
        const words = kw.split(' ');
        if (words.length > 1 && words.every(w => lower.includes(w))) {
          score += words.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestResponse = item.response;
      }
    }

    return bestResponse || KB[KB.length - 1].response; // fallback
  }

  // ── SUGGESTIONS — varied per session ──────────────────────────
  const ALL_SUGGESTIONS = [
    'What do you manufacture?',
    'Your certifications',
    'Internship info',
    'Contact details',
    'Available capacity',
    'What is die casting?',
    'CNC machining explained',
    'Powder coating process',
    'IATF 16949 meaning',
    'Your clients',
    'EV components',
    'Career opportunities',
    'Aluminium alloys used',
    'Get a quote',
  ];

  // ── BUILD UI ────────────────────────────────────────────────────
  const launcher = document.createElement('button');
  launcher.className = 'chatbot-launcher';
  launcher.id = 'chatbot-launcher';
  launcher.setAttribute('aria-label', 'Open Hebro chatbot');
  launcher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <div class="launcher-badge">1</div>
  `;

  const win = document.createElement('div');
  win.className = 'chatbot-window';
  win.id = 'chatbot-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'Hebro chat assistant');
  win.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-header-info">
        <div class="chatbot-avatar">H</div>
        <div>
          <div class="chatbot-name">Hebro</div>
          <div class="chatbot-status">Online · Manufacturing Expert</div>
        </div>
      </div>
      <div class="chatbot-controls">
        <button class="chatbot-ctrl" id="chatbot-minimize" title="Minimize" aria-label="Minimize chat">−</button>
        <button class="chatbot-ctrl" id="chatbot-close" title="Close" aria-label="Close chat">✕</button>
      </div>
    </div>
    <div class="chatbot-messages" id="chatbot-messages"></div>
    <div class="chatbot-suggestions" id="chatbot-suggestions"></div>
    <div class="chatbot-input-wrap">
      <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Ask about products, processes, careers..." aria-label="Chat input" maxlength="200" />
      <button class="chatbot-send" id="chatbot-send" aria-label="Send message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(win);

  // ── ELEMENTS ────────────────────────────────────────────────────
  const msgs     = document.getElementById('chatbot-messages');
  const input    = document.getElementById('chatbot-input');
  const send     = document.getElementById('chatbot-send');
  const closeBtn = document.getElementById('chatbot-close');
  const minimize = document.getElementById('chatbot-minimize');
  const suggsEl  = document.getElementById('chatbot-suggestions');

  let isOpen = false;
  let firstOpen = true;

  // ── ADD MESSAGE ─────────────────────────────────────────────────
  function addMessage(text, type = 'bot', delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
        resolve();
      }, delay);
    });
  }

  // ── TYPING INDICATOR ────────────────────────────────────────────
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'msg bot msg-typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }
  function hideTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  // ── BOT REPLY ───────────────────────────────────────────────────
  async function botReply(text) {
    showTyping();
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    hideTyping();
    await addMessage(text, 'bot');
    renderSuggestions();
  }

  // ── SUGGESTIONS — random 4 each time ──────────────────────────
  function renderSuggestions() {
    suggsEl.innerHTML = '';
    const sample = [...ALL_SUGGESTIONS].sort(() => .5 - Math.random()).slice(0, 4);
    sample.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'sugg-btn';
      btn.textContent = s;
      btn.addEventListener('click', () => handleInput(s));
      suggsEl.appendChild(btn);
    });
  }

  // ── HANDLE INPUT ────────────────────────────────────────────────
  async function handleInput(text) {
    const clean = text.trim();
    if (!clean) return;
    input.value = '';
    await addMessage(clean, 'user');
    const reply = findResponse(clean);
    await botReply(reply);
  }

  // ── OPEN / CLOSE ────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    win.classList.add('open');
    launcher.querySelector('.launcher-badge').style.display = 'none';
    if (firstOpen) {
      firstOpen = false;
      setTimeout(() => {
        addMessage(`Hello! 👋 I'm <strong>Hebro</strong>, Hebron Automotive's AI assistant.<br><br>I can answer questions about our company, products, manufacturing processes, quality certifications, careers, and general automotive industry knowledge. How can I help?`, 'bot');
        renderSuggestions();
      }, 300);
    }
    setTimeout(() => input.focus(), 400);
  }
  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
  }

  // ── EVENTS ──────────────────────────────────────────────────────
  launcher.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  minimize.addEventListener('click', closeChat);
  send.addEventListener('click', () => handleInput(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(input.value); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

})();
