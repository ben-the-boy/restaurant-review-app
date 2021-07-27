class ReviewsController < ApplicationController

  def index
    reviews = Review.all
    render json: reviews
  end

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    if params[:content].present? && params[:rating].present?
      review = restaurant.reviews.create(content: params[:content], rating: params[:rating])
      render json: review
    else
      render json: ["Reviews must have content and rating!!!"]
    end
  end

  def update
  end

  def destroy
  end

end
