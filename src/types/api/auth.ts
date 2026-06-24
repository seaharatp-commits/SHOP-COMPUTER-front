export type Role = "CUSTOMER" | "ADMIN";

export interface AuthUserDto {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: Role;
}

export interface AuthResponseDto {
  user: AuthUserDto;
  accessToken: string;
  refreshToken: string;
}
