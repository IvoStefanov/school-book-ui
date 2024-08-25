import { School } from "../school/school";

export interface Parent {
  id: number,
  name: string,
  school: School,
  address: string,
  contact: string,
  userId: number
}
