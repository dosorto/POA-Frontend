export class Contra{
  _id?: number;
  old_password: string;
  new_password: String;
  new_password_again: string;

  constructor( old_password: string,new_password:string, new_password_again:string){
   this.old_password = old_password;
   this.new_password = new_password;
   this.new_password_again = new_password_again;
  }
}