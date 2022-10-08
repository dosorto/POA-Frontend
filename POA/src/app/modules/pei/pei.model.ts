export namespace peiModel {
  export interface Pei {
    id: number;
    name: string;
    initialYear: string;
    finalYear: string;
    isDelete: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}
