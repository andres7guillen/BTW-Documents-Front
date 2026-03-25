import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocumentHistoryService } from '../../../../core/services/document-history.service';
import { DocumentService } from '../../../../core/services/document.service';

import { DocumentStatusHistory } from '../../../../core/models/document-history.model';
import { DocumentModel } from '../../../../core/models/document.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-detail.component.html',
})
export class DocumentDetailComponent implements OnInit {
  doc!: DocumentModel;
  history: DocumentStatusHistory[] = [];
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    legalNumber: [''],
    type: ['Invoice'],
    emitterNit: [''],
    emitterName: [''],
    receiverNit: [''],
    receiverName: [''],
    referenceDocumentId: [null],
    items: this.fb.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private service: DocumentService,
    private historyService: DocumentHistoryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.load(id);
    this.loadHistory(id);
  }

  loadHistory(id: string) {
    this.historyService.getHistory(id).subscribe({
      next: (res) => {
        this.history = res.items;
        this.cdr.detectChanges();
      },
    });
  }

  load(id: string) {
    this.service.getById(id).subscribe({
      next: (res) => {
        this.doc = res;
        this.form.patchValue(res);
        this.cdr.detectChanges();
      },
    });
  }
}
