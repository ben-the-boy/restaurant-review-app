class RestaurantsController < ApplicationController

  def index
    restaurants = Restaurant.all
    render json: restaurants, include: [:reviews]
  end

  def create
    # ADD VERIFICATION OF PARAMS PRESENCE
    restaurant = Restaurant.create(name: params[:name], location: params[:location], price_range: params[:price_range], image_url: params[:image_url])
    render json: restaurant, include: [:reviews]
  end

  def update
  end

  def destroy
  end

end
