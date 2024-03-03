import { Account, Client, ID } from "appwrite";
import Config from "react-native-config";
import Snackbar from "react-native-snackbar";

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    name: string;
    email: string;
    password: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};

class AppwriteService {
    account;

    constructor() {
        appwriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

        this.account = new Account(appwriteClient);
    }

    // Create a new record of user inside appwrite

    async createAccount({ name, email, password }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                name,
                email,
                password,
            )
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Service :: createAccount :: error", error);
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Service :: login :: error", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}

export default AppwriteService