import { SharedService } from '../service/shared.service';

export class Friend{
    public name : string = ""; // <-- the actual name of friend
    public belongsTo : string = ""; // <-- to specify that it belong to me

    public fbId : string = '';

    constructor() {}
}