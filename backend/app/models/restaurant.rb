class Restaurant < ApplicationRecord
  has_many :reviews
  validates_presence_of :name, :location, :price_range, :image_url
end
