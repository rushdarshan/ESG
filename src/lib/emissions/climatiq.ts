import { getFactorByCategory, type EmissionFactor } from "./factors";

const CLIMATIQ_API_URL = "https://beta3.api.climatiq.io/estimate";

interface ClimatiqEstimateResponse {
  co2e: number;
  co2e_unit: string;
  emission_factor: {
    activity_id: string;
    category: string;
    source: string;
    year: number;
  };
}

export async function queryClimatiq(
  category: string,
  quantity: number,
  unit: string,
): Promise<EmissionFactor | null> {
  const apiKey = process.env.CLIMATIQ_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(CLIMATIQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emission_factor: { activity_id: `${category}_${unit}` },
        parameters: { quantity, quantity_unit: unit },
      }),
    });

    if (!response.ok) return null;

    const data: ClimatiqEstimateResponse = await response.json();
    return {
      category,
      scope: inferScope(category),
      factor: data.co2e / quantity,
      unit: `kgCO2e/${unit}`,
      description: `Climatiq: ${data.emission_factor.category}`,
      source: `${data.emission_factor.source} (${data.emission_factor.year})`,
      version: String(data.emission_factor.year),
    };
  } catch {
    return null;
  }
}

function inferScope(category: string): 1 | 2 | 3 {
  const scope1 = ["natural_gas", "diesel", "gasoline", "refrigerant"];
  const scope2 = ["electricity"];
  if (scope1.includes(category)) return 1;
  if (scope2.includes(category)) return 2;
  return 3;
}

export async function getEmissionFactor(
  category: string,
  quantity: number,
  unit: string,
): Promise<EmissionFactor> {
  const climatiq = await queryClimatiq(category, quantity, unit);
  if (climatiq) return climatiq;

  const local = getFactorByCategory(category);
  if (local) return local;

  return {
    category,
    scope: inferScope(category),
    factor: 1.0,
    unit: `kgCO2e/${unit}`,
    description: "Default fallback factor (no source available)",
    source: "fallback",
    version: "0",
  };
}
