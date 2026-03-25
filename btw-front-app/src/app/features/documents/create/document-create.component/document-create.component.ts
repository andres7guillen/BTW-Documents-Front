import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../../../../core/services/document.service';
import { CommonModule } from '@angular/common';
import { DocumentModel } from '../../../../core/models/document.model';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './document-create.component.html',
})
export class DocumentCreateComponent {
  constructor(
    private service: DocumentService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  private fb = inject(FormBuilder);
  invoices: DocumentModel[] = [];

  form = this.fb.group({
    legalNumber: [''],
    type: ['Invoice'], // o CreditNote
    emitterNit: [''],
    emitterName: [''],
    receiverNit: [''],
    receiverName: [''],
    referenceDocumentId: [null], // solo para nota crédito
    items: this.fb.array([]),
  });

  itemForm = this.fb.group({
    description: [''],
    quantity: [1],
    unitValue: [0],
  });

  get items() {
    return this.form.get('items') as FormArray;
  }

  loadInvoices() {
    this.service.getAll(1, 100, 'Issued', 'Invoice').subscribe((res: any) => {
      this.invoices = res.items;
      this.cdr.detectChanges();
    });
  }

  addItemFromModal() {
    if (this.itemForm.invalid) return;

    this.items.push(this.fb.group(this.itemForm.value));
    this.itemForm.reset({ quantity: 1, unitValue: 0 });
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }

  get total() {
    return this.items.controls.reduce((sum, item: any) => {
      return sum + item.value.quantity * item.value.unitValue;
    }, 0);
  }

  ngOnInit() {
    this.form.get('type')?.valueChanges.subscribe((type) => {
      const refControl = this.form.get('referenceDocumentId');

      if (type === 'CreditNote') {
        this.loadInvoices();
        refControl?.setValidators([Validators.required]);
      } else {
        refControl?.clearValidators();
        refControl?.setValue(null);
      }

      refControl?.updateValueAndValidity();
    });
  }

  goBack(): void {
    this.router.navigate(['/documents']);
  }

  save() {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/documents']);
        Swal.fire('Creado', '', 'success');
      },
    });
  }
}
