export namespace ChangePasswordModel {
    export interface fwP {
      id: string;
      email: string;
      username: string;
      password:string;
      isDelete: boolean;
      resetToken:string
      initialYear: string;
      finalYear: string;
    }
  }
  