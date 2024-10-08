import { CastAction } from "./types";
import { getSharedEnv } from "./utils.server";
import { actionDefinitions } from "./validations.server";

const env = getSharedEnv();

export const deprecatedActions = ["mute", "warnAndHide"];

export const addToBypassAction = {
  action: {
    type: "post",
  },
  description: "Always curate casts from this user",
  name: "Bypass",
  automodAction: "addToBypass",
  icon: "shield-check",
  postUrl: `${env.hostUrl}/api/actions/addToBypass`,
  aboutUrl: "https://automod.sh",
  image: `${env.hostUrl}/actions/bypass.png`,
} as const;

export const cooldown24Action = {
  action: {
    type: "post",
  },
  description: "Hide all messages from a user for 24 hours",
  automodAction: "cooldown",
  name: "24h Cooldown",
  icon: "no-entry",
  postUrl: `${env.hostUrl}/api/actions/cooldown`,
  aboutUrl: "https://automod.sh",
  image: `${env.hostUrl}/actions/cooldown24.png`,
} as const;

export const banAction = {
  automodAction: "ban",
  action: {
    type: "post",
  },
  name: actionDefinitions["ban"].friendlyName,
  description: actionDefinitions["ban"].description,
  icon: "sign-out",
  postUrl: `${env.hostUrl}/api/actions/ban`,
  aboutUrl: "https://automod.sh",
  image: `${env.hostUrl}/actions/ban.png`,
} as const;

export const downvoteAction = {
  automodAction: "downvote",
  action: {
    type: "post",
  },
  name: actionDefinitions["downvote"].friendlyName,
  description: actionDefinitions["downvote"].description,
  icon: "thumbsdown",
  postUrl: `${env.hostUrl}/api/actions/downvote`,
  aboutUrl: "https://automod.sh",
  image: `${env.hostUrl}/actions/downvote.png`,
} as const;

export const likeAction = {
  automodAction: "like",
  action: {
    type: "post",
  },
  name: actionDefinitions["like"].friendlyName,
  description: actionDefinitions["like"].description,
  icon: "thumbsup",
  postUrl: `${env.hostUrl}/api/actions/like`,
  aboutUrl: "https://automod.sh",
  image: `${env.hostUrl}/actions/curate.png`,
} as const;

export const unlikeAction = {
  automodAction: "unlike",
  action: {
    type: "post",
  },
  name: actionDefinitions["unlike"].friendlyName,
  description: actionDefinitions["unlike"].description,
  icon: "eye-closed",
  postUrl: `${env.hostUrl}/api/actions/unlike`,
  aboutUrl: "https://automod.sh",
  image: `${env.hostUrl}/actions/hideQuietly.png`,
} as const;

export const actions = [
  addToBypassAction,
  cooldown24Action,
  banAction,
  downvoteAction,
  likeAction,
  unlikeAction,
] as const satisfies Array<CastAction>;
