const getReviewStatus = (reviews) => {
  let totalHelpful = 0;
  let totalUnhelpful = 0;
  reviews?.forEach((review) => {
    if (review.state =="helpful") {
      totalHelpful++;
    } else {
      totalUnhelpful++;
    }
  });
  return { totalHelpful, totalUnhelpful };
};
export default getReviewStatus;
