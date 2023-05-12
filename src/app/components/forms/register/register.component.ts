import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { DbService } from 'src/app/services/db-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formRegister: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    repassword: new FormControl(),
  });
  public isLoading: boolean = false;
  public error: string = '';
  public userExist: boolean | undefined;
  public usersObservable!: Observable<IUser[]>;
  public users: IUser[] = [];

  @Output() openLoginModal = new EventEmitter();
  @Output() closeRegisterModal = new EventEmitter();

  public constructor(
    private fb: FormBuilder,
    private bdService: DbService,
    private toastr: ToastrService
  ) {
    this.usersObservable = bdService.getAllUsers();

    this.usersObservable.subscribe((users) => {
      this.users = users;
    });
  }

  public onClick() {
    this.closeRegisterModal.emit();
    this.openLoginModal.emit();
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email, this.spacesValidator],
        ],
        password: ['', Validators.required],
        repassword: ['', [Validators.required]],
      },
      { validator: this.ConfirmedValidator('password', 'repassword') }
    );
  }

  async onSubmit() {
    if (!this.formRegister.invalid) {
      const { email, password, name } = this.formRegister.value;

      this.isLoading = true;

      this.userExist = this.users.some(
        (u) => u.email === this.formRegister.value['email']
      );

      if (this.userExist) {
        this.isLoading = false;
        return;
      }

      try {
        await this.bdService.registerUser({ email, password, name });

        this.toastr.success('Usuario creado con exito!');
      } catch (error: any) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }

  private ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
