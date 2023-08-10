import gravatar from "gravatar";

const generateGravatar = (email) => {
  // generate a url for the gravatar that is using https
  let avatar;
  try {
    avatar = gravatar.url(email, {
      protocol: "http",
      s: "200",
      r: "PG",
      d: "mm",
    });
  } catch (error) {
    console.log("Error in generating gravatar", error);
  } finally {
    return avatar;
  }
};

export default generateGravatar;
