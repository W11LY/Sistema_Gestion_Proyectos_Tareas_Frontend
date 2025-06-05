type typeClientResponse = {
    names: string;
    lastnames: string;
    phone: string;
    email: string;
    password: string;
}

type typeClientRequest = {
    userId: number;
    names: string;
    lastnames: string;
    phone: string;
    email: string;
}

type typeProjectResponse = {
    name: string;
    description: string;
    clientId: number;
}

type typeProjectRequest = {
    projectId: number;
    name: string;
    description: string;
    clientId: number;
}

type typeTaskResponse = {
    title: string;
    description: string;
    state: boolean;
    projectId: number;
}

type typeTaskRequest = {
    taskId: number;
    title: string;
    description: string;
    state: boolean;
    projectId: number;
}

type typeUpdatePassword = {
    passwordNew: string;
    passwordOld: string;
}

type typeLogin = {
    email: string;
    password: string;
}