import { Entretien } from "./entretien";
import { Feedback } from "./feedback";
import { loggedin } from "./loggedin";
import { Specialite } from "./specialite";

export class Candidate {
    id!: string;
    lastName!: string;
    firstName!: string;
    email!: string;
    phone!: string;
    recruteur!: loggedin;
    specialite!: Specialite;
    feedback!: Feedback;
    file!: string;
    listEntretien!: Entretien[];
}