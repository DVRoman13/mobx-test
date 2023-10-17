export interface IUsers {
  id?: number;
  username?: string;
  email?: string;
  website?: string;
  company?: TCompany;
}
interface TCompany {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}
