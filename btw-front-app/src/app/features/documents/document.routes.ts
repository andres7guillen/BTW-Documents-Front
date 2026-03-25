import { Routes } from '@angular/router';

export const DOCUMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/document-list.component/document-list.component').then(
        (m) => m.DocumentListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/document-create.component/document-create.component').then(
        (m) => m.DocumentCreateComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/document-detail.component/document-detail.component').then(
        (m) => m.DocumentDetailComponent,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./edit/document-edit.component/document-edit.component').then(
        (m) => m.DocumentEditComponent,
      ),
  },
];
