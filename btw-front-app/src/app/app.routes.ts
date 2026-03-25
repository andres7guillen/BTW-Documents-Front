import { Routes } from '@angular/router';

const loadDocumentLogsComponent = () =>
  import('./features/logs/logs.list.component/logs.list.component').then(
    (m) => m.LogsListComponent,
  );

export const routes: Routes = [
  {
    path: 'documents',
    loadChildren: () =>
      import('./features/documents/document.routes').then((m) => m.DOCUMENT_ROUTES),
  },
  { path: 'logs', loadComponent: loadDocumentLogsComponent },
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
];
