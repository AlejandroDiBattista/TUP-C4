import { users } from "./constants.js";

export const handleError =(res, field, message, status = 400) => {
    res.status(status).json({ field, message });
}

export const generateId = () => {
    const id = users?.length > 0
    ? Math.max(...users.map((user) => user.id)) + 1
    : 1;

    return id;
}