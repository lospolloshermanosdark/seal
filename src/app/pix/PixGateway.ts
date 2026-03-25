import { PixCreateInput } from "../types/PixCreateInput";

export type PixNormalizedResponse = {
  id: string;
  qrCode: string;
  expiresAt?: string;
};


export interface PixGateway {
  /**
   * Cria uma transação PIX no provider
   * Retorna SEMPRE dados normalizados
   */
  create(input: PixCreateInput): Promise<PixNormalizedResponse>
  ;
  check(transactionId: string): Promise<{
    paid: boolean;
    status: string;
    raw?: any;
    }>;
}
