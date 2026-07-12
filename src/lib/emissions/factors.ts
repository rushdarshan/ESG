export interface EmissionFactor {
  category: string;
  scope: 1 | 2 | 3;
  factor: number;
  unit: string;
  description: string;
  source: string;
  version: string;
}

export const EMISSION_FACTORS: Record<string, EmissionFactor> = {
  electricity: {
    category: "electricity",
    scope: 2,
    factor: 0.417,
    unit: "kgCO2e/kWh",
    description: "US average grid electricity emission factor",
    source: "EPA eGRID 2024",
    version: "2024.0",
  },
  natural_gas: {
    category: "natural_gas",
    scope: 1,
    factor: 5.3,
    unit: "kgCO2e/therm",
    description: "Natural gas combustion emission factor",
    source: "EPA GHGRP",
    version: "2024.0",
  },
  diesel: {
    category: "diesel",
    scope: 1,
    factor: 2.68,
    unit: "kgCO2e/liter",
    description: "Diesel fuel combustion emission factor",
    source: "IPCC 2006 GL",
    version: "2006.0",
  },
  gasoline: {
    category: "gasoline",
    scope: 1,
    factor: 2.31,
    unit: "kgCO2e/liter",
    description: "Gasoline combustion emission factor",
    source: "IPCC 2006 GL",
    version: "2006.0",
  },
  flight_short_haul: {
    category: "flight",
    scope: 3,
    factor: 0.255,
    unit: "kgCO2e/km",
    description: "Short-haul flight (<1500km) emission factor",
    source: "DEFRA 2024",
    version: "2024.0",
  },
  flight_long_haul: {
    category: "flight",
    scope: 3,
    factor: 0.195,
    unit: "kgCO2e/km",
    description: "Long-haul flight (>1500km) emission factor",
    source: "DEFRA 2024",
    version: "2024.0",
  },
  car_gasoline: {
    category: "travel",
    scope: 3,
    factor: 0.17,
    unit: "kgCO2e/km",
    description: "Average gasoline car emission factor",
    source: "DEFRA 2024",
    version: "2024.0",
  },
  car_diesel: {
    category: "travel",
    scope: 3,
    factor: 0.14,
    unit: "kgCO2e/km",
    description: "Average diesel car emission factor",
    source: "DEFRA 2024",
    version: "2024.0",
  },
  waste_landfill: {
    category: "waste",
    scope: 3,
    factor: 0.58,
    unit: "kgCO2e/kg",
    description: "Waste sent to landfill emission factor",
    source: "IPCC 2006 GL",
    version: "2006.0",
  },
  waste_recycled: {
    category: "waste",
    scope: 3,
    factor: 0.021,
    unit: "kgCO2e/kg",
    description: "Recycled waste emission factor",
    source: "IPCC 2006 GL",
    version: "2006.0",
  },
  water: {
    category: "water",
    scope: 3,
    factor: 0.000344,
    unit: "kgCO2e/liter",
    description: "Water supply and treatment emission factor",
    source: "Water Research Foundation",
    version: "2020.0",
  },
  refrigerant_r410a: {
    category: "refrigerant",
    scope: 1,
    factor: 2088.0,
    unit: "kgCO2e/kg",
    description: "R-410A refrigerant leakage emission factor",
    source: "IPCC 2006 GL",
    version: "2006.0",
  },
};

export function getFactorByCategory(
  category: string,
): EmissionFactor | undefined {
  return EMISSION_FACTORS[category];
}

export function getAllFactors(): EmissionFactor[] {
  return Object.values(EMISSION_FACTORS);
}
