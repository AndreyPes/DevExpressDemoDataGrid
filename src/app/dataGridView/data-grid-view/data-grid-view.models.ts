//candidates model
export class Candidates {
    Id: number;
    FirstName: string;
    LastName: string;
    CombinedCandidateName: string;
    DateCreated: string;
    LastContact: string;
    Recruiter: string;
    Email: string;
    Mobile: string;
    RecrModus: string;
    Level: string;
    ActualJobTitle: string;
    ActualCompany: string;
    Notes: string;
    StateId: number;
}

//extra data like as related table (hardcoded)
export class State {
    Id: number;
    Name: string;
}