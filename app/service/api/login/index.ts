import {post} from "@/app/service/fetch";
import {CreateUserParams} from "./interface";

export const CreateUser = (data: CreateUserParams) => {
    return post(`/register`, data);
};