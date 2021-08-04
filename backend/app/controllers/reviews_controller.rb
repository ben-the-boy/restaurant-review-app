class ReviewsController < ApplicationController

  def index
    reviews = Review.all
    render json: reviews
  end

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    review = restaurant.reviews.new(content: params[:content], rating: params[:rating])
    if review.save
      render json: review
    end
  end

  def update
  end

  def destroy
  end

end
