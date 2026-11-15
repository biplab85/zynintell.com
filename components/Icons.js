const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconHome = () => (<svg {...base}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>);
export const IconGrid = () => (<svg {...base}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>);
export const IconLayers = () => (<svg {...base}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></svg>);
export const IconBook = () => (<svg {...base}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></svg>);
export const IconChat = () => (<svg {...base}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>);
export const IconArrow = ({ size = 18 }) => (<svg {...base} width={size} height={size}><path d="M7 17L17 7M9 7h8v8" /></svg>);
export const IconPlay = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>);
export const IconStar = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4d00"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" /></svg>);
export const IconCheck = () => (<svg {...base} width={16} height={16}><path d="M5 12l5 5L20 7" /></svg>);
export const IconMenu = () => (<svg {...base}><path d="M4 7h16M4 12h16M4 17h10" /></svg>);
export const IconQuote = () => (<svg width="36" height="36" viewBox="0 0 24 24" fill="#ff4d00"><path d="M4 18h6v-6H6c0-2.2 1.8-4 4-4V6c-3.3 0-6 2.7-6 6zm10 0h6v-6h-4c0-2.2 1.8-4 4-4V6c-3.3 0-6 2.7-6 6z" /></svg>);
export const IconSpark = ({ size = 28 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="#ff4d00"><path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" /></svg>);
export const IconUsers = () => (<svg {...base}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></svg>);
export const IconFacebook = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14.1 2C10.9 2 10.2 4.4 10.2 6v2.5H8v3.8h2.2V22H14v-9.7h2.9l.4-3.8z" /></svg>);
export const IconPhone = () => (<svg {...base}><rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M10.5 18.5h3" /></svg>);
export const IconChart = () => (<svg {...base}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>);
export const IconPen = () => (<svg {...base}><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></svg>);
