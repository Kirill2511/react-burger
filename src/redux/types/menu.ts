export enum EItemIcon  {
    burgerIcon= "burgerIcon",
    listIcon= "listIcon",
    profileIcon= "profileIcon"
}

export type IItem = {
    id: string;
    name: string;
    href: string;
    icon: EItemIcon;
    exact: boolean;
};