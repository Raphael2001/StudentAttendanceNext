const LINKS_TYPES = {
  LINK_INTERNAL: {
    text: "קישור פנימי",
    template: "{link}",
    _id: "LINK_INTERNAL",
  },
  LINK_EXT: {
    text: "קישור חיצוני",
    template: "{link}",
    _id: "LINK_EXT",
  },
  PHONE: {
    text: "טלפון",
    template: "tel:{link}",
    _id: "PHONE",
  },
  EMAIL: {
    text: "מייל",
    template: "mailto:{link}",
    _id: "EMAIL",
  },
};

export default LINKS_TYPES;
