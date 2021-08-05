class RestaurantsController < ApplicationController

  def index
    restaurants = Restaurant.all
    render json: restaurants, include: [:reviews]
  end

  def create
    restaurant = Restaurant.new(name: params[:name], location: params[:location], price_range: params[:price_range], image_url: params[:image_url])
    if restaurant.save
      render json: restaurant, include: [:reviews]
    end
  end
  
end
