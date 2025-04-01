
export type User = {
    idNumber?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    address?: string,
    phone?: string,
    // password?: string
    city?: string,
    birthDate?:string,

}
export type Action =
    | { type: 'NEW_USER', data: User }
    | { type: 'DELETE_USER', id: number }
    | { type: 'UPDATE_USER', data: Partial<User> }
    ;
export const userReducer = (
    state: User,
    action:Action
): User => {
    switch (action.type) {
        case 'NEW_USER':

            return {
                ...state,
                ...action.data
            };
        case 'DELETE_USER':
            return {} as User;

        case 'UPDATE_USER':
            return { ...state, ...action.data };

        default:
            return state;
    }
};

