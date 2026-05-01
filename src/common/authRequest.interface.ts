export class IauthRequest extends Request {
    user: {
        id: string;
        email: string;
        role: string;
    }
}