import { DocumentItem } from './document-item.model';
import { DocumentStatus } from './enums';

export interface DocumentModel {
  id: string;
  legalNumber: string;
  cufe?: string | null;
  type: DocumentType;
  status: DocumentStatus;
  emitterNit: string;
  emitterName: string;
  receiverNit: string;
  receiverName: string;
  referenceDocumentId?: string | null;
  createdAt: string;
  issuedAt?: string | null;
  items: DocumentItem[];
  total: number;
}
