export interface UserProps {
    account_id: number;
    account_handle: string;
    name: string;
    email_address:string;
    bio: string;
    location: string;
    birthdate: string;
    password: string;
    dp_id: number;
    cover_id: number;
    refresh_token: string;
    created_at: string;
    updated_at: string;
}

export interface ProfileProps{
    isOpen: boolean;
    dpURL: string;
    coverURL: string;
    onClose: () => void;
    account_id?: number;
    account_handle?: string;
    name?: string;
    email_address?:string;
    bio?: string;
    location?: string;
    birthdate?: string;
    password?: string;
    dp_id?: number;
    cover_id?: number;
    refresh_token?: string;
    created_at?: string;
    updated_at?: string;
}

export interface PostProps{
    post_id:number;
    account_id:number;
    content:string;
    created_at:string;
    updated_at:string;
}

export interface FollowProps{
    follow_id:number;
    account_id:number;
    follower_id:number;
    created_at:string;
    updated_at:string;
    deleted_at:string;
    type: string;
    isFollowing: boolean;
}