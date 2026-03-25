import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentService } from '../../../../core/services/document.service';
import { DocumentModel } from '../../../../core/models/document.model';
import { DocumentStatusHistory } from '../../../../core/models/document-history.model';
import { DocumentHistoryService } from '../../../../core/services/document-history.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './document-list.component.html',
})
export class DocumentListComponent implements OnInit {
  private fb = inject(FormBuilder);
  history: DocumentStatusHistory[] = [];
  selectedDocumentId: string | null = null;
  filterForm = this.fb.group({
    status: [''],
    type: [''],
  });
  documents: DocumentModel[] = [];
  page = 1;
  pageSize = 10;
  total = 0;
  loadingHistory = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private service: DocumentService,
    private historyService: DocumentHistoryService,
  ) {}

  ngOnInit() {
    this.load();
    this.filterForm.valueChanges.subscribe(() => {
      this.page = 1;
      this.load();
    });
  }

  openHistory(documentId: string) {
    this.loadingHistory = true;

    this.historyService.getHistory(documentId).subscribe({
      next: (res) => {
        this.history = res.items;
        this.loadingHistory = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.history = [];
        this.loadingHistory = false;
      },
    });
  }

  load() {
    const { status, type } = this.filterForm.value;

    this.service.getAll(this.page, this.pageSize, status!, type!).subscribe((res: any) => {
      this.documents = res.items;
      this.total = res.totalCount;
      this.cdr.detectChanges();
    });
  }

  changePage(p: number) {
    if (p < 1 || (p - 1) * this.pageSize >= this.total) return;
    this.page = p;
    this.load();
  }

  issue(doc: any) {
    this.service.issue(doc.id).subscribe({
      next: () => {
        Swal.fire('Emitido', '', 'success');
        this.load();
      },
    });
  }

  cancel(doc: any) {
    this.service.cancel(doc.id).subscribe({
      next: () => {
        Swal.fire('Anulado', '', 'success');
        this.load();
      },
    });
  }

  delete(doc: any) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(doc.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', '', 'success');
            this.load();
          },
        });
      }
    });
  }
}
