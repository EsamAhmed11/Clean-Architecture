import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/Models/Person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html'
})
export class PersonFormComponent implements OnInit, OnChanges {
  @Input() person: Person = { id: 0, name: '', email: '', age: 0, address: '' };
  @Input() isEdit: boolean = false;
  @Output() submitForm = new EventEmitter<Person>();
  @Output() cancelForm = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person'] && this.form) {
      this.form.patchValue(this.person || {});
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      id: [this.person.id],
      name: [this.person.name, [Validators.required]],
      email: [this.person.email, [Validators.required, Validators.email]],
      age: [this.person.age],
      address: [this.person.address]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelForm.emit();
  }
}
