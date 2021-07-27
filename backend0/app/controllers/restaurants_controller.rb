class RestaurantsController < ApplicationController

  def index
    restaurants = Restaurant.all
    render json: restaurants, include: [:reviews]
  end

  def create
  end

  def update
  end

  def destroy
  end 

end
