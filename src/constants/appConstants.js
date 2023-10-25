const app_data = {
  downloadCheckList: [
    {
      label:
        "I did not attach any link or file that will cause any risk to the user",
      checked: false,
    },
    {
      label: "I have verified that all the links are working correctly",
      checked: false,
    },
    {
      label: "I have removed all unused fields and sections",
      checked: false,
    },
  ],
  images: {
    logo: {
      url: null,
      blob: null,
      ext: null,
      mime: null,
      resized: null,
    },
    photo: {
      url: null,
      blob: null,
      ext: null,
      mime: null,
      resized: null,
    },
    cover: {
      url: null,
      blob: null,
      ext: null,
      mime: null,
      resized: null,
    },
  },
  colors: {
    logoBg: {
      color: `#059669`,
      openPalette: false,
    },
    mainBg: {
      color: `#ddd`,
      openPalette: false,
    },
    buttonBg: {
      color: `#059669`,
      openPalette: false,
    },
    cardBg: {
      color: `#fff`,
      openPalette: false,
    },
  },
  genInfo: {
    fname: null,
    lname: null,
    pronouns: null,
    title: null,
    biz: null,
    addr: null,
    desc: null,
    key: null,
    tracker: null,
    fontLink: null,
    fontCss: null,
  },
  primaryActions: [],
  filterPrimary: "",
  secondaryActions: [],
  filterSecondary: "",
  actions: {
    primaryActions: [
      {
        name: "Mobile",
        icon: "call",
        href: "tel:",
        placeholder: "+XX XXXXX XXXXX",
        value: null,
        label: "Mobile number",
        order: 0,
        isURL: 0,
      },
      {
        name: "Office",
        icon: "call",
        href: "tel:",
        placeholder: "+XX XXXXX XXXXX",
        value: null,
        label: "Office number",
        order: 1,
        isURL: 0,
      },
      {
        name: "Home",
        icon: "call",
        href: "tel:",
        placeholder: "+XX XXXXX XXXXX",
        value: null,
        label: "Home number",
        order: 2,
        isURL: 0,
      },
      {
        name: "SMS",
        icon: "sms",
        href: "sms:",
        placeholder: "+XX XXXXX XXXXX",
        value: null,
        label: "SMS mobile number",
        order: 3,
        isURL: 0,
      },
      {
        name: "Email",
        icon: "email",
        href: "mailto:",
        placeholder: "info@example.com",
        value: null,
        label: "Email address",
        order: 4,
      },
      {
        name: "Website",
        icon: "website",
        placeholder: "https://example.com",
        value: null,
        label: "Website URL",
        order: 5,
        isURL: 1,
      },
      {
        name: "Store",
        icon: "store",
        placeholder: "https://example.com/storeID",
        value: null,
        label: "Online Store URL",
        order: 6,
        isURL: 1,
      },
      {
        name: "Location",
        icon: "location",
        placeholder: "Map location URL",
        value: null,
        label: "Map location URL",
        order: 7,
        isURL: 1,
      },

      {
        name: "Signal",
        icon: "signal",
        href: "https://signal.me/#p/",
        placeholder: "+XXXXXXXXXXXX",
        value: null,
        label: "Signal number with country code (no spaces)",
        order: 8,
        isURL: 1,
      },
      {
        name: "Telegram",
        icon: "telegram",
        href: "https://t.me/",
        placeholder: "username",
        value: null,
        label: "Telegram username",
        order: 9,
        isURL: 1,
      },
      {
        name: "Matrix",
        icon: "matrix",
        href: "https://matrix.to/#/",
        placeholder: "@username:matrix.org",
        value: null,
        label: "Matrix userID",
        order: 10,
        isURL: 1,
      },
      {
        name: "WhatsApp",
        icon: "whatsapp",
        href: "https://wa.me/",
        placeholder: "phone number",
        value: null,
        label: "WhatsApp profile URL",
        order: 11,
        isURL: 1,
      },
      {
        name: "Messenger",
        icon: "messenger",
        href: "https://m.me/",
        placeholder: "username",
        value: null,
        label: "Messenger username",
        order: 12,
        isURL: 1,
      },
      {
        name: "Skype",
        icon: "skype",
        href: "skype:",
        hrefEnd: "?chat",
        placeholder: "username",
        value: null,
        label: "Skype username",
        order: 13,
        isURL: 1,
      },
      {
        name: "Line",
        icon: "line",
        href: "https://line.me/ti/p/",
        placeholder: "LINE ID",
        value: null,
        label: "Line profile ID",
        order: 14,
        isURL: 1,
      },
      {
        name: "Viber",
        icon: "viber",
        href: "viber://chat?number=",
        placeholder: "XX XXXXX XXXXX",
        value: null,
        label: "Viber mobile number",
        order: 15,
        isURL: 1,
      },
      {
        name: "WeChat",
        icon: "wechat",
        href: "weixin://dl/chat?",
        placeholder: "WeChat ID",
        value: null,
        label: "WeChat profile ID",
        order: 16,
        isURL: 1,
      },
      {
        name: "Calendar",
        icon: "calendar",
        placeholder: "https://example.com/calendarID",
        value: null,
        label: "Calendar URL",
        order: 17,
        isURL: 1,
      },
      {
        name: "XMPP",
        icon: "xmpp",
        href: "xmpp:",
        placeholder: "XMPP ID",
        value: null,
        label: "XMPP ID",
        order: 18,
        isURL: 1,
      },
      // {
      //   name: 'IRC',
      //   icon: 'irc',
      //   href: 'irc:',
      //   placeholder: 'IRC ID',
      //   value: null,
      //   label: 'IRC ID',
      //   order: 19,
      //   isURL: 1,
      // },
    ],
    secondaryActions: [
      // todo: Fix Instagram gradient icon preview
      {
        name: "Instagram",
        icon: "instagram",
        href: "https://instagram.com/",
        placeholder: "username",
        value: null,
        color: "#ffffff",
        light: 1,
        gradientIcon: 1,
        label: "Instagram username",
      },
      {
        name: "Threads",
        icon: "threads",
        href: "https://www.threads.net/",
        placeholder: "@username",
        value: null,
        color: "#000000",
        label: "Threads username",
      },
      {
        name: "Pixelfed",
        icon: "pixelfed",
        placeholder: "https://pixelfed.social/username",
        value: null,
        color: "#8d59a8",
        label: "Pixelfed profile URL",
      },
      {
        name: "Facebook",
        icon: "facebook",
        href: "https://facebook.com/",
        placeholder: "username or pagename",
        value: null,
        color: "#1877f2",
        label: "Facebook username or pagename",
      },
      {
        name: "Diaspora",
        icon: "diaspora",
        placeholder: "https://diaspora.social/username",
        value: null,
        color: "#000000",
        label: "Diaspora profile URL",
      },
      {
        name: "Friendica",
        icon: "friendica",
        placeholder: "https://friendica.social/username",
        value: null,
        color: "#1d6e9a",
        label: "Friendica profile URL",
      },
      {
        name: "Twitter",
        icon: "twitter",
        href: "https://twitter.com/",
        placeholder: "username",
        value: null,
        color: "#1da1f2",
        label: "Twitter username",
      },
      {
        name: "Mastodon",
        icon: "mastodon",
        placeholder: "https://mastodon.social/@username",
        value: null,
        color: "#2b90d9",
        label: "Mastodon profile URL",
      },
      {
        name: "LinkedIn",
        icon: "linkedin",
        href: "https://linkedin.com/",
        placeholder: "in/username or company/companyname",
        value: null,
        color: "#0077b5",
        label: "Linkedin username or companyname",
      },
      {
        name: "YouTube",
        icon: "youtube",
        href: "https://youtube.com/",
        placeholder: "channel name or ID",
        value: null,
        color: "#ff0000",
        label: "Youtube channel name or ID",
      },
      {
        name: "Vimeo",
        icon: "vimeo",
        href: "https://vimeo.com/",
        placeholder: "channelname",
        value: null,
        color: "#1ab7ea",
        label: "Vimeo channelname",
      },
      {
        name: "Peertube",
        icon: "peertube",
        placeholder: "https://peertube.video/channelname",
        value: null,
        color: "#ffffff",
        light: 1,
        label: "Peertube channel URL",
      },
      {
        name: "Pinterest",
        icon: "pinterest",
        href: "https://pinterest.com/",
        placeholder: "username",
        value: null,
        color: "#bd081c",
        label: "Pinterest username",
      },
      {
        name: "Behance",
        icon: "behance",
        href: "https://behance.net/",
        placeholder: "username",
        value: null,
        color: "#1769ff",
        label: "Behance username",
      },
      {
        name: "Dribbble",
        icon: "dribbble",
        href: "https://dribbble.com/",
        placeholder: "username",
        value: null,
        color: "#ea4c89",
        label: "Dribbble username",
      },
      {
        name: "Reddit",
        icon: "reddit",
        href: "https://reddit.com/",
        placeholder: "username",
        value: null,
        color: "#ff5700",
        label: "Reddit username",
      },
      {
        name: "VK",
        icon: "vk",
        href: "https://vk.com/",
        placeholder: "pagename",
        value: null,
        color: "#4a76a8",
        label: "VK page URL",
      },
      {
        name: "Snapchat",
        icon: "snapchat",
        href: "https://www.snapchat.com/add/",
        placeholder: "username",
        value: null,
        color: "#fffc00",
        light: 1,
        label: "Snapchat username",
      },
      {
        name: "Tumblr",
        icon: "tumblr",
        href: "https://",
        hrefEnd: ".tumblr.com/",
        placeholder: "username",
        value: null,
        color: "#2c4762",
        label: "Tumblr blog URL",
      },
      {
        name: "Quora",
        icon: "quora",
        href: "https://quora.com/",
        placeholder: "username",
        value: null,
        color: "#a82400",
        label: "Quora username",
      },
      {
        name: "Medium",
        icon: "medium",
        placeholder: "https://medium.com/publication_name",
        value: null,
        color: "#000000",
        label: "Medium publication",
      },
      {
        name: "Discord",
        icon: "discord",
        placeholder: "https://discord.gg/invitecode",
        value: null,
        color: "#7289da",
        label: "Discord channel invite link",
      },
      {
        name: "Twitch",
        icon: "twitch",
        href: "https://twitch.tv/",
        placeholder: "username",
        value: null,
        color: "#9146ff",
        label: "Twitch username",
      },
      {
        name: "Spotify",
        icon: "spotify",
        href: "https://open.spotify.com/user/",
        placeholder: "username",
        value: null,
        color: "#1ed760",
        label: "Spotify username",
      },
      {
        name: "Soundcloud",
        icon: "soundcloud",
        href: "https://soundcloud.com/",
        placeholder: "username",
        value: null,
        color: "#ff3300",
        label: "Soundcloud username",
      },
      {
        name: "Funkwhale",
        icon: "funkwhale",
        placeholder: "https://funkwhale.audio/username",
        value: null,
        color: "#ffffff",
        light: 1,
        label: "Funkwhale username",
      },
      {
        name: "GitHub",
        icon: "github",
        href: "https://github.com/",
        placeholder: "username",
        value: null,
        color: "#333",
        label: "Github username",
      },
      {
        name: "GitLab",
        icon: "gitlab",
        href: "https://gitlab.com/",
        placeholder: "username",
        value: null,
        color: "#171321 ",
        label: "Gitlab username",
      },
      {
        name: "Codeberg",
        icon: "codeberg",
        href: "https://codeberg.org/",
        placeholder: "username",
        value: null,
        color: "#2185d0",
        label: "Codeberg username",
      },
      {
        name: "Yelp",
        icon: "yelp",
        href: "https://yelp.com/",
        placeholder: "bizname",
        value: null,
        color: "#fff",
        light: 1,
        label: "Yelp pagename",
      },
      {
        name: "PayPal",
        icon: "paypal",
        href: "https://paypal.me/",
        placeholder: "username",
        value: null,
        color: "#003087",
        label: "PayPal.me URL",
      },
      {
        name: "Patreon",
        icon: "patreon",
        href: "https://patreon.com/",
        placeholder: "username",
        value: null,
        color: "#FF424D",
        label: "Patreon URL",
      },
      {
        name: "Open-Collective",
        icon: "open-collective",
        href: "https://opencollective.com/",
        placeholder: "projectname",
        value: null,
        color: "#fff",
        light: 1,
        label: "Open Collective projectname",
      },
      {
        name: "TikTok",
        icon: "tiktok",
        href: "https://tiktok.com/",
        placeholder: "username",
        value: null,
        color: "#fff",
        light: 1,
        label: "TikTok username",
      },
      {
        name: "Cash App",
        icon: "cashapp",
        href: "https://cash.app/",
        placeholder: "$username",
        value: null,
        color: "#fff",
        light: 1,
        label: "Cash App username",
      },
      {
        name: "Siilo",
        icon: "siilo",
        href: "https://app.siilo.com/qr/",
        placeholder: "userID",
        value: null,
        color: "#17233b",
        label: "Siilo userID",
      },
      {
        name: "App Store",
        icon: "appstore",
        placeholder: "https://apps.apple.com/in/app/appname/id",
        value: null,
        color: "linear-gradient(#5fc9f8, #147efb)",
        label: "App Store developer/app URL",
      },
      {
        name: "Play Store",
        icon: "playstore",
        placeholder: "https://play.google.com/store/apps/details?id=",
        value: null,
        color: "#fff",
        light: 1,
        label: "Play Store developer/app URL",
      },
      {
        name: "ArtStation",
        icon: "artstation",
        href: "https://www.artstation.com/",
        placeholder: "username",
        value: null,
        color: "#171717",
        label: "ArtStation username",
      },
      {
        name: "Buy me a coffee",
        icon: "buymeacoffee",
        href: "https://www.buymeacoffee.com/",
        placeholder: "username",
        value: null,
        color: "#ffdd00",
        light: 1,
        label: "Buy me a coffee username",
      },
    ],
  },
  featured: [
    {
      title: "Section title",
      content: [],
    },
  ],
  hostedURL: null,
  footerCredit: true,
  PreviewMode: true,
  content: null,
  inView: false,
  showPreview: false,
  scrollPos: null,
  opening: false,
};
export const API_URL = "https://lets-introduce-server.onrender.com";

export default app_data;
