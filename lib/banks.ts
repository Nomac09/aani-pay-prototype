// TODO: Deep link schemes below need verification against each bank's iOS Universal Links and
// Android intent filters before production. As of May 2026, Aani enrollment screens are NOT
// directly deep-linkable — the scheme only opens the bank app at its default landing screen.
// The user must navigate to Aani manually using the printed steps below.
// App Store / Play Store URLs also need to be confirmed per bank before going live.

export interface Bank {
  id: string;
  name: string;
  brandColor: string;
  deepLink: string;       // TODO: verify scheme per bank before production
  iosUrl: string;         // TODO: confirm app ID per bank
  androidUrl: string;     // TODO: confirm package name per bank
  steps: readonly string[];
  helpUrl?: string;
}

export const BANKS: readonly Bank[] = [
  {
    id: "enbd",
    name: "Emirates NBD",
    brandColor: "#006838",
    deepLink: "enbdapp://",                                        // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/emirates-nbd/id461838831",
    androidUrl: "https://play.google.com/store/apps/details?id=com.emiratesnbd.android",
    steps: [
      "Open the Emirates NBD app and sign in.",
      "Tap \"Pay\" in the bottom navigation bar.",
      "Select \"Aani\" from the list of payment options.",
      "Tap \"Register\" and verify with the OTP sent to your UAE mobile number.",
    ],
  },
  {
    id: "fab",
    name: "FAB",
    brandColor: "#9B2335",
    deepLink: "fabmobile://",                                      // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/fab-mobile-banking/id836030745",
    androidUrl: "https://play.google.com/store/apps/details?id=com.firstgulf.fab",
    steps: [
      "Open the FAB Mobile Banking app and log in.",
      "Go to \"Transfers\" in the main navigation.",
      "Tap \"Aani\" and select \"Register for Aani\".",
      "Verify your UAE mobile number via the SMS code.",
    ],
  },
  {
    id: "adcb",
    name: "ADCB",
    brandColor: "#D4380D",
    deepLink: "adcbmobile://",                                     // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/adcb/id449945707",
    androidUrl: "https://play.google.com/store/apps/details?id=com.adcb.bank",
    steps: [
      "Open ADCB Mobile Banking and sign in.",
      "Tap \"Payments\" in the bottom navigation bar.",
      "Choose \"Aani Instant Payments\" from the menu.",
      "Select \"Register\" and link your UAE mobile number.",
    ],
  },
  {
    id: "mashreq",
    name: "Mashreq",
    brandColor: "#5B2D8E",
    deepLink: "mashreqneo://",                                     // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/mashreq-mobile-banking/id383851027",
    androidUrl: "https://play.google.com/store/apps/details?id=com.mashreq.mobile.banking",
    steps: [
      "Open the Mashreq or Mashreq Neo app and log in.",
      "Go to \"Pay and Transfer\" from the home screen.",
      "Tap \"Aani\" and select \"Enroll\".",
      "Link your registered UAE mobile number to complete setup.",
    ],
  },
  {
    id: "adib",
    name: "ADIB",
    brandColor: "#1B4D3E",
    deepLink: "adib://",                                           // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/adib-mobile-banking/id427287471",
    androidUrl: "https://play.google.com/store/apps/details?id=com.adib.mobilebank",
    steps: [
      "Open the ADIB Mobile Banking app.",
      "Navigate to \"Transfers\" from the main menu.",
      "Select \"Aani Payments\" and tap \"Register\".",
      "Confirm your UAE mobile number via the OTP verification step.",
    ],
  },
  {
    id: "rakbank",
    name: "RAKBANK",
    brandColor: "#E87722",
    deepLink: "rakbank://",                                        // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/rakbank-mobile-banking/id583671244",
    androidUrl: "https://play.google.com/store/apps/details?id=com.rakbank.mobilebanking",
    steps: [
      "Open the RAKBANK app and log in.",
      "Tap \"Transfers\" or \"Payments\" in the navigation bar.",
      "Find \"Aani\" and tap \"Get Started\".",
      "Register your UAE mobile number to activate Aani.",
    ],
  },
  {
    id: "cbd",
    name: "CBD",
    brandColor: "#005F73",
    deepLink: "cbd://",                                            // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/cbd-mobile-banking/id1062226817",
    androidUrl: "https://play.google.com/store/apps/details?id=com.cbd.mobilebanking",
    steps: [
      "Open the CBD app and sign in.",
      "Tap \"Payments\" from the home screen.",
      "Select \"Aani\" and then \"Enroll Now\".",
      "Verify your UAE mobile number to complete registration.",
    ],
  },
  {
    id: "finance-house",
    name: "Finance House",
    brandColor: "#1A3A6B",
    deepLink: "financehouse://",                                   // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/finance-house/id1086394867",
    androidUrl: "https://play.google.com/store/apps/details?id=ae.financehouse.mobile",
    steps: [
      "Open the Finance House mobile app and log in.",
      "Navigate to \"Payments\" in the main menu.",
      "Look for \"Aani\" under instant payment options.",
      "Tap \"Register\" and link your UAE mobile number.",
    ],
  },
  {
    id: "habib",
    name: "Habib Bank AG Zurich",
    brandColor: "#1C3557",
    deepLink: "hbzurich://",                                       // TODO: verify
    iosUrl: "https://apps.apple.com/ae/app/habib-bank-ag-zurich/id1449453588",
    androidUrl: "https://play.google.com/store/apps/details?id=com.habibbank.uae",
    steps: [
      "Open the Habib Bank AG Zurich app and sign in.",
      "Go to \"Transfers and Payments\" from the menu.",
      "Select \"Aani\" and tap \"Register\".",
      "Complete setup by verifying your UAE mobile number.",
    ],
  },
  {
    id: "other",
    name: "Other",
    brandColor: "#5C6566",
    deepLink: "https://aep.ae/services/aani",
    iosUrl: "https://aep.ae/services/aani",
    androidUrl: "https://aep.ae/services/aani",
    steps: [
      "Open your UAE bank's mobile app.",
      "Look for \"Aani\" in the Payments or Transfers section of the menu.",
      "Tap \"Register\" or \"Enroll\" to link your UAE mobile number.",
    ],
    helpUrl: "https://aep.ae/services/aani",
  },
] as const;
