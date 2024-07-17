export interface IConfigApiMethods {
  [key: string]: {
    path: string;
    cache: boolean;
    method: "GET" | "POST" | "PUT" | "DELETE"; 
  };
}
