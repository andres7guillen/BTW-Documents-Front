import { DocumentStatus } from './enums';

export interface DocumentStatusHistory {
  id: string;
  documentId: string;
  status: DocumentStatus;
  changedAt: string;
}
