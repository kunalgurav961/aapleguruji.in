import Review from "../models/reviewModel.js";

export const getPublicReviews = async (req, res) => {
  try {
    const reviews = await Review.find(
      { isPublished: true },
      { name: 1, city: 1, poojaName: 1, content: 1, rating: 1, createdAt: 1 },
    ).sort({ createdAt: -1 });

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error("Get public reviews error:", error);
    return res.status(500).json({ message: "Unable to load reviews." });
  }
};

export const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error("Get admin reviews error:", error);
    return res.status(500).json({ message: "Unable to load reviews." });
  }
};

export const createAdminReview = async (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const city = typeof req.body.city === "string" ? req.body.city.trim() : "";
  const poojaName =
    typeof req.body.poojaName === "string" ? req.body.poojaName.trim() : "";
  const content =
    typeof req.body.content === "string" ? req.body.content.trim() : "";
  const rating = Number(req.body.rating);

  if (!name || name.length > 80) {
    return res.status(422).json({ message: "Enter a name up to 80 characters." });
  }
  if (city.length > 100) {
    return res.status(422).json({ message: "City must be 100 characters or fewer." });
  }
  if (!poojaName || poojaName.length > 120) {
    return res.status(422).json({
      message: "Enter a puja name up to 120 characters.",
    });
  }
  if (content.length < 10 || content.length > 1000) {
    return res.status(422).json({
      message: "Review must be between 10 and 1000 characters.",
    });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(422).json({ message: "Rating must be from 1 to 5 stars." });
  }

  try {
    const review = await Review.create({
      name,
      city,
      poojaName,
      content,
      rating,
      isPublished: true,
    });
    return res.status(201).json({
      message: "Review published successfully.",
      review,
    });
  } catch (error) {
    console.error("Create admin review error:", error);
    return res.status(500).json({ message: "Unable to publish review." });
  }
};
