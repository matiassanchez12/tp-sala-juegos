import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  public userExist: boolean | undefined;

  public users: IUser[] = [];
  public usersObs: Observable<IUser[]>;

  @Output() openRegisterModal = new EventEmitter();
  @Output() closeLoginModal = new EventEmitter();

  public constructor(
    private fb: FormBuilder,
    private bdService: DbService,
    private toastr: ToastrService
  ) {
    this.usersObs = this.bdService.getAllUsers();
    //como hago para desuscribirme al momento de desmontar el component
    this.usersObs.subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, this.spacesValidator],
      ],
      password: ['', Validators.required],
    });
  }

  onClick() {
    this.closeLoginModal.emit();
    this.openRegisterModal.emit();
  }

  onSubmit() {
    if (!this.formLogin.invalid) {
      this.userExist = this.users.some(
        (u) =>
          u.email === this.formLogin.value['email'] &&
          u.password === this.formLogin.value['password']
      );

      if (!this.userExist) {
        return;
      }

      this.toastr.success('Sesión iniciada con exito!');
    }
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }
}
