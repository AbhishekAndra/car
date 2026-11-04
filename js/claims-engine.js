/**
 * Vanguard Motor Assure - Express Claims & Garage Network Engine
 */

const DEFAULT_CLAIMS = [
  {
    claimId: 'CLM-84920',
    policyNo: 'FR-SF90-99201',
    vehicle: '2025 Ferrari SF90 Stradale (Assetto Fiorano)',
    plate: 'FER-SF90-01',
    date: 'Oct 24, 2026',
    stage: 4, // 1 to 5
    statusText: 'Carbon Ceramic Inspection & Paint Curing in Progress',
    garage: 'Official Ferrari Workshop — Manhattan North',
    garagePhone: '+1 (212) 555-0199',
    surveyor: 'David Vance (Ferrari Certified Loss Assessor)',
    estimatedCost: '$8,850',
    cashlessApproved: '$8,850',
    eta: 'Oct 31, 2026 (Ready for delivery)'
  },
  {
    claimId: 'CLM-71044',
    policyNo: 'FR-F8-84112',
    vehicle: '2024 Ferrari F8 Tributo (Rosso Corsa)',
    plate: 'FER-F8-7701',
    date: 'Oct 12, 2026',
    stage: 5,
    statusText: 'Settled & Track-Ready Vehicle Delivered',
    garage: 'Ferrari Beverly Hills Authorized Body Center',
    garagePhone: '+1 (310) 555-8821',
    surveyor: 'Elena Rostova (Self-Inspected AI Vision)',
    estimatedCost: '$6,200',
    cashlessApproved: '$6,200',
    eta: 'Settlement Completed (Zero Deductible Paid)'
  },
  {
    claimId: 'CLM-98241',
    policyNo: 'FR-296-55102',
    vehicle: '2025 Ferrari 296 GTB Assetto Corsa',
    plate: 'FER-296-4040',
    date: 'Oct 27, 2026',
    stage: 3,
    statusText: 'Maranello OEM Carbon Parts Inward & Sourced',
    garage: 'Maranello Tech & Supercar Center — Austin',
    garagePhone: '+1 (512) 555-4300',
    surveyor: 'Marcus Vance (Telematics AI Report)',
    estimatedCost: '$4,150',
    cashlessApproved: '$4,150',
    eta: 'Nov 02, 2026'
  }
];

const GARAGES_CATALOG = [
  {
    name: 'Vanguard Apex Certified Center — Manhattan',
    city: 'New York',
    state: 'NY',
    address: '540 W 26th Street, Chelsea, NY 10001',
    distance: '1.2 miles away',
    rating: 4.9,
    reviews: 342,
    phone: '+1 (212) 555-8299',
    badges: ['OEM Certified', 'Express 48h Turnaround', 'Free EV Loaner Car', 'Cashless Direct']
  },
  {
    name: 'Precision Euro Works — Brooklyn Navy Yard',
    city: 'New York',
    state: 'NY',
    address: '63 Flushing Ave, Unit 12B, Brooklyn, NY 11205',
    distance: '3.8 miles away',
    rating: 4.8,
    reviews: 219,
    phone: '+1 (718) 555-3921',
    badges: ['BMW & Porsche Specialist', 'Cashless Direct', 'Laser Chassis Alignment']
  },
  {
    name: 'Beverly Hills Motorwerks & Collision',
    city: 'Los Angeles',
    state: 'CA',
    address: '9250 Wilshire Blvd, Beverly Hills, CA 90212',
    distance: '2.4 miles away',
    rating: 5.0,
    reviews: 418,
    phone: '+1 (310) 555-9011',
    badges: ['Mercedes-Benz Certified', 'Tesla Approved', 'Valet Pick & Drop']
  },
  {
    name: 'Silicon Valley EV Tech & Body Studio',
    city: 'San Francisco',
    state: 'CA',
    address: '450 10th St, San Francisco, CA 94103',
    distance: '1.9 miles away',
    rating: 4.9,
    reviews: 310,
    phone: '+1 (415) 555-7740',
    badges: ['Tesla & Lucid Certified', 'High-Voltage Battery Lab', 'Express Cashless']
  },
  {
    name: 'Midwest Apex Autobody & Paint',
    city: 'Chicago',
    state: 'IL',
    address: '1100 W Randolph St, West Loop, Chicago, IL 60607',
    distance: '2.1 miles away',
    rating: 4.9,
    reviews: 184,
    phone: '+1 (312) 555-6612',
    badges: ['Audi Quattro Certified', 'Lifetime Paint Warranty', 'Cashless Direct']
  },
  {
    name: 'Lone Star Elite Fleet & Motor Care',
    city: 'Houston',
    state: 'TX',
    address: '2800 Post Oak Blvd, Galleria, Houston, TX 77056',
    distance: '4.5 miles away',
    rating: 4.8,
    reviews: 275,
    phone: '+1 (713) 555-8830',
    badges: ['Heavy Fleet & Commercial', 'Zero-Downtime Guarantee', 'Cashless Direct']
  }
];

class ClaimsEngine {
  constructor() {
    this.storageKey = 'vanguard_claims_records';
    this.claims = this.loadClaims();
  }

  loadClaims() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading claims from storage', e);
    }
    return DEFAULT_CLAIMS;
  }

  saveClaims() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.claims));
  }

  getClaimById(id) {
    const clean = id.trim().toUpperCase();
    return this.claims.find(c => c.claimId.toUpperCase() === clean || c.policyNo.toUpperCase() === clean);
  }

  submitClaim(data) {
    const claimId = 'CLM-' + Math.floor(10000 + Math.random() * 90000);
    const newClaim = {
      claimId: claimId,
      policyNo: data.policyNo || 'VG-CAR-99120',
      vehicle: data.vehicle || 'Insured Vehicle',
      plate: data.plate || 'NY-APX-9942',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      stage: 2, // AI Assessment Completed
      statusText: 'AI Damage Inspection Verified & Garage Assigned',
      garage: data.garage || 'Vanguard Apex Certified Center — Manhattan',
      garagePhone: '+1 (212) 555-8299',
      surveyor: 'Automated AI Vision Assessor',
      estimatedCost: data.estimatedCost || '$2,450',
      cashlessApproved: data.estimatedCost || '$2,450',
      eta: '3-4 business days'
    };

    this.claims.unshift(newClaim);
    this.saveClaims();
    return newClaim;
  }
}

window.claimsEngine = new ClaimsEngine();
window.GARAGES_CATALOG = GARAGES_CATALOG;
