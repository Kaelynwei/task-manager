import { User } from '../models/User';

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({ where: { email } });
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
    return await User.findOne({ where: { username } });
};

export const getUserById = async (id: number): Promise<User | null> => {
    return await User.findByPk(id);
};


export const createUser = async (userData: { email: string; username: string; passwordHash: string }): Promise<User> => {
    return await User.create(userData);
};