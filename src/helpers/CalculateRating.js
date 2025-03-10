const calculateRating = (reviews)=>{
    const total =  reviews?.reduce( (accumulator, currentValue)=>accumulator+ currentValue.rate , 0);
    const rate = reviews?.length ?  total/reviews?.length : 0
     return {total: reviews?.length, rate }
}
export default calculateRating;