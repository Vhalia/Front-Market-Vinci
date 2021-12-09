export interface User {
    id : string;
    name : string;
    surname : string;
    mail : string;
    like : number;
    dislike : number;
    campus : string;
    password : string;
    isBanned : boolean;
    isAdmin : boolean;
}