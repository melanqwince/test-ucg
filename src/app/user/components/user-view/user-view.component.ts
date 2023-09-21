import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from "../../models/user.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnChanges{
  public form: FormGroup = this.fb.group({
    username: [null, Validators.required],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    user_type: [null, Validators.required],
    password: [null, Validators.required],
    repeat_password: [null, Validators.required]
  })
  @Input() user: User | null = null;
  @Output() add = new EventEmitter<User>;
  @Output() save = new EventEmitter<User>;
  @Output() delete = new EventEmitter<User>;
  @Output() close = new EventEmitter<boolean>;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['user'] && change['user'].currentValue) {
      const userCopy = {...this.user, repeat_password: this.user!.password};
      delete userCopy.old_username
      this.form.setValue(userCopy);
    }
  }

  onDelete() {
    if (this.user) {
      this.delete.emit(this.user)
    }
  }

  onSave() {
    if (this.form.valid && this.user) {
      this.save.emit({... this.form.value, old_username: this.user.username});
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.add.emit(this.form.value);
    }
  }
}
