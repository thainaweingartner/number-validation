import { ValidationResponse } from "../models/validation-response.model";

export function buildNumberValidation(): ValidationResponse {
  const response: ValidationResponse = {
    valid: true,
    number: "5584994592656",
    local_format: "0, 0XX84994592656",
    international_format: "+5584994592656",
    country_prefix: "+55",
    country_code: "BR",
    country_name: "Brazil (Federative Republic of)",
    location: "Rio Grande do Norte (RN)",
    carrier: "CLARO SA",
    line_type: "mobile"
  }
  return response;
}
