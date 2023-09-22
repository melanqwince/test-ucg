import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from "../../models/user.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { uniqueUsernameValidator } from "../../validators/unique-username.validator";
import { matchPasswordValidator } from "../../validators/match-password.validator";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnChanges {
  public form!: FormGroup;
  @Input() activeUser: User | null = null;
  @Input() users!: User[];
  @Input() serverErrors: any;
  @Output() add = new EventEmitter<User>;
  @Output() save = new EventEmitter<User>;
  @Output() delete = new EventEmitter<User>;
  @Output() close = new EventEmitter<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(change: SimpleChanges) {

    if (change['users'] && change['users'].currentValue) {
      this.form = this.fb.group({
        username: [null, [Validators.required, uniqueUsernameValidator(this.users)]],
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        user_type: [null, Validators.required],
        password: [null, Validators.required],
        repeat_password: [null, Validators.required]
      }, {
        validators: matchPasswordValidator('password', 'repeat_password')
      });

      this.form.get('username')!.valueChanges.subscribe(() => {
        this.form.get('username')!.updateValueAndValidity({ onlySelf: false, emitEvent: false });
      });

    }

    if (change['activeUser'] && change['activeUser'].currentValue ) {
      const userCopy = {...this.activeUser, repeat_password: this.activeUser!.password};
      delete userCopy.old_username
      this.form.setValue(userCopy);
      this.form.get('username')?.setValidators([Validators.required, uniqueUsernameValidator([ ...this.users.filter((u) => u.username !== this.activeUser?.username) ])])
    }

    if (change['activeUser'] && !change['activeUser'].currentValue) {
      this.form.reset();
    }
  }

  onDelete() {
    if (this.activeUser) {
      this.delete.emit(this.activeUser)
    }
  }

  onSave() {
    if (this.form.valid && this.activeUser) {
      this.save.emit({... this.form.value, old_username: this.activeUser.username});
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.add.emit(this.form.value);
    }
  }
}
