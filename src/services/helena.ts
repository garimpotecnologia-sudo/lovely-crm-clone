import { IS_MOCK_MODE } from "./config";
import { helenaApi } from "./api-client";
import {
  mockCreateCompany,
  mockActivateCompany,
  mockCreateToken,
  mockCreateAgent,
} from "./mock-data";
import type { CompanyFormData } from "@/types/signup";
import type {
  HelenaCompanyResponse,
  HelenaActivateResponse,
  HelenaTokenResponse,
  HelenaAgentResponse,
} from "@/types/api";

const PARTNER_TOKEN = import.meta.env.VITE_HELENA_PARTNER_TOKEN || "";

export async function createCompany(
  data: CompanyFormData
): Promise<HelenaCompanyResponse> {
  if (IS_MOCK_MODE) {
    return mockCreateCompany(data.name);
  }
  return helenaApi.post<HelenaCompanyResponse>(
    "/company",
    {
      name: data.name,
      cpfCnpj: data.cpfCnpj,
      email: data.email,
      phone: data.phone,
      address: data.address,
      contactPerson: data.contactPerson,
    },
    PARTNER_TOKEN
  );
}

export async function activateCompany(
  companyId: string
): Promise<HelenaActivateResponse> {
  if (IS_MOCK_MODE) {
    return mockActivateCompany(companyId);
  }
  return helenaApi.post<HelenaActivateResponse>(
    `/company/${companyId}/active`,
    {},
    PARTNER_TOKEN
  );
}

export async function createToken(
  companyId: string
): Promise<HelenaTokenResponse> {
  if (IS_MOCK_MODE) {
    return mockCreateToken(companyId);
  }
  return helenaApi.post<HelenaTokenResponse>(
    `/company/${companyId}/tokens`,
    {},
    PARTNER_TOKEN
  );
}

export async function createAgent(data: {
  name: string;
  email: string;
  companyId: string;
}): Promise<HelenaAgentResponse> {
  if (IS_MOCK_MODE) {
    return mockCreateAgent(data.name, data.email);
  }
  return helenaApi.post<HelenaAgentResponse>(
    "/agent",
    {
      name: data.name,
      email: data.email,
      companyId: data.companyId,
    },
    PARTNER_TOKEN
  );
}
