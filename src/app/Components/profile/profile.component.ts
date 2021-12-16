import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/Product';
import { Rating } from 'src/app/Model/Rating';
import { uploadFileRequest } from 'src/app/Model/UploadFileRequest';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading = true;

  user = {} as User;
  userToUpdate = {} as User;
  like: number = 0;
  dislike: number = 0;
  evaluation: number = 0;
  isBanned: boolean = false;
  isAdmin: boolean = false;
  ownProfile: boolean = false;
  profileToRate: boolean = false;
  image: string = '';
  userConnected = {} as User;
  notValidatedProducts : Product[] = []

  constructor(
    private userService: UserService,
    private sessionService: SessionStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.userConnected = this.sessionService.getFromSessionStorage('user');
    if (this.userConnected === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.userConnected = await this.getUser(this.userConnected.mail);
      this.sessionService.addToSessionStorage('user', this.userConnected);
      //Initialising component variables
      const params = this.activatedRoute.snapshot.queryParamMap;
      let mail: any = params.get('mail');
      this.user = await this.getUser(mail);

      this.loading = false;
      this.isAdmin = this.userConnected.isAdmin;
      this.userToUpdate = this.user;
      this.isBanned = this.user.isBanned;
      if (this.userConnected.mail === this.user.mail) {
        this.ownProfile = true;
        this.notValidatedProducts = await this.getNotValidatedProducts(this.userConnected.id)
      } else {
        //get rates and check if sessionPerson already rate it and if he bought something to him
        let rates = this.user.ratings
        if(rates.find(rate => rate.idRater === this.userConnected.id) == undefined){
          let prodsBought = await this.getBoughtProducts(this.userConnected.id)
          if(prodsBought.find(prod => prod.sellerId === this.user.id)){
            this.profileToRate = true;
          }
        }
      }
      if (this.user.image !== undefined) {
        this.image = this.user.image;
      }

      //Calculating user ratings
      this.user.ratings.forEach((rating) => {
        if (rating.like == 1) {
          this.like++;
        } else if (rating.like == -1) {
          this.dislike++;
        }
      });

      if (this.like > 0 && this.dislike == 0) {
        this.evaluation = 100;
      } else if (this.like > 0 && this.dislike > 0) {
        this.evaluation = Math.round(
          (this.like / (this.like + this.dislike)) * 100
        );
      }
    }
  }

  async updateMail(newMail: any) {
    this.userToUpdate.mail = newMail;
    await this.updateUser();
    this.sessionService.addToSessionStorage('user', this.userToUpdate);
    await this.router.navigate(['/profil'], {
      queryParams: {
        mail: newMail,
      },
    });
    location.reload();
  }

  async updatePassword(newPassword: any) {
    this.userToUpdate.password = newPassword;
    await this.updateUser();
    this.sessionService.addToSessionStorage('user', this.userToUpdate);
    location.reload();
  }

  async banUser() {
    if (this.isAdmin) {
      this.userToUpdate.isBanned = !this.userToUpdate.isBanned;
      await this.updateUser();
      this.sessionService.addToSessionStorage('user', this.userToUpdate);
      location.reload();
    }
  }

  async unbanUser() {
    if (this.isAdmin) {
      this.userToUpdate.isBanned = !this.userToUpdate.isBanned;
      await this.updateUser();
      this.sessionService.addToSessionStorage('user', this.userToUpdate);
      location.reload();
    }
  }

  async rateAPerson(value: number) {
    let rate = {} as Rating;
    rate.idRated = this.user.id;
    rate.idRater = this.userConnected.id;
    rate.like = value;
    await this.addARate(rate);
    location.reload();
  }


  async handleChangeImage(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    var splited = event.target.files[0].name.split('.');
    var extention = splited[splited.length - 1];
    reader.readAsDataURL(event.target.files[0]);
    let newImage = {} as uploadFileRequest;
    reader.onload = async (_event) => {
      newImage.content = String(reader.result);
      newImage.fileName = this.user.id + Date.now() + 'profil.' + extention;
      this.user = await this.changeProfileImage(newImage)
      this.sessionService.addToSessionStorage('user', this.user)
      location.reload()
    };
  }

  //Methods calling services

  private async changeProfileImage(image : uploadFileRequest): Promise<User> {
    return await lastValueFrom(this.userService.updateImage(image, this.user.id));
  }

  private async getUser(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

  private async updateUser(): Promise<User> {
    return await lastValueFrom(
      this.userService.updateOne(this.user.id, this.userToUpdate)
    );
  }

  private async getBoughtProducts(id: string): Promise<Product[]> {
    return await lastValueFrom(this.userService.getBoughtProduct(id));
  }

  private async getNotValidatedProducts(id: string): Promise<Product[]> {
    return await lastValueFrom(this.userService.getNotValidatedProduct(id));
  }

  private async addARate(rate: Rating): Promise<Product[]> {
    return await lastValueFrom(this.userService.patchRates(rate));
  }
}
