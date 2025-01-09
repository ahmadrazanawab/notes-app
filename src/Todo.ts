export interface Todo{
    _id: number;
    title: string;
    description: string;
    isActive: boolean;
    tag: string;
    createdAt?: string | Date;
}


export interface credentialsProps{
    name: string;
    email: string;
    number: number;
    password: string;
}

export interface getUserProps{
    name: string;
    email: string;
    number?: number;
}