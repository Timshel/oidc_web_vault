export const BadgeIcon = {
  Berry: {
    19: "/images/icon_berry19.png",
    38: "/images/icon_berry38.png",
  },
  LoggedOut: {
    19: "/images/icon_logged19.png",
    38: "/images/icon_logged38.png",
  } as IconPaths,
  Locked: {
    19: "/images/icon_locked19.png",
    38: "/images/icon_locked38.png",
  } as IconPaths,
  Unlocked: {
    19: "/images/icon19.png",
    38: "/images/icon38.png",
  } as IconPaths,
} as const satisfies Record<string, IconPaths>;

export type BadgeIcon = (typeof BadgeIcon)[keyof typeof BadgeIcon];

export type IconPaths = {
  19: string;
  38: string;
};
