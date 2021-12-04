const generateString = require("./generateString");
const _ = require("lodash");

const uploadOneImage = async (image) => {
  try {
    const imageNamePart1 = _.trim(generateString(7));
    const imageNamePart2 = _.trim(generateString(7));
    const imageType = image.mimetype.split("/")[0];
    const imageExtension = image.mimetype.split("/")[1];
    if (imageType != "image") {
      return res
        .status(400)
        .json({ success: false, msg: "pleas provide a valid image" });
    }
    const imageFinalName = `${imageNamePart1}-${imageNamePart2}.${imageExtension}`;
    await image.mv(`./uploads/products/images/${imageFinalName}`, (err) => {
      if (err) console.log(err);
    });
    return imageFinalName;
  } catch (error) {
    return false;
  }
};

const uploadMultipleImage = async (images) => {
  try {
    const ImageList = [];
    for (let i = 0; i < images.length; i++) {
      const img = await uploadOneImage(images[i]);
      ImageList.push(img);
    }
    return(ImageList);
  } catch (error) {
    return false;
  }
};

module.exports = { uploadOneImage, uploadMultipleImage };
