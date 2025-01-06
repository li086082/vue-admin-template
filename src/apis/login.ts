import { httpClient } from "./httpClient";

interface ILogin {
    a: string;
    b: string;
}

export const Login = async (account: string, password: string) => {
    const a = await httpClient.get<ILogin>("test");
    console.log(a.data.data.a);
};
