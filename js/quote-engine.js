/**
 * Vanguard Motor Assure - Actuarial Quote & Premium Engine
 */

const VEHICLE_CATALOG = {
  car: [
    { brand: 'Ferrari', model: 'SF90 Stradale Assetto Fiorano', baseIdv: 585000, type: 'car', fuel: 'Hybrid V8' },
    { brand: 'Ferrari', model: 'F8 Tributo Rosso Corsa', baseIdv: 340000, type: 'car', fuel: 'Twin-Turbo V8' },
    { brand: 'Ferrari', model: '296 GTB Assetto Corsa', baseIdv: 325000, type: 'car', fuel: 'Plug-in Hybrid V6' },
    { brand: 'Ferrari', model: '812 Superfast V12', baseIdv: 410000, type: 'car', fuel: 'Naturally Aspirated V12' },
    { brand: 'Ferrari', model: '488 Pista Rosso Corsa', baseIdv: 360000, type: 'car', fuel: 'Twin-Turbo V8' },
    { brand: 'Porsche', model: 'Taycan 4S Electric', baseIdv: 118000, type: 'ev', fuel: 'Electric' },
    { brand: 'Porsche', model: '911 Carrera GTS', baseIdv: 145000, type: 'car', fuel: 'Petrol' },
    { brand: 'BMW', model: 'M4 Competition Coupe', baseIdv: 86000, type: 'car', fuel: 'Petrol' },
    { brand: 'BMW', model: '5-Series 530i Luxury', baseIdv: 64000, type: 'car', fuel: 'Hybrid' },
    { brand: 'Mercedes-Benz', model: 'AMG GT Coupe', baseIdv: 142000, type: 'car', fuel: 'Petrol' },
    { brand: 'Mercedes-Benz', model: 'E-Class Sedan', baseIdv: 72000, type: 'car', fuel: 'Diesel' },
    { brand: 'Tesla', model: 'Model S Plaid Tri-Motor', baseIdv: 98000, type: 'ev', fuel: 'Electric' },
    { brand: 'Tesla', model: 'Model 3 Long Range', baseIdv: 47000, type: 'ev', fuel: 'Electric' },
    { brand: 'Audi', model: 'RS e-tron GT', baseIdv: 109000, type: 'ev', fuel: 'Electric' },
    { brand: 'Audi', model: 'A6 Prestige Quattro', baseIdv: 59000, type: 'car', fuel: 'Petrol' },
    { brand: 'Toyota', model: 'Land Cruiser 300', baseIdv: 92000, type: 'car', fuel: 'Diesel' },
    { brand: 'Hyundai', model: 'Ioniq 5 AWD', baseIdv: 49000, type: 'ev', fuel: 'Electric' }
  ],
  bike: [
    { brand: 'Ducati', model: 'Panigale V4 S', baseIdv: 29000, type: 'bike', fuel: 'Petrol' },
    { brand: 'BMW Motorrad', model: 'S1000RR Superbike', baseIdv: 24000, type: 'bike', fuel: 'Petrol' },
    { brand: 'Harley-Davidson', model: 'Sportster S', baseIdv: 17500, type: 'bike', fuel: 'Petrol' },
    { brand: 'Kawasaki', model: 'Ninja ZX-10R', baseIdv: 18500, type: 'bike', fuel: 'Petrol' }
  ],
  fleet: [
    { brand: 'Mercedes-Benz', model: 'Sprinter Cargo Van', baseIdv: 56000, type: 'fleet', fuel: 'Diesel' },
    { brand: 'Ford', model: 'E-Transit Electric Fleet', baseIdv: 52000, type: 'fleet', fuel: 'Electric' },
    { brand: 'Volvo', model: 'FH Commercial Hauler', baseIdv: 135000, type: 'fleet', fuel: 'Diesel' }
  ]
};

const ADD_ONS = {
  zeroDep: { name: 'Zero Depreciation (Bumper-to-Bumper)', rate: 0.18, fixed: 180, desc: '100% claim on plastics, carbon fiber, metal with zero deductions.' },
  trackDayShield: { name: 'Maranello Track Day & Circuit Shield', rate: 0.14, fixed: 240, desc: 'Full coverage on Fiorano, Monza, and closed supercar circuits.' },
  cashlessFerrari: { name: 'Cashless Ferrari OEM Workshop Guarantee', rate: 0.08, fixed: 140, desc: '100% genuine Ferrari Maranello parts with zero out-of-pocket deductibles.' },
  engineProtect: { name: 'Engine & Gearbox Hydro-Shield', rate: 0.08, fixed: 95, desc: 'Protects against water ingression & hydrostatic lock.' },
  roadsideSOS: { name: '24/7 Roadside Assistance & Towing', rate: 0, fixed: 45, desc: 'Unlimited towing, tyre fix, lockout, fuel dispatch.' },
  keyReplacement: { name: 'Smart Key & Digital Fob Cover', rate: 0, fixed: 35, desc: 'Up to $800 reimbursement for lost key replacement.' },
  consumables: { name: 'Consumables & Lubricants Cover', rate: 0.04, fixed: 40, desc: 'Covers oils, coolant, nuts, bearings, filters in repair.' },
  tyreProtect: { name: 'Tyre & Alloy Rim Safeguard', rate: 0.05, fixed: 60, desc: 'Accidental rim cracks, sidewall bulges and cuts.' },
  returnToInvoice: { name: 'Return to Invoice (RTI)', rate: 0.10, fixed: 120, desc: 'Reimburses full original dealer invoice value on theft/total loss.' },
  dailyAllowance: { name: 'Daily Chauffeur / Cab Allowance', rate: 0, fixed: 50, desc: '$50/day transportation credit during garage servicing.' },
  batteryShield: { name: 'EV / Hybrid Battery & Inverter Shield', rate: 0.12, fixed: 140, desc: 'Covers hybrid/EV battery degradation, surge and wallbox.' }
};

class QuoteEngine {
  constructor() {
    this.state = {
      category: 'car',
      selectedVehicle: VEHICLE_CATALOG.car[0],
      regYear: 2024,
      rtoCity: 'New York (Metro)',
      idvMultiplier: 1.0,
      ncbDiscount: 35, // 35% No Claim Bonus
      selectedPlanTier: 'gold', // essential, gold, platinum
      selectedAddons: ['zeroDep', 'engineProtect', 'roadsideSOS', 'consumables', 'batteryShield']
    };
  }

  calculate() {
    const v = this.state.selectedVehicle;
    const baseIdv = Math.round(v.baseIdv * this.state.idvMultiplier);

    // Actuarial Own Damage (OD) Calculation
    let odRate = 0.0165; // ~1.65% of IDV
    if (this.state.category === 'bike') odRate = 0.019;
    if (this.state.category === 'fleet') odRate = 0.021;

    // Age depreciation adjustments
    const currentYear = 2026;
    const age = Math.max(0, currentYear - this.state.regYear);
    const ageFactor = 1 + (age * 0.04);

    let grossOD = Math.round(baseIdv * odRate * ageFactor);

    // No Claim Bonus (NCB) Discount on OD
    const ncbPercent = this.state.ncbDiscount;
    const ncbDiscountAmount = Math.round(grossOD * (ncbPercent / 100));
    const netOD = Math.max(0, grossOD - ncbDiscountAmount);

    // Statutory Third Party (TP) Fixed Tariff
    let tpTariff = 210;
    if (this.state.category === 'bike') tpTariff = 95;
    if (this.state.category === 'fleet') tpTariff = 360;
    if (v.type === 'ev') tpTariff = 185;

    // Add-on calculations
    let addOnTotal = 0;
    const addOnBreakdown = [];

    this.state.selectedAddons.forEach(addOnKey => {
      const addon = ADD_ONS[addOnKey];
      if (addon) {
        let cost = addon.fixed + Math.round(grossOD * addon.rate);
        addOnTotal += cost;
        addOnBreakdown.push({ key: addOnKey, name: addon.name, cost: cost });
      }
    });

    // Plan tier multiplier
    let tierMultiplier = 1.0;
    if (this.state.selectedPlanTier === 'essential') tierMultiplier = 0.85;
    if (this.state.selectedPlanTier === 'platinum') tierMultiplier = 1.25;

    // Subtotal before tax
    const subtotal = Math.round((netOD + tpTariff + addOnTotal) * (this.state.selectedPlanTier === 'essential' ? 0.9 : 1.0));
    const taxGST = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + taxGST;
    const monthlyEMI = Math.round(grandTotal / 12);

    return {
      vehicle: v,
      idv: baseIdv,
      grossOD,
      ncbPercent,
      ncbDiscountAmount,
      netOD,
      tpTariff,
      addOnTotal,
      addOnBreakdown,
      subtotal,
      taxGST,
      grandTotal,
      monthlyEMI
    };
  }

  setCategory(cat) {
    this.state.category = cat;
    const list = VEHICLE_CATALOG[cat] || VEHICLE_CATALOG.car;
    this.state.selectedVehicle = list[0];
    if (cat === 'car' && !this.state.selectedAddons.includes('zeroDep')) {
      this.state.selectedAddons.push('zeroDep');
    }
  }

  toggleAddon(key) {
    const idx = this.state.selectedAddons.indexOf(key);
    if (idx > -1) {
      this.state.selectedAddons.splice(idx, 1);
    } else {
      this.state.selectedAddons.push(key);
    }
  }

  generateQuotePDF() {
    const calc = this.calculate();
    const quoteNo = 'QTE-VG-' + Math.floor(100000 + Math.random() * 900000);
    const userEmail = (window.auth && window.auth.currentUser) ? window.auth.currentUser.email : 'driver@vanguard-vip.io';

    const textContent = `
============================================================
           VANGUARD MOTOR ASSURE - PREMIUM QUOTATION
============================================================
Quotation Ref : ${quoteNo}
Issued Date   : ${new Date().toLocaleDateString()}
Client Account: ${userEmail}
Vehicle Model : ${calc.vehicle.brand} ${calc.vehicle.model}
Registration  : ${(window.auth && window.auth.currentUser) ? window.auth.currentUser.regNo : 'NY-APX-9942'}
Fuel / Engine : ${calc.vehicle.fuel}
Insured Value : $${calc.idv.toLocaleString()} (IDV)

------------------------------------------------------------
COVERAGE & PREMIUM BREAKDOWN:
------------------------------------------------------------
1. Own Damage Base Premium      : $${calc.grossOD.toLocaleString()}
2. No-Claim-Bonus (${calc.ncbPercent}% NCB)    : -$${calc.ncbDiscountAmount.toLocaleString()}
   ---------------------------------------------------------
   Net Own Damage Premium       : $${calc.netOD.toLocaleString()}
3. Statutory Third-Party Cover  : $${calc.tpTariff.toLocaleString()}
4. Selected Apex Add-Ons (${calc.addOnBreakdown.length}) : $${calc.addOnTotal.toLocaleString()}
${calc.addOnBreakdown.map(a => `   - ${a.name.padEnd(36)}: $${a.cost}`).join('\n')}

------------------------------------------------------------
Sub-Total Net Premium           : $${calc.subtotal.toLocaleString()}
Statutory GST / Tax (18%)       : $${calc.taxGST.toLocaleString()}
------------------------------------------------------------
TOTAL ANNUAL PAYABLE            : $${calc.grandTotal.toLocaleString()}
(Optional Flex-Pay Monthly EMI  : $${calc.monthlyEMI.toLocaleString()} / mo)
============================================================
Guaranteed 30-Minute Cashless Claim Settlement | Solvency 2.45x
Vanguard Motor Assure &bull; Underwritten by Munich Re Consortium
============================================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vanguard-Motor-Assure-Quote-${quoteNo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showToast) window.showToast(`Official Quote ${quoteNo} downloaded!`, 'success');
    if (window.playHapticSound) window.playHapticSound('success');
  }
}

window.quoteEngine = new QuoteEngine();
